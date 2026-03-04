import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const guarantees = [
  {
    title: "Transparencia Total",
    description:
      "Costos detallados desde el inicio, sin sorpresas ni cargos ocultos.",
    icon: <VisibilityOutlinedIcon />,
  },
  {
    title: "Seguimiento 24/7",
    description:
      "Mantente informado en cada etapa con actualizaciones constantes.",
    icon: <ShieldOutlinedIcon />,
  },
  {
    title: "Asesoría Experta",
    description: "Equipo especializado con años de experiencia en importación.",
    icon: <SupportAgentOutlinedIcon />,
  },
  {
    title: "Satisfacción Garantizada",
    description: "Respaldamos nuestro trabajo con garantía de satisfacción.",
    icon: <VerifiedOutlinedIcon />,
  },
];

function Garantia() {
  return (
    <Box sx={{ py: 12, backgroundColor: "#fafafa" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 1 }}
        >
          Nuestras Garantías
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
        >
          Trabajamos con procesos claros, soporte constante y respaldo real en
          cada operación.
        </Typography>

        <Grid container spacing={4}>
          {guarantees.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  p: 4,
                  border: "1px solid",
                  borderColor: "grey.200",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "primary.main",
                    color: "white",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Garantia;
