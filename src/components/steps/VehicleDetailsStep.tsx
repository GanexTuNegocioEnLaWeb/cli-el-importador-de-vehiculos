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
  const [isValid, setIsValid] = useState(true);

  const handleChange = (data: VehicleData) => {
    onDataChange?.(data);
    // Basic validation
    setIsValid(!!data.make && !!data.model && data.year > 0);
  };

  // Create raw data structure for VehicleImportForm
  const rawData = {
    metadata: {
      title: `${vehicleData.year} ${vehicleData.make} ${vehicleData.model} ${vehicleData.trim} | ${vehicleData.condition} | ${vehicleData.auctionDate} | ${vehicleData.location}`,
      sourceURL: vehicleData.sourceUrl,
      timezone: vehicleData.timezone,
      language: vehicleData.language,
    },
    json: {
      company_name: vehicleData.companyName,
      company_description: vehicleData.companyDescription,
    },
  };

  return (
    <Box>
      <Typography level="h3" sx={{ mb: 3 }}>
        Detalles del Vehículo
      </Typography>

      <VehicleImportForm rawData={rawData} onChange={handleChange} />

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Atrás
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Continuar a Cotización
        </Button>
      </Stack>
    </Box>
  );
}
