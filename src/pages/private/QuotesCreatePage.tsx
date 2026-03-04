import { Box, Card, Typography } from "@mui/joy";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { QuoteStep } from "../../components/steps/QuoteStep";
import type { QuoteData } from "../../types/vehicle.types";
import SelectVehicleStep from "../../components/steps/quotes/SelectVehicleStep";
import {
  CreationQuoteStep,
  type QuoteCreationState,
  type VehicleItem,
} from "../../types/quotes.types";
import { VehicleDetailsStep } from "../../components/steps/VehicleDetailsStep";
import { SummaryStep } from "../../components/steps/SummaryStep";
import { QuoteCreationService } from "../../services/QuoteCreationService";
import SelectClientStep from "../../components/steps/SelectClientStep";
import { CreateQuoteIndicatorStep } from "../../components/steps/quotes/CreateQuoteIndicatorStep";
import type { ClientData } from "../../types/client.types";
import type { VehicleData } from "../../types/vehicle.types";

function QuotesCreatePage() {
  const navigate = useNavigate();

  const [state, setState] = useState<QuoteCreationState>({
    importData: null,
    quoteData: null,
    client: null,
  });
  const [currentStep, setCurrentStep] = useState<CreationQuoteStep>(
    CreationQuoteStep.VEHICLE_SELECT,
  );

  const setQuoteData = useCallback((data: QuoteData) => {
    setState((prev) => ({ ...prev, quoteData: data }));
  }, []);

  const setClient = useCallback((client: ClientData) => {
    setState((prev) => ({ ...prev, client }));
  }, []);

  const goToStep = useCallback((step: CreationQuoteStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(
      (prev) =>
        Math.min(
          (prev as number) + 1,
          CreationQuoteStep.SUMMARY,
        ) as CreationQuoteStep,
    );
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep(
      (prev) =>
        Math.max(
          (prev as number) - 1,
          CreationQuoteStep.VEHICLE_SELECT,
        ) as CreationQuoteStep,
    );
  }, []);

  const reset = useCallback(() => {
    setState({ importData: null, quoteData: null, client: null });
    setCurrentStep(CreationQuoteStep.VEHICLE_SELECT);
  }, []);

  const steps = QuoteCreationService.getStepConfigs();

  const handleStepClick = (step: CreationQuoteStep) => {
    if (QuoteCreationService.canNavigateToStep(step, state)) {
      goToStep(step);
    }
  };

  const handleConfirm = async () => {
    try {
      await QuoteCreationService.saveQuote(state);
      navigate("/dashboard/quotes");
      reset();
    } catch {
      alert("Error al crear el vehículo");
    }
  };

  const handleVehicleSelected = (item: VehicleItem) => {
    const match = item.title.match(/^(\d{4})\s+([A-Za-z]+)\s+(.+)$/);
    let year = 0;
    let make = "";
    let model = "";
    if (match) {
      year = parseInt(match[1], 10);
      make = match[2];
      model = match[3];
    }
    const vehicle: VehicleData = {
      companyName: "Copart",
      companyDescription: "",
      lotId: item.lotId,
      year,
      make,
      model,
      trim: "",
      condition: "",
      auctionDate: "",
      location: "",
      titleType: "",
      timezone: "America/La_Paz",
      language: "es",
      sourceUrl: "",
    };
    setState((prev) => ({ ...prev, importData: vehicle, vehicleId: item.id }));
    setCurrentStep(CreationQuoteStep.VEHICLE_DETAILS);
  };

  const renderStep = () => {
    switch (currentStep) {
      case CreationQuoteStep.VEHICLE_SELECT:
        return (
          <SelectVehicleStep
            onSelect={handleVehicleSelected}
            onCancel={() => navigate("/dashboard/quotes")}
          />
        );

      case CreationQuoteStep.VEHICLE_DETAILS:
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

      case CreationQuoteStep.QUOTE:
        return (
          <QuoteStep
            onNext={nextStep}
            onBack={previousStep}
            onSave={setQuoteData}
            initialData={state.quoteData}
          />
        );

      case CreationQuoteStep.CLIENT_SELECT:
        return (
          <SelectClientStep
            onBack={previousStep}
            onSelect={(client) => {
              setClient(client);
              nextStep();
            }}
          />
        );

      case CreationQuoteStep.SUMMARY:
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
          Crea una nueva cotización
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ p: 3 }}>
        <CreateQuoteIndicatorStep
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />

        <Box sx={{ minHeight: 400 }}>{renderStep()}</Box>
      </Card>
    </>
  );
}

export default QuotesCreatePage;
