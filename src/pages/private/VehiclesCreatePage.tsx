import { Box, Card, Typography } from "@mui/joy";
import { useNavigate } from "react-router";
import { CreateVehicleIndicatorStep } from "../../components/steps/vehicles/CreateVehicleIndicatorStep";
import { ImportStep } from "../../components/steps/vehicles/ImportStep";
import { VehicleDetailsStep } from "../../components/steps/VehicleDetailsStep";
import { QuoteStep } from "../../components/steps/QuoteStep";
import { SummaryStep } from "../../components/steps/SummaryStep";
import { VehicleCreationService } from "../../services/VehicleCreationService";
import {
  CreationVehicleStep,
  type QuoteData,
  type VehicleCreationState,
  type VehicleData,
} from "../../types/vehicle.types";
import {
  parseVehicleData,
  type FirecrawlResponse,
  makeEmptyVehicle,
} from "../../lib/parser";
import { useCallback, useState } from "react";
import SelectClientStep from "../../components/steps/SelectClientStep";
import type { ClientData } from "../../types/client.types";

// Open/Closed Principle: Easy to add new steps without modifying existing code
function VehiclesCreatePage() {
  const navigate = useNavigate();

  const [state, setState] = useState<VehicleCreationState>({
    importData: null,
    quoteData: null,
    client: null,
  });
  const [currentStep, setCurrentStep] = useState<CreationVehicleStep>(
    CreationVehicleStep.IMPORT,
  );

  const setImportData = useCallback((data: VehicleData) => {
    setState((prev) => ({ ...prev, importData: data }));
    setCurrentStep(CreationVehicleStep.VEHICLE_DETAILS);
  }, []);

  const setQuoteData = useCallback((data: QuoteData) => {
    setState((prev) => ({ ...prev, quoteData: data }));
  }, []);

  const setClient = useCallback((client: ClientData) => {
    setState((prev) => ({ ...prev, client }));
  }, []);
  const goToStep = useCallback((step: CreationVehicleStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(
      (prev) =>
        Math.min(
          (prev as number) + 1,
          CreationVehicleStep.SUMMARY,
        ) as CreationVehicleStep,
    );
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep(
      (prev) =>
        Math.max(
          (prev as number) - 1,
          CreationVehicleStep.IMPORT,
        ) as CreationVehicleStep,
    );
  }, []);

  const reset = useCallback(() => {
    setState({ importData: null, quoteData: null, client: null });
    setCurrentStep(CreationVehicleStep.IMPORT);
  }, []);

  const steps = VehicleCreationService.getStepConfigs();

  const handleStepClick = (step: CreationVehicleStep) => {
    if (VehicleCreationService.canNavigateToStep(step, state)) {
      goToStep(step);
    }
  };

  const handleImportComplete = (rawData: FirecrawlResponse | null) => {
    const parsedData = rawData ? parseVehicleData(rawData) : makeEmptyVehicle();
    setImportData(parsedData);
  };

  const handleConfirm = async () => {
    try {
      await VehicleCreationService.saveVehicle(state);
      navigate("/dashboard/quotes");
      reset();
    } catch {
      alert("Error al crear el vehículo");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case CreationVehicleStep.IMPORT:
        return <ImportStep onImportComplete={handleImportComplete} />;

      case CreationVehicleStep.VEHICLE_DETAILS:
        return state.importData ? (
          <VehicleDetailsStep
            vehicleData={state.importData}
            onNext={nextStep}
            onBack={previousStep}
            onDataChange={(data) =>
              setState((prev) => ({ ...prev, importData: data }))
            }
          />
        ) : null;

      case CreationVehicleStep.QUOTE:
        return (
          <QuoteStep
            onNext={nextStep}
            onBack={previousStep}
            onSave={setQuoteData}
            initialData={state.quoteData}
          />
        );

      case CreationVehicleStep.CLIENT_SELECT:
        return (
          <SelectClientStep
            onBack={previousStep}
            onSelect={(client) => {
              setClient(client);
              nextStep();
            }}
          />
        );

      case CreationVehicleStep.SUMMARY:
        return (
          <SummaryStep
            state={state}
            onConfirm={handleConfirm}
            onBack={previousStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography level="h2" component="h1">
          Añade un nuevo vehículo
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ p: 3 }}>
        <CreateVehicleIndicatorStep
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />

        <Box sx={{ minHeight: 400 }}>{renderStep()}</Box>
      </Card>
    </>
  );
}

export default VehiclesCreatePage;
