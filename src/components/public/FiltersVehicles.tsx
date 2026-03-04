import { useState, useCallback } from "react";
import {
  Stack,
  Box,
  Typography,
  Slider,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  LocalGasStation,
  Settings,
  AttachMoney,
  RestartAlt,
  Check,
} from "@mui/icons-material";

// Opciones predefinidas para mejor UX
const FUEL_OPTIONS = [
  { value: "gasolina", label: "Gasolina", icon: "⛽" },
  { value: "diesel", label: "Diésel", icon: "🛢️" },
  { value: "hibrido", label: "Híbrido", icon: "🔋" },
  { value: "electrico", label: "Eléctrico", icon: "⚡" },
] as const;

const TRANSMISSION_OPTIONS = [
  { value: "automatica", label: "Automática", short: "Auto" },
  { value: "manual", label: "Manual", short: "Manual" },
] as const;

interface FiltersState {
  minPrice: number;
  maxPrice: number;
  fuel: string[];
  transmission: string[];
  minYear: number;
}

interface FiltersContentProps {
  onApply: (filters: FiltersState) => void;
  onReset?: () => void;
  initialFilters?: Partial<FiltersState>;
}

export function FiltersContent({
  onApply,
  onReset,
  initialFilters,
}: FiltersContentProps) {
  // Valores por defecto razonables
  const defaultFilters: FiltersState = {
    minPrice: 0,
    maxPrice: 150000,
    fuel: [],
    transmission: [],
    minYear: 2015,
  };

  const [filters, setFilters] = useState<FiltersState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const [priceRange, setPriceRange] = useState([
    filters.minPrice,
    filters.maxPrice,
  ]);

  // Computar si hay filtros activos
  const hasActiveFilters =
    filters.fuel.length > 0 ||
    filters.transmission.length > 0 ||
    filters.minYear > defaultFilters.minYear ||
    priceRange[0] > defaultFilters.minPrice ||
    priceRange[1] < defaultFilters.maxPrice;

  const activeFiltersCount =
    filters.fuel.length +
    filters.transmission.length +
    (filters.minYear > defaultFilters.minYear ? 1 : 0) +
    (priceRange[0] > defaultFilters.minPrice ||
    priceRange[1] < defaultFilters.maxPrice
      ? 1
      : 0);

  const handlePriceChange = useCallback(
    (_: Event, value: number | number[]) => {
      const [min, max] = value as number[];
      setPriceRange([min, max]);
      setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
    },
    [],
  );

  const toggleFuel = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      fuel: prev.fuel.includes(value)
        ? prev.fuel.filter((f) => f !== value)
        : [...prev.fuel, value],
    }));
  }, []);

  const toggleTransmission = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      transmission: prev.transmission.includes(value)
        ? prev.transmission.filter((t) => t !== value)
        : [...prev.transmission, value],
    }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters(defaultFilters);
    setPriceRange([defaultFilters.minPrice, defaultFilters.maxPrice]);
    onReset?.();
  }, [onReset]);

  const handleApply = useCallback(() => {
    onApply(filters);
  }, [filters, onApply]);

  return (
    <Stack
      spacing={3}
      sx={{
        p: 2,
        bgcolor: "background.default",
      }}
    >
      {/* Header con contador y reset */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Filtros
          {activeFiltersCount > 0 && (
            <Chip
              size="small"
              label={activeFiltersCount}
              sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
            />
          )}
        </Typography>
        {hasActiveFilters && (
          <Tooltip title="Limpiar filtros">
            <IconButton size="small" onClick={handleReset}>
              <RestartAlt fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Precio - Slider mejorado con inputs */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <AttachMoney color="action" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={600}>
            Rango de Precio
          </Typography>
        </Box>
        <Box
          sx={{
            px: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={150000}
            step={5000}
            marks={[
              { value: 0, label: "$0" },
              { value: 75000, label: "$75k" },
              { value: 150000, label: "$150k" },
            ]}
            valueLabelFormat={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              typography: "caption",
              color: "text.secondary",
            }}
          >
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </Box>
        </Box>
      </Box>

      {/* Combustible - Chips toggleables */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <LocalGasStation color="action" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={600}>
            Combustible
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {FUEL_OPTIONS.map((option) => {
            const isSelected = filters.fuel.includes(option.value);
            return (
              <Button
                key={option.value}
                variant={isSelected ? "contained" : "outlined"}
                size="small"
                onClick={() => toggleFuel(option.value)}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                {option.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Transmisión - Botones toggleables */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Settings color="action" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={600}>
            Transmisión
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {TRANSMISSION_OPTIONS.map((option) => {
            const isSelected = filters.transmission.includes(option.value);
            return (
              <Button
                key={option.value}
                variant={isSelected ? "contained" : "outlined"}
                size="small"
                onClick={() => toggleTransmission(option.value)}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                {option.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Botón aplicar - Sticky en mobile */}
      <Box
        sx={{
          pt: 2,
          mt: "auto",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleApply}
          startIcon={<Check />}
        >
          {hasActiveFilters
            ? `Ver resultados (${activeFiltersCount})`
            : "Selecciona un filtro"}
        </Button>
      </Box>
    </Stack>
  );
}
