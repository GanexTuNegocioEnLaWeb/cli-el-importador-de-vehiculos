import {
  type QuoteCreationState,
  type StepConfig,
  CreationQuoteStep,
} from "../types/quotes.types";
import { supabase } from "../lib/supabaseClient";

// Single Responsibility: Business logic for quote creation
export class QuoteCreationService {
  static getStepConfigs(): StepConfig[] {
    return [
      {
        id: CreationQuoteStep.VEHICLE_SELECT,
        label: "Vehículo",
        isComplete: (state) => state.importData !== null,
      },
      {
        id: CreationQuoteStep.VEHICLE_DETAILS,
        label: "Confirmación",
        isComplete: (state) => state.importData !== null,
      },
      {
        id: CreationQuoteStep.QUOTE,
        label: "Cotización",
        isComplete: (state) => state.quoteData !== null,
      },
      {
        id: CreationQuoteStep.CLIENT_SELECT,
        label: "Cliente",
        isComplete: (state) => state.client !== null,
      },
      {
        id: CreationQuoteStep.SUMMARY,
        label: "Resumen",
        isComplete: () => false,
      },
    ];
  }

  static canNavigateToStep(
    targetStep: CreationQuoteStep,
    state: QuoteCreationState,
  ): boolean {
    const steps = this.getStepConfigs();

    // Can always go back
    if (targetStep === CreationQuoteStep.VEHICLE_SELECT) return true;

    // Check if previous steps are complete
    for (let i = 0; i < targetStep; i++) {
      if (!steps[i].isComplete(state)) {
        return false;
      }
    }

    return true;
  }

  static async saveQuote(state: QuoteCreationState): Promise<void> {
    const { vehicleId, quoteData, client } = state;
    if (!vehicleId) throw new Error("Falta el ID del vehículo");
    if (!quoteData) throw new Error("Faltan datos de la cotización");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Generate a code like Q-001
    // For now, let's just let the ID handle it or generate a simple one
    const code = `Q-${Math.floor(1000 + Math.random() * 9000)}`;

    const { error } = await supabase.from("quotes").insert({
      code,
      vehicle_id: vehicleId,
      client_id: client?.id,
      created_by: user?.id,
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

    if (error) throw error;
  }
}

