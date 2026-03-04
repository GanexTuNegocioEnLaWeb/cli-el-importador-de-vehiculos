import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import IpLogo from "../../IpLogo";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 8,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "2fr 1fr 1.2fr",
            },
            gap: 6,
          }}
        >
          {/* Marca */}
          <Box>
            <IpLogo size="large" />
            <Typography
              sx={{ mt: 2, color: "text.secondary", maxWidth: "380px" }}
            >
              Especialistas en importación de vehículos desde EE.UU.
              Transparencia total, costos claros y acompañamiento en todo el
              proceso hasta Bolivia.
            </Typography>
          </Box>

          {/* Empresa */}
          <Box>
            <Typography fontWeight={600} mb={2}>
              Empresa
            </Typography>

            <Stack spacing={1}>
              <Link component="a" href="/about" color="text.secondary">
                Quiénes somos
              </Link>
              <Link component="a" href="/how-we-work" color="text.secondary">
                Cómo trabajamos
              </Link>
              <Link component="a" href="/faq" color="text.secondary">
                Preguntas frecuentes
              </Link>
            </Stack>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography fontWeight={600} mb={2}>
              Contacto
            </Typography>

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
                <Typography color="text.secondary">
                  Santa Cruz, Bolivia
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography color="text.secondary">
                  contacto@elimportador.bo
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} mt={3}>
              <IconButton size="small" color="inherit">
                <FacebookIcon />
              </IconButton>

              <IconButton size="small" color="inherit">
                <InstagramIcon />
              </IconButton>

              <IconButton size="small" color="inherit">
                <WhatsAppIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Barra inferior */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography color="text.secondary">
            © {new Date().getFullYear()} El Importador de Vehículos - Bolivia.
            Todos los derechos reservados.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link component="a" href="/terms" color="primary">
              Términos y condiciones
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
