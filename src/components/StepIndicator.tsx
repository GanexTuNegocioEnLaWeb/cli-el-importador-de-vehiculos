import {
  Box,
  Step,
  StepIndicator as JoyStepIndicator,
  Stepper,
  Typography,
} from "@mui/joy";
import { CreationStep, type StepConfig } from "../types/vehicle.types";
import CheckIcon from "@mui/icons-material/Check";

interface StepIndicatorProps {
  currentStep: CreationStep;
  steps: StepConfig[];
  onStepClick?: (step: CreationStep) => void;
}

// Single Responsibility: Display step progress
export function StepIndicator({
  currentStep,
  steps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <Stepper sx={{ width: "100%", mb: 4 }}>
      {steps.map((step) => (
        <Step
          key={step.id}
          indicator={
            <JoyStepIndicator
              variant={currentStep === step.id ? "solid" : "outlined"}
              color={currentStep > step.id ? "success" : "primary"}
              onClick={() => onStepClick?.(step.id)}
              sx={{ cursor: onStepClick ? "pointer" : "default" }}
            >
              {currentStep > step.id ? <CheckIcon /> : step.id + 1}
            </JoyStepIndicator>
          }
        >
          <Box>
            <Typography
              level="title-sm"
              sx={{
                fontWeight: currentStep === step.id ? "bold" : "normal",
              }}
            >
              {step.label}
            </Typography>
          </Box>
        </Step>
      ))}
    </Stepper>
  );
}
