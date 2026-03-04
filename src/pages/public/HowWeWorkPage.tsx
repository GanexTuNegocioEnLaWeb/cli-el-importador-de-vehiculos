import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CTA from "../../components/public/sections/CTA";
import Garantia from "../../components/public/sections/Garantia";
import WorkSteps from "../../components/public/sections/WorkSteps";

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero */}
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
              Cómo Trabajamos
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              Un proceso transparente y seguro en 6 pasos simples
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Proceso paso a paso */}
      <WorkSteps />

      <Garantia />

      <CTA
        title="¿Listo para comenzar?"
        description="Solicita tu cotización gratuita y comienza el proceso hoy mismo."
        primaryButtonText="Contactar un asesor"
        primaryButtonLink="https://wa.me/5210000000000"
        primaryButtonBlank
      />
    </>
  );
}
