import { Box, Typography } from "@mui/joy";
import ImportButton from "../ImportButton";
import { type VehicleData } from "../../types/vehicle.types";
import { parseVehicleData } from "../../lib/parser";

interface ImportStepProps {
  onImportComplete: (data: VehicleData) => void;
}

// Single Responsibility: Handle vehicle import
export function ImportStep({ onImportComplete }: ImportStepProps) {
  return (
    <Box>
      <Typography level="body-lg" sx={{ mb: 3 }}>
        Importa los datos del vehículo desde Copart
      </Typography>
      <ImportButton
        onDataImported={(data) => onImportComplete(parseVehicleData(data))}
      />
    </Box>
  );
}
