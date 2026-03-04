import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface CTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  primaryButtonBlank?: boolean;
  secondaryButtonBlank?: boolean;
}

export default function CTA({
  title = "¿Listo para importar tu vehículo ideal?",
  description = "Cotiza gratis y sin compromiso. Te acompañamos en cada paso del proceso.",
  primaryButtonText = "Solicitar cotización",
  primaryButtonLink = "/dashboard/quotes/create",
  secondaryButtonText = "Ver vehículos disponibles",
  secondaryButtonLink = "/vehicles",
  primaryButtonBlank = false,
  secondaryButtonBlank = false,
}: CTAProps) {
  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Stack spacing={2} useFlexGap alignItems="center">
            <Typography variant="h3" component="h2" fontWeight={700}>
              {title}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              {description}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              component="a"
              href={primaryButtonLink}
              target={primaryButtonBlank ? "_blank" : undefined}
              variant="contained"
              size="large"
            >
              {primaryButtonText}
            </Button>
            <Button
              component="a"
              href={secondaryButtonLink}
              target={secondaryButtonBlank ? "_blank" : undefined}
              variant="outlined"
              size="large"
            >
              {secondaryButtonText}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
