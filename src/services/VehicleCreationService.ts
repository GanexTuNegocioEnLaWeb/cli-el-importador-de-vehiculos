import {
  type VehicleCreationState,
  type StepConfig,
  CreationStep,
} from "../types/vehicle.types";

// Single Responsibility: Business logic for vehicle creation
export class VehicleCreationService {
  static getStepConfigs(): StepConfig[] {
    return [
      {
        id: CreationStep.IMPORT,
        label: "Importar",
        isComplete: (state) => state.importData !== null,
      },
      {
        id: CreationStep.VEHICLE_DETAILS,
        label: "Detalles",
        isComplete: (state) => state.importData !== null,
      },
      {
        id: CreationStep.QUOTE,
        label: "Cotización",
        isComplete: (state) => state.quoteData !== null,
      },
      {
        id: CreationStep.SUMMARY,
        label: "Resumen",
        isComplete: () => false,
      },
    ];
  }

  static canNavigateToStep(
    targetStep: CreationStep,
    state: VehicleCreationState,
  ): boolean {
    const steps = this.getStepConfigs();

    // Can always go back
    if (targetStep === CreationStep.IMPORT) return true;

    // Check if previous steps are complete
    for (let i = 0; i < targetStep; i++) {
      if (!steps[i].isComplete(state)) {
        return false;
      }
    }

    return true;
  }

  static async saveVehicle(state: VehicleCreationState): Promise<void> {
    // TODO: Implement API call to save vehicle
    console.log("Saving vehicle:", state);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
