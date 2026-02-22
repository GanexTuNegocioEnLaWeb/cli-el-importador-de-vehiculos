import { useState, useCallback } from "react";
import {
  type VehicleCreationState,
  CreationStep,
  type VehicleData,
  type QuoteData,
} from "../types/vehicle.types";

// Single Responsibility: Manage vehicle creation state
export function useVehicleCreation() {
  const [state, setState] = useState<VehicleCreationState>({
    importData: null,
    quoteData: null,
  });
  const [currentStep, setCurrentStep] = useState<CreationStep>(
    CreationStep.IMPORT,
  );

  const setImportData = useCallback((data: VehicleData) => {
    setState((prev) => ({ ...prev, importData: data }));
    setCurrentStep(CreationStep.VEHICLE_DETAILS);
  }, []);

  const setQuoteData = useCallback((data: QuoteData) => {
    setState((prev) => ({ ...prev, quoteData: data }));
  }, []);

  const goToStep = useCallback((step: CreationStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(
      (prev) =>
        Math.min((prev as number) + 1, CreationStep.SUMMARY) as CreationStep,
    );
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep(
      (prev) =>
        Math.max((prev as number) - 1, CreationStep.IMPORT) as CreationStep,
    );
  }, []);

  const reset = useCallback(() => {
    setState({ importData: null, quoteData: null });
    setCurrentStep(CreationStep.IMPORT);
  }, []);

  return {
    state,
    currentStep,
    setImportData,
    setQuoteData,
    goToStep,
    nextStep,
    previousStep,
    reset,
  };
}
