import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import CTA from "../../components/public/sections/CTA";

const advisorsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Carlos Mendoza",
    role: "Asesor Senior",
    experience: "8 años de experiencia",
    specialization: "Vehículos de lujo y deportivos",
    image: "https://i.pravatar.cc/300?img=12",
    vehiclesSold: 150,
    rating: 4.9,
    bio: "Especialista en importación de vehículos de alta gama con más de 8 años de experiencia. He ayudado a más de 150 clientes a encontrar el vehículo de sus sueños, desde deportivos europeos hasta SUVs de lujo americanos.",
    phone: "+591 7000-0001",
    email: "carlos.mendoza@elimportador.bo",
    achievements: [
      "Asesor del año 2023",
      "Certificación en tasación de vehículos",
      "Experto en vehículos deportivos",
    ],
    recentVehicles: [
      {
        id: 1,
        brand: "Porsche",
        model: "911 Carrera",
        year: 2022,
        price: 95000,
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
      },
      {
        id: 2,
        brand: "BMW",
        model: "M4 Competition",
        year: 2023,
        price: 78000,
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      },
      {
        id: 3,
        brand: "Mercedes-Benz",
        model: "AMG GT",
        year: 2022,
        price: 120000,
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
      },
    ],
    testimonials: [
      {
        client: "Roberto S.",
        comment:
          "Excelente asesor, me ayudó a encontrar el Porsche perfecto. Muy profesional.",
        rating: 5,
      },
      {
        client: "Andrea M.",
        comment:
          "Carlos conoce muy bien el mercado de vehículos de lujo. Totalmente recomendado.",
        rating: 5,
      },
    ],
  },
  "2": {
    id: 2,
    name: "María Rodríguez",
    role: "Asesora Comercial",
    experience: "5 años de experiencia",
    specialization: "SUVs y camionetas",
    image: "https://i.pravatar.cc/300?img=47",
    vehiclesSold: 120,
    rating: 4.8,
    bio: "Experta en SUVs y camionetas con enfoque en vehículos familiares y de trabajo. Mi pasión es ayudar a las familias a encontrar el vehículo perfecto para sus necesidades.",
    phone: "+591 7000-0002",
    email: "maria.rodriguez@elimportador.bo",
    achievements: [
      "Especialista en SUVs familiares",
      "Mejor atención al cliente 2023",
      "Certificación en logística de importación",
    ],
    recentVehicles: [
      {
        id: 4,
        brand: "Toyota",
        model: "4Runner TRD Pro",
        year: 2023,
        price: 52000,
        image:
          "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400",
      },
      {
        id: 5,
        brand: "Jeep",
        model: "Grand Cherokee",
        year: 2022,
        price: 48000,
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400",
      },
    ],
    testimonials: [
      {
        client: "Luis P.",
        comment:
          "María fue muy paciente y me ayudó a elegir la mejor camioneta para mi familia.",
        rating: 5,
      },
    ],
  },
};

export default function AdvisorDetailPage() {
  const { id } = useParams();
  const advisor = advisorsData[id || "1"];

  if (!advisor) {
    return (
      <Container sx={{ py: 20, textAlign: "center" }}>
        <Typography variant="h4">Asesor no encontrado</Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: "center" }}>
              <Avatar
                src={advisor.image}
                alt={advisor.name}
                sx={{
                  width: 200,
                  height: 200,
                  margin: "0 auto",
                  border: "4px solid white",
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={2}>
                <Typography variant="h2" fontWeight={700}>
                  {advisor.name}
                </Typography>
                <Typography variant="h5">{advisor.role}</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Rating value={advisor.rating} precision={0.1} readOnly />
                  <Typography variant="h6">{advisor.rating}</Typography>
                </Stack>
                <Chip
                  label={advisor.experience}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    width: "fit-content",
                  }}
                />
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Especialización: {advisor.specialization}
                </Typography>
                <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {advisor.vehiclesSold}+
                    </Typography>
                    <Typography>Vehículos vendidos</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {advisor.experience.split(" ")[0]}
                    </Typography>
                    <Typography>Años de experiencia</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sobre el Asesor */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Sobre {advisor.name.split(" ")[0]}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {advisor.bio}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Logros y Certificaciones
                </Typography>
                <Stack spacing={1}>
                  {advisor.achievements.map(
                    (achievement: string, index: number) => (
                      <Chip
                        key={index}
                        label={achievement}
                        color="primary"
                        variant="outlined"
                        sx={{ width: "fit-content" }}
                      />
                    ),
                  )}
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Vehículos Recientes
                </Typography>
                <Grid container spacing={3}>
                  {advisor.recentVehicles.map((vehicle: any) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={vehicle.id}>
                      <Card>
                        <Box
                          component="img"
                          src={vehicle.image}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          sx={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" fontWeight={600}>
                            {vehicle.brand} {vehicle.model}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Año: {vehicle.year}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            fontWeight={700}
                            sx={{ mt: 1 }}
                          >
                            ${vehicle.price.toLocaleString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider />

              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Testimonios de Clientes
                </Typography>
                <Stack spacing={2}>
                  {advisor.testimonials.map(
                    (testimonial: any, index: number) => (
                      <Card key={index} variant="outlined">
                        <CardContent>
                          <Stack spacing={1}>
                            <Rating
                              value={testimonial.rating}
                              readOnly
                              size="small"
                            />
                            <Typography variant="body1">
                              "{testimonial.comment}"
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              - {testimonial.client}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ position: "sticky", top: 100 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Contactar a {advisor.name.split(" ")[0]}
                </Typography>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    fullWidth
                    href={`https://wa.me/${advisor.phone.replace(/\D/g, "")}`}
                    target="_blank"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<EmailIcon />}
                    fullWidth
                    href={`mailto:${advisor.email}`}
                  >
                    Email
                  </Button>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Teléfono:</strong> {advisor.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {advisor.email}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <CTA
        title="¿Listo para encontrar tu vehículo ideal?"
        description={`Trabaja con ${advisor.name.split(" ")[0]} y obtén asesoría personalizada en todo el proceso.`}
        primaryButtonText="Solicitar cotización"
        primaryButtonLink="/dashboard/quotes/create"
      />
    </>
  );
}
