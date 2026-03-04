import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Asesores from "../../components/public/sections/Asesores";

export default function AboutPage() {
  return (
    <>
      <Box
        sx={(theme) => ({
          width: "100%",
          backgroundRepeat: "no-repeat",

          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
          }),
        })}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: "center",
                fontSize: "clamp(3rem, 10vw, 3.5rem)",
              }}
            >
              Somos tu{" "}
              <Box
                component="span"
                sx={(theme) => ({
                  color: "primary.main",
                  ...theme.applyStyles("dark", {
                    color: "primary.light",
                  }),
                })}
              >
                aliado estratégico
              </Box>
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              Un equipo de expertos apasionados por facilitar la importación de
              vehículos desde Estados Unidos a Bolivia
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Nuestra Historia */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Nuestra Historia
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Fundada en 2015, El Importador de Vehículos nació de la necesidad
              de ofrecer un servicio transparente y confiable en la importación
              de vehículos desde Estados Unidos.
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Con más de 8 años de experiencia, hemos ayudado a cientos de
              clientes a cumplir el sueño de tener el vehículo que desean, con
              total transparencia en costos y acompañamiento personalizado en
              cada etapa del proceso.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Nuestro compromiso es brindar un servicio de excelencia, donde
              cada cliente se sienta seguro y respaldado desde la búsqueda del
              vehículo hasta su entrega en Bolivia.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
                alt="Equipo de trabajo"
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Equipo de Asesores */}
      <Asesores />
    </>
  );
}
