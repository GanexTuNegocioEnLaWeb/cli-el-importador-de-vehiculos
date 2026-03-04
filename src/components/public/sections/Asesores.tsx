import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

const advisors = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Asesor Senior",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 2,
    name: "María Rodríguez",
    role: "Asesora Comercial",
    image: "https://i.pravatar.cc/300?img=47",
  },
  {
    id: 3,
    name: "Jorge Pérez",
    role: "Especialista en Clásicos",
    image: "https://i.pravatar.cc/300?img=33",
  },
  {
    id: 4,
    name: "Ana Gutiérrez",
    role: "Asesora Comercial",
    image: "https://i.pravatar.cc/300?img=45",
  },
];

function Asesores() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight={600}
        sx={{ mb: 6, color: "text.primary" }}
      >
        Nuestro Equipo
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {advisors.map((advisor) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={advisor.id}>
            <Stack alignItems="center" spacing={1.5}>
              {/* Avatar con borde sutil */}
              <Avatar
                src={advisor.image}
                alt={advisor.name}
                sx={{
                  width: 140,
                  height: 140,
                  border: "2px solid",
                  borderColor: "divider",
                }}
              />

              {/* Nombre */}
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "text.primary", mt: 1 }}
              >
                {advisor.name}
              </Typography>

              {/* Rol */}
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: "0.75rem",
                }}
              >
                {advisor.role}
              </Typography>

              {/* Botón */}
              <Button
                component="a"
                href={`/advisors/${advisor.id}`}
                variant="outlined"
                size="small"
                sx={{
                  mt: 1,
                  textTransform: "none",
                  fontWeight: 500,
                  color: "primary.main",
                }}
              >
                Ver perfil completo →
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Asesores;
