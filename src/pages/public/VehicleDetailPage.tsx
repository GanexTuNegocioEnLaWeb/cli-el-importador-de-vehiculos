import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CTA from "../../components/public/sections/CTA";

const vehiclesData: Record<string, any> = {
  "1": {
    id: 1,
    brand: "Toyota",
    model: "4Runner TRD Pro",
    year: 2023,
    price: 52000,
    mileage: 15000,
    transmission: "Automática",
    fuel: "Gasolina",
    color: "Blanco",
    vin: "JTEBU5JR5P5123456",
    location: "Miami, FL",
    condition: "Excelente",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    ],
    description:
      "Toyota 4Runner TRD Pro 2023 en excelente estado. Vehículo ideal para aventuras off-road con todas las comodidades de un SUV premium. Equipado con suspensión Fox, llantas todo terreno y tecnología de última generación.",
    features: [
      "Sistema de navegación premium",
      "Cámara 360 grados",
      "Asientos de cuero calefaccionados",
      "Techo corredizo panorámico",
      "Sistema de sonido JBL",
      "Control de crucero adaptativo",
      "Sensores de estacionamiento",
      "Apple CarPlay y Android Auto",
    ],
    specs: {
      motor: "4.0L V6",
      potencia: "270 HP",
      traccion: "4WD",
      capacidad: "7 pasajeros",
    },
  },
};

export default function VehicleDetailPage() {
  const { id } = useParams();
  const vehicle = vehiclesData[id || "1"];

  if (!vehicle) {
    return (
      <Container sx={{ py: 20, textAlign: "center" }}>
        <Typography variant="h4">Vehículo no encontrado</Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Hero con galería */}
      <Box sx={{ pt: { xs: 14, sm: 16 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Box
            component="img"
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            sx={{
              width: "100%",
              height: { xs: 300, md: 500 },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Container>
      </Box>

      {/* Información principal */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Chip label={vehicle.condition} color="success" />
                  <Chip label={vehicle.year} variant="outlined" />
                </Stack>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {vehicle.brand} {vehicle.model}
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={700}>
                  ${vehicle.price.toLocaleString()}
                </Typography>
              </Box>

              <Divider />

              {/* Especificaciones rápidas */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack spacing={1} alignItems="center" textAlign="center">
                    <SpeedIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      Kilometraje
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {vehicle.mileage.toLocaleString()} mi
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack spacing={1} alignItems="center" textAlign="center">
                    <SettingsIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      Transmisión
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {vehicle.transmission}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack spacing={1} alignItems="center" textAlign="center">
                    <LocalGasStationIcon
                      color="primary"
                      sx={{ fontSize: 40 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Combustible
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {vehicle.fuel}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack spacing={1} alignItems="center" textAlign="center">
                    <CalendarTodayIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      Año
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {vehicle.year}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Divider />

              {/* Descripción */}
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Descripción
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.description}
                </Typography>
              </Box>

              <Divider />

              {/* Características */}
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Características
                </Typography>
                <Grid container spacing={2}>
                  {vehicle.features.map((feature: string, idx: number) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon
                          color="success"
                          sx={{ fontSize: 20 }}
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider />

              {/* Especificaciones técnicas */}
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Especificaciones Técnicas
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={key}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {value as string}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Grid>

          {/* Sidebar de contacto */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ position: "sticky", top: 100 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  ¿Te interesa este vehículo?
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Contáctanos para más información o solicita una cotización
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    fullWidth
                    href="https://wa.me/59170000000"
                    target="_blank"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    href="https://www.copart.com/lot/74133065/clean-title-2019-audi-q7-prestige-fl-miami-south"
                    target="_blank"
                  >
                    Ver en Copart
                  </Button>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>VIN:</strong> {vehicle.vin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Ubicación:</strong> {vehicle.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Color:</strong> {vehicle.color}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <CTA
        title="¿Buscas otro vehículo?"
        description="Explora nuestro catálogo completo o solicita que busquemos el vehículo ideal para ti."
        primaryButtonText="Ver más vehículos"
        primaryButtonLink="/vehicles"
        secondaryButtonText="Solicitar búsqueda personalizada"
        secondaryButtonLink="https://wa.me/5210000000000"
        secondaryButtonBlank
      />
    </>
  );
}
