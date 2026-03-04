import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GavelIcon from "@mui/icons-material/Gavel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DescriptionIcon from "@mui/icons-material/Description";
import CTA from "../../components/public/sections/CTA";

const services = [
  {
    icon: DirectionsCarIcon,
    title: "Importación por Encargo",
    description:
      "Buscamos y compramos el vehículo específico que deseas desde Estados Unidos.",
    features: [
      "Búsqueda personalizada según tus preferencias",
      "Verificación completa del historial del vehículo",
      "Inspección detallada antes de la compra",
      "Negociación del mejor precio",
      "Asesoría en la selección del modelo ideal",
    ],
    price: "Desde $2,500 + costos del vehículo",
  },
  {
    icon: GavelIcon,
    title: "Compra en Subastas USA",
    description:
      "Acceso a las principales subastas de vehículos en Estados Unidos con precios competitivos.",
    features: [
      "Acceso a Copart, IAA y otras subastas",
      "Vehículos con título salvage o clean",
      "Precios hasta 40% más bajos que retail",
      "Evaluación de daños y costos de reparación",
      "Puja estratégica para obtener el mejor precio",
    ],
    price: "Desde $1,800 + costos del vehículo",
  },
  {
    icon: DescriptionIcon,
    title: "Nacionalización",
    description:
      "Gestionamos todos los trámites de importación y nacionalización en Bolivia.",
    features: [
      "Gestión completa de aduana",
      "Cálculo y pago de aranceles",
      "Obtención de documentos legales",
      "Registro vehicular en Bolivia",
      "Asesoría legal especializada",
    ],
    price: "Incluido en el servicio completo",
  },
  {
    icon: LocalShippingIcon,
    title: "Transporte y Logística",
    description:
      "Coordinamos el transporte desde Estados Unidos hasta Bolivia de forma segura.",
    features: [
      "Transporte terrestre en USA",
      "Envío marítimo asegurado",
      "Tracking en tiempo real",
      "Gestión de documentación de exportación",
      "Entrega en tu ciudad",
    ],
    price: "Desde $1,200 según destino",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              fontWeight={700}
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem" },
              }}
            >
              Nuestros Servicios
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: "800px" }}
            >
              Soluciones completas para la importación de tu vehículo desde
              Estados Unidos
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Servicios */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          bgcolor: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        <Icon sx={{ fontSize: 32 }} />
                      </Box>

                      <Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                          {service.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {service.description}
                        </Typography>
                      </Box>

                      <Stack spacing={1}>
                        {service.features.map((feature, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              "&:before": {
                                content: '"✓"',
                                color: "success.main",
                                fontWeight: 700,
                                mr: 1,
                              },
                            }}
                          >
                            {feature}
                          </Typography>
                        ))}
                      </Stack>

                      <Box
                        sx={{
                          pt: 2,
                          borderTop: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight={700}
                        >
                          {service.price}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Proceso completo */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Servicio Completo de Importación
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Todo incluido: desde la búsqueda hasta la entrega en Bolivia
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Búsqueda y Compra",
                description:
                  "Encontramos y compramos el vehículo ideal según tus necesidades",
              },
              {
                title: "Transporte Internacional",
                description:
                  "Coordinamos el envío seguro desde USA hasta Bolivia",
              },
              {
                title: "Nacionalización",
                description:
                  "Gestionamos todos los trámites legales y aduaneros",
              },
              {
                title: "Entrega Final",
                description:
                  "Recibe tu vehículo listo para usar con todos los documentos",
              },
            ].map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card sx={{ height: "100%", textAlign: "center" }}>
                  <CardContent>
                    <Typography
                      variant="h3"
                      color="primary"
                      fontWeight={700}
                      sx={{ opacity: 0.3, mb: 2 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CTA
        title="¿Necesitas más información?"
        description="Contáctanos y te asesoramos sobre el mejor servicio para ti."
        primaryButtonText="Solicitar cotización"
        primaryButtonLink="/dashboard/quotes/create"
        secondaryButtonText="Contactar asesor"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
