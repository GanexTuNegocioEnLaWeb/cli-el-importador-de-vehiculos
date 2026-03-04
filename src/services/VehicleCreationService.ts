import {
  type VehicleCreationState,
  type StepConfig,
  CreationVehicleStep,
} from "../types/vehicle.types";
import { supabase } from "../lib/supabaseClient";

// Single Responsibility: Business logic for vehicle creation
export class VehicleCreationService {
  static getStepConfigs(): StepConfig[] {
    return [
      {
        id: CreationVehicleStep.IMPORT,
        label: "Importar",
        isComplete: (state) => state.importData !== null,
      },
      {
        id: CreationVehicleStep.VEHICLE_DETAILS,
        label: "Detalles",
        isComplete: (state) => state.importData !== null,
      },
      {
        id: CreationVehicleStep.QUOTE,
        label: "Cotización",
        isComplete: (state) => state.quoteData !== null,
      },
      {
        id: CreationVehicleStep.CLIENT_SELECT,
        label: "Cliente",
        isComplete: (state) => state.client !== null,
      },
      {
        id: CreationVehicleStep.SUMMARY,
        label: "Resumen",
        isComplete: () => false,
      },
    ];
  }

  static canNavigateToStep(
    targetStep: CreationVehicleStep,
    state: VehicleCreationState,
  ): boolean {
    const steps = this.getStepConfigs();

    // Can always go back
    if (targetStep === CreationVehicleStep.IMPORT) return true;

    // Check if previous steps are complete
    for (let i = 0; i < targetStep; i++) {
      if (!steps[i].isComplete(state)) {
        return false;
      }
    }

    return true;
  }

  static async saveVehicle(state: VehicleCreationState): Promise<void> {
    console.log("=== START saveVehicle ===");
    console.log("State recibido:", state);

    const { importData, quoteData, client } = state;

    if (!importData) {
      console.error("❌ importData es null");
      throw new Error("Faltan datos del vehículo");
    }

    // 1️⃣ Obtener usuario autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("❌ Error obteniendo usuario:", userError);
      throw userError;
    }

    if (!user) {
      console.error("❌ No hay usuario autenticado");
      throw new Error("Usuario no autenticado");
    }

    console.log("✅ Usuario autenticado:", user.id);

    // 2️⃣ Verificar que exista en profiles (para advisor_id)
    const { data: advisorProfile, error: advisorError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (advisorError) {
      console.error("❌ Error verificando profile:", advisorError);
      throw advisorError;
    }

    if (!advisorProfile) {
      console.error("❌ No existe profile para este usuario:", user.id);
      throw new Error("El usuario no tiene profile en la base de datos");
    }

    console.log("✅ Profile encontrado:", advisorProfile.id);

    // 3️⃣ Verificar client si existe
    if (client?.id) {
      const { data: existingClient, error: clientError } = await supabase
        .from("contacts")
        .select("id")
        .eq("id", client.id)
        .maybeSingle();

      if (clientError) {
        console.error("❌ Error verificando client:", clientError);
        throw clientError;
      }

      if (!existingClient) {
        console.error("❌ Client no existe:", client.id);
        throw new Error("El cliente seleccionado no existe");
      }

      console.log("✅ Client válido:", client.id);
    }

    // 4️⃣ Insert VEHICLE
    console.log("➡ Insertando vehículo...");

    let parsedAuctionDate: string | null = null;

    if (importData.auctionDate) {
      const date = new Date(importData.auctionDate);

      if (!isNaN(date.getTime())) {
        parsedAuctionDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      } else {
        console.warn("⚠ auctionDate inválida:", importData.auctionDate);
        parsedAuctionDate = null;
      }
    }

    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .insert({
        lot_id: importData.lotId,
        status: "En subasta",
        company_name: importData.companyName,
        company_description: importData.companyDescription,
        year: importData.year,
        make: importData.make,
        model: importData.model,
        trim: importData.trim,
        condition: importData.condition,
        auction_date: parsedAuctionDate,
        location: importData.location,
        title_type: importData.titleType,
        timezone: importData.timezone,
        language: importData.language,
        source_url: importData.sourceUrl,
        copart_details: importData.copartDetails,
        advisor_id: user.id,
        client_id: client?.id ?? null,
      })
      .select()
      .single();

    if (vehicleError) {
      console.error("❌ Error insertando vehículo:");
      console.error("Code:", vehicleError.code);
      console.error("Message:", vehicleError.message);
      console.error("Details:", vehicleError.details);
      console.error("Hint:", vehicleError.hint);
      throw vehicleError;
    }

    console.log("✅ Vehículo creado:", vehicle);

    // 5️⃣ Insert QUOTE si existe
    if (quoteData) {
      console.log("➡ Insertando cotización...");

      const { error: quoteError } = await supabase.from("quotes").insert({
        vehicle_id: vehicle.id,
        client_id: client?.id ?? null,
        created_by: user.id,
        remate: quoteData.remate,
        grua: quoteData.grua,
        transporte: quoteData.transporte,
        fob: quoteData.fob,
        fees: quoteData.fees,
        transfer_usa: quoteData.transferUSA,
        comision: quoteData.comision,
        documentacion: quoteData.documentacion,
        poliza: quoteData.poliza,
        total_usd: quoteData.totalUSD,
        tasa_paralelo: quoteData.tasaParalelo,
        tasa_oficial: quoteData.tasaOficial,
        total_paralelo: quoteData.totalParalelo,
        total_oficial: quoteData.totalOficial,
      });

      if (quoteError) {
        console.error("❌ Error insertando quote:");
        console.error("Code:", quoteError.code);
        console.error("Message:", quoteError.message);
        console.error("Details:", quoteError.details);
        console.error("Hint:", quoteError.hint);
        throw quoteError;
      }

      console.log("✅ Cotización creada");
    }

    console.log("=== END saveVehicle OK ===");
  }
}
