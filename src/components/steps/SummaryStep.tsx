import { Box, Button, Card, Stack, Typography, Divider } from "@mui/joy";
import { type VehicleCreationState } from "../../types/vehicle.types";

interface SummaryStepProps {
  state: VehicleCreationState;
  onConfirm: () => void;
  onBack: () => void;
}

// Single Responsibility: Display summary and confirm
export function SummaryStep({ state, onConfirm, onBack }: SummaryStepProps) {
  const { importData, quoteData } = state;

  return (
    <Box>
      <Typography level="h3" sx={{ mb: 3 }}>
        Resumen y Confirmación
      </Typography>

      <Stack spacing={3}>
        {/* Vehicle Information */}
        <Card variant="outlined">
          <Typography level="title-md" sx={{ mb: 2 }}>
            Información del Vehículo
          </Typography>
          {importData ? (
            <Stack spacing={1}>
              <Typography level="body-sm">
                <strong>Año:</strong> {importData.year}
              </Typography>
              <Typography level="body-sm">
                <strong>Marca:</strong> {importData.make}
              </Typography>
              <Typography level="body-sm">
                <strong>Modelo:</strong> {importData.model}
              </Typography>
              <Typography level="body-sm">
                <strong>Lote:</strong> {importData.lotId}
              </Typography>
            </Stack>
          ) : (
            <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
              No hay datos de vehículo
            </Typography>
          )}
        </Card>

        {/* Quote Information */}
        <Card variant="outlined">
          <Typography level="title-md" sx={{ mb: 2 }}>
            Cotización
          </Typography>
          {quoteData ? (
            <Stack spacing={1}>
              <Typography level="body-sm">
                <strong>Precio de compra:</strong> ${quoteData.purchasePrice}
              </Typography>
              <Typography level="body-sm">
                <strong>Precio de venta:</strong> ${quoteData.sellingPrice}
              </Typography>
            </Stack>
          ) : (
            <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
              No hay datos de cotización
            </Typography>
          )}
        </Card>

        <Divider />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onBack}>
            Atrás
          </Button>
          <Button color="success" onClick={onConfirm}>
            Confirmar y Crear Vehículo
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
