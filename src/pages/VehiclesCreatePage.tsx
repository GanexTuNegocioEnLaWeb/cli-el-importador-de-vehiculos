import { Box, Card, Typography } from "@mui/joy";
import { useVehicleCreation } from "../hooks/useVehicleCreation";
import { StepIndicator } from "../components/StepIndicator";
import { ImportStep } from "../components/steps/ImportStep";
import { VehicleDetailsStep } from "../components/steps/VehicleDetailsStep";
import { QuoteStep } from "../components/steps/QuoteStep";
import { SummaryStep } from "../components/steps/SummaryStep";
import { VehicleCreationService } from "../services/VehicleCreationService";
import { CreationStep } from "../types/vehicle.types";
import { parseVehicleData, type ScrapedData } from "../lib/parser";

// Open/Closed Principle: Easy to add new steps without modifying existing code
function VehiclesCreatePage() {
  const {
    state,
    currentStep,
    setImportData,
    goToStep,
    nextStep,
    previousStep,
    reset,
  } = useVehicleCreation();

  const steps = VehicleCreationService.getStepConfigs();

  const handleStepClick = (step: CreationStep) => {
    if (VehicleCreationService.canNavigateToStep(step, state)) {
      goToStep(step);
    }
  };

  const handleImportComplete = (rawData: ScrapedData) => {
    const parsedData = parseVehicleData(rawData);
    setImportData(parsedData);
  };

  const handleConfirm = async () => {
    try {
      await VehicleCreationService.saveVehicle(state);
      alert("Vehículo creado exitosamente");
      reset();
    } catch {
      alert("Error al crear el vehículo");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case CreationStep.IMPORT:
        return <ImportStep onImportComplete={handleImportComplete} />;

      case CreationStep.VEHICLE_DETAILS:
        return state.importData ? (
          <VehicleDetailsStep
            vehicleData={state.importData}
            onNext={nextStep}
            onBack={previousStep}
          />
        ) : null;

      case CreationStep.QUOTE:
        return (
          <QuoteStep
            onNext={nextStep}
            onBack={previousStep}
          />
        );

      case CreationStep.SUMMARY:
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
    <Box>
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
        <StepIndicator
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />

        <Box sx={{ minHeight: 400 }}>{renderStep()}</Box>
      </Card>
    </Box>
  );
}

export default VehiclesCreatePage;
