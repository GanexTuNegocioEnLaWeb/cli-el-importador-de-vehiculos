import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useColorScheme } from "@mui/material/styles";

const userTestimonials = [
  {
    avatar: <Avatar alt="Carlos Méndez" src="/images/client1.jpg" />,
    name: "Carlos Méndez",
    occupation: "Empresario",
    testimonial:
      "Importé mi camioneta desde Estados Unidos y el proceso fue totalmente transparente. Me explicaron cada costo desde el inicio y el vehículo llegó en perfectas condiciones.",
  },
  {
    avatar: <Avatar alt="Andrea López" src="/images/client2.jpg" />,
    name: "Andrea López",
    occupation: "Arquitecta",
    testimonial:
      "Lo que más me gustó fue el acompañamiento durante todo el proceso. Siempre estuvieron disponibles para resolver mis dudas. Recomiendo completamente el servicio.",
  },
  {
    avatar: <Avatar alt="Miguel Torres" src="/images/client3.jpg" />,
    name: "Miguel Torres",
    occupation: "Comerciante",
    testimonial:
      "Me ayudaron a conseguir un vehículo que no encontraba en mi país. Todo fue legal, claro y rápido. Sin duda volvería a importar con ellos.",
  },
  {
    avatar: <Avatar alt="Laura Hernández" src="/images/client4.jpg" />,
    name: "Laura Hernández",
    occupation: "Ingeniera",
    testimonial:
      "Tenía miedo de importar por posibles riesgos, pero el equipo me dio mucha confianza. Cumplieron tiempos y no hubo costos ocultos.",
  },
  {
    avatar: <Avatar alt="José Ramírez" src="/images/client5.jpg" />,
    name: "José Ramírez",
    occupation: "Transportista",
    testimonial:
      "Importé una pickup para trabajo y todo llegó exactamente como lo describieron. El proceso fue más sencillo de lo que imaginaba.",
  },
  {
    avatar: <Avatar alt="Daniela Castro" src="/images/client6.jpg" />,
    name: "Daniela Castro",
    occupation: "Contadora",
    testimonial:
      "Excelente servicio. Me asesoraron desde la búsqueda hasta la entrega final. Profesionalismo y seriedad en cada paso.",
  },
];

const darkModeLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const lightModeLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const { mode, systemMode } = useColorScheme();

  let logos;
  if (mode === "system") {
    if (systemMode === "light") {
      logos = lightModeLogos;
    } else {
      logos = darkModeLogos;
    }
  } else if (mode === "light") {
    logos = lightModeLogos;
  } else {
    logos = darkModeLogos;
  }

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Experiencias reales de nuestros clientes
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Conoce cómo ayudamos a nuestros clientes a importar su vehículo de
          forma segura, transparente y sin complicaciones. Nuestra prioridad es
          que cada proceso sea claro, eficiente y confiable.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
