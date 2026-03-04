import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Búsqueda y selección internacional",
    description:
      "Localizamos el vehículo ideal en subastas y concesionarios internacionales según tu presupuesto y preferencias.",
    imageLight: `url("https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=80&auto=format&fit=crop")`,
    imageDark: `url("https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=80&auto=format&fit=crop")`,
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Gestión de importación y aduanas",
    description:
      "Nos encargamos de documentación, impuestos, transporte marítimo y todos los trámites legales necesarios.",
    imageLight: `url("https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80&auto=format&fit=crop")`,
    imageDark: `url("https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80&auto=format&fit=crop")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Entrega segura y acompañamiento",
    description:
      "Supervisamos todo el proceso hasta la entrega final del vehículo, listo para circular en tu país.",
    imageLight: `url("https://images.unsplash.com/photo-1493238792000-8113da705763?w=1600&q=80&auto=format&fit=crop")`,
    imageDark: `url("https://images.unsplash.com/photo-1493238792000-8113da705763?w=1600&q=80&auto=format&fit=crop")`,
  },
];

interface ChipProps {
  selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: (theme.vars || theme).palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

interface MobileLayoutProps {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
  selectedFeature: (typeof items)[0];
}

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}: MobileLayoutProps) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 280,
            backgroundImage: "var(--items-imageLight)",
            ...theme.applyStyles("dark", {
              backgroundImage: "var(--items-imageDark)",
            }),
            ...(items[selectedItemIndex]
              ? {
                  "--items-imageLight": items[selectedItemIndex].imageLight,
                  "--items-imageDark": items[selectedItemIndex].imageDark,
                }
              : {}),
          })}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Nuestros servicios
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Nos especializamos en la importación segura y transparente de
          vehículos. Te acompañamos en cada etapa del proceso para que puedas
          comprar en el extranjero con total confianza.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: (theme.vars || theme).palette.action
                        .hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "70%" },
            height: "var(--items-image-height)",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={(theme) => ({
                m: "auto",
                width: 420,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: "var(--items-imageLight)",
                ...theme.applyStyles("dark", {
                  backgroundImage: "var(--items-imageDark)",
                }),
                ...(items[selectedItemIndex]
                  ? {
                      "--items-imageLight": items[selectedItemIndex].imageLight,
                      "--items-imageDark": items[selectedItemIndex].imageDark,
                    }
                  : {}),
              })}
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
