import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme, alpha } from "@mui/material/styles";

const steps = [
  {
    number: "01",
    title: "Consulta inicial",
    description:
      "Nos cuentas qué vehículo buscas y te asesoramos sobre las mejores opciones según tu presupuesto y necesidades.",
    details: [
      "Asesoría personalizada sin costo",
      "Análisis de tu presupuesto",
      "Recomendaciones de modelos",
      "Estimación de costos totales",
    ],
  },
  {
    number: "02",
    title: "Búsqueda y selección",
    description:
      "Buscamos el vehículo ideal en subastas y concesionarios de Estados Unidos, verificando su historial y condición.",
    details: [
      "Búsqueda en múltiples plataformas",
      "Verificación de historial (Carfax)",
      "Inspección de fotos y reportes",
      "Negociación del mejor precio",
    ],
  },
  {
    number: "03",
    title: "Compra y documentación",
    description:
      "Realizamos la compra del vehículo y gestionamos toda la documentación necesaria para la exportación.",
    details: [
      "Compra segura del vehículo",
      "Gestión de título y documentos",
      "Pago de impuestos locales USA",
      "Preparación para exportación",
    ],
  },
  {
    number: "04",
    title: "Transporte internacional",
    description:
      "Coordinamos el transporte marítimo desde Estados Unidos hasta el puerto más cercano en Sudamérica.",
    details: [
      "Transporte terrestre al puerto",
      "Envío marítimo asegurado",
      "Tracking en tiempo real",
      "Gestión de aduana USA",
    ],
  },
  {
    number: "05",
    title: "Nacionalización en Bolivia",
    description:
      "Gestionamos todos los trámites de importación y nacionalización ante las autoridades bolivianas.",
    details: [
      "Gestión de aduana Bolivia",
      "Pago de aranceles e impuestos",
      "Obtención de documentos legales",
      "Registro vehicular",
    ],
  },
  {
    number: "06",
    title: "Entrega final",
    description:
      "Te entregamos tu vehículo listo para usar, con todos los documentos en regla y garantía de satisfacción.",
    details: [
      "Inspección final del vehículo",
      "Entrega de documentación completa",
      "Asesoría post-venta",
      "Garantía de satisfacción",
    ],
  },
];

function WorkSteps() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={3}>
        {steps.map((step, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              overflow: "visible",
              position: "relative",
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              borderRadius: 3,
              transition: "all 0.3s ease",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                alignItems="flex-start"
              >
                <Grid size={{ xs: 12, sm: 2 }}>
                  <Stack
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                  >
                    <Typography
                      variant="h2"
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                        lineHeight: 1,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.9,
                      }}
                    >
                      {step.number}
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 3,
                        backgroundColor: "primary.main",
                        borderRadius: 1,
                        opacity: 0.3,
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 10 }}>
                  <Stack spacing={2}>
                    <Typography variant="h5" fontWeight={700}>
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "1.05rem", lineHeight: 1.6 }}
                    >
                      {step.description}
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {step.details.map((detail, idx) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="flex-start"
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              backgroundColor: alpha(
                                theme.palette.success.main,
                                0.06,
                              ),
                              border: `1px solid ${alpha(theme.palette.success.main, 0.15)}`,
                              height: "100%",
                            }}
                          >
                            <CheckCircleIcon
                              color="success"
                              sx={{
                                fontSize: 20,
                                mt: 0.2,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: alpha(theme.palette.text.primary, 0.85),
                              }}
                            >
                              {detail}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default WorkSteps;
