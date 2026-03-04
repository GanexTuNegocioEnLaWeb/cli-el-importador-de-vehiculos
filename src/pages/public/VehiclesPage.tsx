import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router";
import { useState } from "react";
import { ButtonBase, Drawer } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { FiltersContent } from "../../components/public/FiltersVehicles";

const vehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "4Runner TRD Pro",
    year: 2023,
    price: 52000,
    mileage: 15000,
    condition: "Excelente",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    featured: true,
    badge: "Más vendido",
    savings: 8000,
    type: "SUV",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 2,
    brand: "BMW",
    model: "M4 Competition",
    year: 2023,
    price: 78000,
    mileage: 8000,
    condition: "Como nuevo",
    location: "Florida, USA",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    featured: true,
    badge: "Recién llegado",
    savings: 12000,
    type: "Deportivo",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 3,
    brand: "Jeep",
    model: "Grand Cherokee",
    year: 2022,
    price: 48000,
    mileage: 22000,
    condition: "Excelente",
    location: "Texas, USA",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    featured: false,
    savings: 7000,
    type: "SUV",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 4,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2022,
    price: 95000,
    mileage: 12000,
    condition: "Excelente",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    featured: true,
    badge: "Oferta especial",
    savings: 15000,
    type: "Deportivo",
    fuel: "Gasolina",
    transmission: "PDK",
  },
  {
    id: 5,
    brand: "Ford",
    model: "F-150 Raptor",
    year: 2023,
    price: 68000,
    mileage: 5000,
    condition: "Como nuevo",
    location: "Arizona, USA",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800",
    featured: false,
    savings: 10000,
    type: "Pickup",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 6,
    brand: "Mercedes-Benz",
    model: "AMG GT",
    year: 2022,
    price: 120000,
    mileage: 10000,
    condition: "Excelente",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    featured: true,
    badge: "Premium",
    savings: 18000,
    type: "Deportivo",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 7,
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 110000,
    mileage: 3000,
    condition: "Como nuevo",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
    featured: true,
    badge: "Eléctrico",
    savings: 20000,
    type: "Sedán",
    fuel: "Eléctrico",
    transmission: "Automática",
  },
  {
    id: 8,
    brand: "Audi",
    model: "RS6 Avant",
    year: 2023,
    price: 125000,
    mileage: 6000,
    condition: "Excelente",
    location: "Miami, USA",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
    featured: false,
    savings: 15000,
    type: "Wagon",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 9,
    brand: "Lexus",
    model: "RX 350",
    year: 2022,
    price: 45000,
    mileage: 18000,
    condition: "Excelente",
    location: "Texas, USA",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
    featured: false,
    savings: 5000,
    type: "SUV",
    fuel: "Híbrido",
    transmission: "Automática",
  },
  {
    id: 10,
    brand: "Chevrolet",
    model: "Corvette Z06",
    year: 2023,
    price: 105000,
    mileage: 2000,
    condition: "Como nuevo",
    location: "Florida, USA",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    featured: true,
    badge: "Supercar",
    savings: 10000,
    type: "Deportivo",
    fuel: "Gasolina",
    transmission: "Manual",
  },
  {
    id: 11,
    brand: "Range Rover",
    model: "Sport P400",
    year: 2022,
    price: 85000,
    mileage: 14000,
    condition: "Excelente",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?w=800",
    featured: false,
    savings: 12000,
    type: "SUV",
    fuel: "Híbrido",
    transmission: "Automática",
  },
  {
    id: 12,
    brand: "Toyota",
    model: "Tundra TRD Pro",
    year: 2023,
    price: 65000,
    mileage: 8000,
    condition: "Excelente",
    location: "Texas, USA",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800",
    featured: false,
    savings: 8000,
    type: "Pickup",
    fuel: "Híbrido",
    transmission: "Automática",
  },
];

export default function VehiclesPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
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
              Vehículos Disponibles
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              Explora nuestra selección de vehículos disponibles para
              importación desde Estados Unidos
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={8}>
          {/* Sidebar - visible en md+ */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                position: { md: "sticky" },
                top: 128,
                alignSelf: "flex-start",
              }}
            >
              {/* <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}> */}
              <FiltersContent
                onApply={() => {
                  console.log("aplicar filtros");
                  // { minPrice: 20000, maxPrice: 80000, fuel: ['electrico'], transmission: ['automatica'], minYear: 2020 }
                }}
                onReset={() => console.log("reset")}
              />
              {/* </Paper> */}
            </Box>
          </Grid>

          {/* Main area: search + vehicles */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Search row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                mb: 2,
              }}
            >
              {/* Buscador */}
              <TextField
                fullWidth
                placeholder="Buscar vehículo..."
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              {/* Botón filtros (solo mobile) */}
              <IconButton
                aria-label="Abrir filtros"
                onClick={() => setFiltersOpen(true)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  border: 1,
                  borderColor: "divider",
                  flexShrink: 0, // evita que se comprima
                }}
                size="large"
              >
                <FilterListIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Vehicles grid */}
            <Grid container spacing={3}>
              {vehicles.map((vehicle) => (
                <Grid size={{ xs: 12 }} key={vehicle.id}>
                  {/* Hacemos la tarjeta como ButtonBase para que todo sea clicable */}
                  <ButtonBase
                    component={RouterLink}
                    to={`/vehicles/${vehicle.id}`}
                    disableRipple
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      display: "block",
                      borderRadius: 2,
                      overflow: "hidden",
                      // estilo "plano" (sin sombra ni background de card)
                      boxShadow: "none",
                      bgcolor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    aria-label={`Ver detalles de ${vehicle.brand} ${vehicle.model}`}
                  >
                    <Box sx={{ position: "relative", width: "100%" }}>
                      {/* Imagen principal con más peso visual */}
                      <CardMedia
                        component="img"
                        height="280"
                        image={vehicle.image}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        sx={{
                          width: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {/* Badges encima de la imagen */}
                      {vehicle.badge && (
                        <Chip
                          label={vehicle.badge}
                          color="error"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 2,
                            fontWeight: 700,
                          }}
                        />
                      )}

                      {/* Overlay info (sutil) */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          p: 1.25,
                          // gradiente sutil para contraste
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
                          color: "common.white",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={700} noWrap>
                          {vehicle.brand} {vehicle.model}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.95 }}>
                          {vehicle.year} • {vehicle.mileage.toLocaleString()}{" "}
                          millas
                        </Typography>
                      </Box>
                    </Box>

                    {/* Información debajo de la imagen (sin aspecto "card") */}
                    <CardContent sx={{ p: 2 }}>
                      <Stack spacing={1}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontWeight={800}
                          >
                            ${vehicle.price.toLocaleString()}
                          </Typography>

                          {vehicle.savings > 0 && (
                            <Chip
                              label={`Ahorra $${vehicle.savings.toLocaleString()}`}
                              size="small"
                              color="success"
                              sx={{ fontWeight: 600 }}
                            />
                          )}
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                          📍 {vehicle.location} • {vehicle.type}
                        </Typography>

                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={vehicle.fuel}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={vehicle.transmission}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={vehicle.condition}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Drawer para filtros (visible en móvil) */}
        <Drawer
          anchor="right"
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ width: 320, p: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Filtros
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <FiltersContent
              onApply={() => {
                console.log("aplicar filtros");
                // { minPrice: 20000, maxPrice: 80000, fuel: ['electrico'], transmission: ['automatica'], minYear: 2020 }
              }}
              onReset={() => console.log("reset")}
            />
          </Box>
        </Drawer>
      </Container>
    </>
  );
}
