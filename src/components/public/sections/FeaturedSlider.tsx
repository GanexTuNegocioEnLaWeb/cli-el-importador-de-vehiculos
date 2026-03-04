import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  condition?: string;
  location?: string;
  image: string;
  featured?: boolean;
  badge?: string;
  type?: string;
  fuel?: string;
  transmission?: string;
};

const CARS: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "4Runner TRD Pro",
    year: 2023,
    price: 52000,
    mileage: 15000,
    condition: "Excelente",
    location: "California, USA",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=80&auto=format&fit=crop",
    featured: true,
    badge: "Más vendido",
    type: "SUV",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 2,
    brand: "Ford",
    model: "Mustang GT",
    year: 2022,
    price: 48000,
    mileage: 12000,
    location: "Florida, USA",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&q=80&auto=format&fit=crop",
    featured: true,
    badge: "Recomendado",
    type: "Coupe",
    fuel: "Gasolina",
    transmission: "Automática",
  },
  {
    id: 3,
    brand: "Subaru",
    model: "Outback",
    year: 2024,
    price: 42000,
    mileage: 5000,
    location: "Oregon, USA",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80&auto=format&fit=crop",
    featured: true,
    badge: "Nuevo",
    type: "Wagon",
    fuel: "Gasolina",
    transmission: "Automática",
  },
];

const SlideRoot = styled("div")<{ height: number }>(({ height }) => ({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  height,
}));

export default function FeaturedSlider({
  autoplay = true,
  interval = 10000,
  height = 400,
}: {
  autoplay?: boolean;
  interval?: number;
  height?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // touch/swipe
  const touchStartX = useRef<number | null>(null);
  const touchDelta = useRef(0);

  useEffect(() => {
    if (!autoplay || isHover) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % CARS.length);
    }, interval);
    return () => clearInterval(t);
  }, [autoplay, interval, isHover]);

  const prev = () => setIndex((i) => (i - 1 + CARS.length) % CARS.length);
  const next = () => setIndex((i) => (i + 1) % CARS.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchDelta.current = 0;
  };

  if (!CARS || CARS.length === 0) return null;

  return (
    <SlideRoot
      id="featured"
      height={height}
      ref={containerRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Slides wrapper */}
      <Box
        sx={{
          display: "flex",
          width: `${CARS.length * 100}%`,
          transform: `translateX(-${index * (100 / CARS.length)}%)`,
          transition: "transform 600ms ease",
          height: "100%",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {CARS.map((car) => (
          <Box
            key={car.id}
            sx={{
              minWidth: `${100 / CARS.length}%`,
              height: "100%",
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.18)), url(${car.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              p: 2,
            }}
          >
            {/* Clickable area to go to detail */}
            <ButtonBase
              component="a"
              href={`/vehicles/${car.id}`}
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                textAlign: "left",
                borderRadius: 2,
                color: "inherit",
                "&:hover .meta": { transform: "translateY(0)" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  className="meta"
                  sx={{
                    transform: "translateY(-10px)",
                    transition: "transform 300ms ease",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.00), rgba(0,0,0,0.45))",
                    color: "common.white",
                    p: 2,
                    mt: 2,
                    maxWidth: { xs: "100%", sm: "70%" },
                  }}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {car.badge && <Chip label={car.badge} size="small" />}
                      <Typography variant="subtitle2">
                        {car.brand} {car.model}
                      </Typography>
                    </Stack>

                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      ${car.price.toLocaleString()}
                    </Typography>

                    <Typography variant="body2" color="grey.200">
                      {car.year} • {car.mileage ? `${car.mileage} km` : ""} •{" "}
                      {car.location}
                    </Typography>

                    <Typography variant="caption" sx={{ opacity: 0.95 }}>
                      Ver detalle
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </ButtonBase>
          </Box>
        ))}
      </Box>

      {/* Controls */}
      <IconButton
        aria-label="Anterior"
        onClick={prev}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.35)",
          color: "common.white",
          "&:hover": { bgcolor: "rgba(0,0,0,0.45)" },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton
        aria-label="Siguiente"
        onClick={next}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.35)",
          color: "common.white",
          "&:hover": { bgcolor: "rgba(0,0,0,0.45)" },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      {/* Dots */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {CARS.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: i === index ? "common.white" : "rgba(255,255,255,0.5)",
              opacity: i === index ? 1 : 0.7,
              cursor: "pointer",
            }}
            role="button"
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </Stack>
    </SlideRoot>
  );
}
