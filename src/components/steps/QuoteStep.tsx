import { Box, Button, Stack, Typography } from "@mui/joy";
interface QuoteStepProps {
  onNext: () => void;
  onBack: () => void;
}

// Single Responsibility: Handle vehicle quote/pricing
export function QuoteStep({ onNext, onBack }: QuoteStepProps) {
  return (
    <Box>
      <Typography level="h3" sx={{ mb: 3 }}>
        Cotización del Vehículo
      </Typography>

      <Typography level="body-md" sx={{ mb: 2, color: "text.secondary" }}>
        Esta sección está lista para implementar el formulario de cotización
      </Typography>

      {/* TODO: Implementar formulario de cotización */}
      <Box
        sx={{
          p: 4,
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: "sm",
          textAlign: "center",
        }}
      >
        <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
          Formulario de cotización pendiente
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Atrás
        </Button>
        <Button onClick={onNext}>Continuar a Resumen</Button>
      </Stack>
    </Box>
  );
}
