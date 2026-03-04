import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { keyframes } from "@mui/system";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
`;

export default function Hero() {
  const scrollToFeatured = () => {
    const el = document.getElementById("featured");

    if (el) {
      const yOffset = -128; // distancia antes del elemento
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles?.("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 4, sm: 8 },
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
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Importamos tu&nbsp;
          </Typography>
          <Typography
            component="span"
            variant="h2"
            sx={(theme) => ({
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              color: "primary.main",
              ...theme.applyStyles?.("dark", {
                color: "primary.light",
              }),
            })}
          >
            próximo vehículo
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Nos encargamos de todo el proceso de importación: búsqueda,
            inspección, logística internacional, trámites aduanales y entrega
            final. Transparencia, seguridad y acompañamiento en cada paso.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%" }, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              size="large"
              href="https://wa.me/5210000000000"
              target="_blank"
              sx={{
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Contactar por WhatsApp
            </Button>

            <Button
              component="a"
              href="/vehicles"
              variant="outlined"
              size="large"
              sx={{
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Ver vehículos disponibles
            </Button>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Al hacer clic en &quot;Contactar por Whatsapp&quot; aceptas
            nuestros&nbsp;
            <Link component="a" href="/terms" color="primary">
              Términos y Condiciones
            </Link>
            .
          </Typography>
        </Stack>

        {/* BOTÓN FLECHA CONTINUAR */}
        <Button
          onClick={scrollToFeatured}
          sx={{
            mt: 6,
            minWidth: 0,
            width: 64,
            height: 64,
            borderRadius: "50%",
            color: "primary.main",
            animation: `${bounce} 2s infinite`,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "action.hover",
              transform: "scale(1.1)",
            },
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 40 }} />
        </Button>
      </Container>
    </Box>
  );
}
