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

        {/* Client Information */}
        <Card variant="outlined">
          <Typography level="title-md" sx={{ mb: 2 }}>
            Cliente
          </Typography>
          {state.client ? (
            <Stack spacing={1}>
              <Typography level="body-sm">
                <strong>Nombre:</strong> {state.client.name}
              </Typography>
              <Typography level="body-sm">
                <strong>Teléfono:</strong> {state.client.phone}
              </Typography>
              {/* <Typography level="body-sm">
                <strong>Fuente:</strong> {state.client.source}
              </Typography> */}
            </Stack>
          ) : (
            <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
              No hay cliente seleccionado
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
                <strong>Remate:</strong> ${quoteData.remate.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Fees:</strong> ${quoteData.fees.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Transferencias USA:</strong> $
                {quoteData.transferUSA.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Grúa:</strong> ${quoteData.grua.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Transporte:</strong> ${quoteData.transporte.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Comisión:</strong> ${quoteData.comision.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Documentación:</strong> $
                {quoteData.documentacion.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Póliza:</strong> ${quoteData.poliza.toFixed(2)}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography level="body-sm">
                <strong>Total USD:</strong> ${quoteData.totalUSD.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Total paralelo (BOB):</strong>{" "}
                {quoteData.totalParalelo.toFixed(2)}
              </Typography>
              <Typography level="body-sm">
                <strong>Total oficial (BOB):</strong>{" "}
                {quoteData.totalOficial.toFixed(2)}
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
            Confirmar y Crear Cotización
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
