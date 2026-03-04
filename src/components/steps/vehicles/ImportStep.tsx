import { Box, Typography } from "@mui/joy";
import ImportButton from "../../ImportButton";
import { type FirecrawlResponse } from "../../../lib/parser";

interface ImportStepProps {
  onImportComplete: (data: FirecrawlResponse | null) => void;
}

// Single Responsibility: Handle vehicle import
export function ImportStep({ onImportComplete }: ImportStepProps) {
  return (
    <Box>
      <Typography level="body-lg" sx={{ mb: 3 }}>
        Importa los datos del vehículo desde Copart
      </Typography>
      <ImportButton onDataImported={onImportComplete} />
    </Box>
  );
}
