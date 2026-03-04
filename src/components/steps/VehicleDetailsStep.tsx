import { Box, Button, Stack, Typography } from "@mui/joy";
import VehicleImportForm from "../VehicleImportForm";
import { type VehicleData } from "../../types/vehicle.types";
import { useState } from "react";

interface VehicleDetailsStepProps {
  vehicleData: VehicleData;
  onNext: () => void;
  onBack: () => void;
  onDataChange?: (data: VehicleData) => void;
}

// Single Responsibility: Display and edit vehicle details
export function VehicleDetailsStep({
  vehicleData,
  onNext,
  onBack,
  onDataChange,
}: VehicleDetailsStepProps) {
  const [localData, setLocalData] = useState(vehicleData);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (data: VehicleData) => {
    setLocalData(data);
    setIsValid(!!data.make && !!data.model && data.year > 0);
  };

  const handleNext = () => {
    onDataChange?.(localData);
    onNext();
  };

  return (
    <Box>
      <Typography level="h3" sx={{ mb: 3 }}>
        Detalles del Vehículo
      </Typography>

      <VehicleImportForm value={localData} onChange={handleChange} />

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={!isValid}>
          Continuar a Cotización
        </Button>
      </Stack>
    </Box>
  );
}
