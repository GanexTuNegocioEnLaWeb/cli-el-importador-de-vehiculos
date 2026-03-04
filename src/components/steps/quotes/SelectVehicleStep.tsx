import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  ListItemButton,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useMemo, useState, useEffect } from "react";
import type { VehicleItem } from "../../../types/quotes.types";
import { Link, useSearchParams } from "react-router";
import { supabase } from "../../../lib/supabaseClient";

interface SelectVehicleStepProps {
  onSelect: (vehicle: VehicleItem) => void;
  onCancel: () => void;
}

function SelectVehicleStep({ onSelect, onCancel }: SelectVehicleStepProps) {
  const [vehicles, setVehicles] = useState<VehicleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search] = useSearchParams();
  const [vehicleQuery, setVehicleQuery] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("id, lot_id, year, make, model, status")
        .eq("status", "En subasta")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setVehicles(
          data.map((v: any) => ({
            id: v.id,
            lotId: v.lot_id,
            title: `${v.year || ""} ${v.make || ""} ${v.model || ""}`.trim() || "Vehículo sin nombre",
            status: v.status,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  }

  const vehicleIdFromParam = search.get("vehicleId") ?? "";

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    vehicleIdFromParam,
  );

  const filteredVehicles = useMemo(() => {
    const q = vehicleQuery.trim().toLowerCase();
    if (!q) return vehicles;

    return vehicles.filter((v) =>
      [v.lotId, v.title].some((val) => val.toLowerCase().includes(q)),
    );
  }, [vehicleQuery, vehicles]);

  const selectedVehicle = useMemo(
    () => vehicles.find((v) => v.id === selectedVehicleId) || null,
    [vehicles, selectedVehicleId],
  );

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="body-lg">Seleccionar vehículo</Typography>

        <Button component={Link} variant="soft" to="/dashboard/vehicles/create">
          + Nuevo vehículo
        </Button>
      </Box>

      <FormControl>
        <FormLabel>Buscar</FormLabel>
        <Input
          placeholder="Escribe lote o título"
          value={vehicleQuery}
          onChange={(e) => setVehicleQuery(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Resultados</FormLabel>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress size="sm" />
          </Box>
        ) : (
          <List
            sx={{
              border: "1px solid var(--joy-palette-neutral-outlinedBorder)",
              borderRadius: "sm",
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((v) => {
                const isSelected = selectedVehicleId === v.id;

                return (
                  <ListItem key={v.id}>
                    <ListItemButton
                      selected={isSelected}
                      onClick={() => setSelectedVehicleId(v.id)}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography level="body-sm">
                          {v.lotId} - {v.title}
                        </Typography>
                        <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
                          {v.status}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <Typography level="body-sm" sx={{ p: 1, color: "text.tertiary" }}>
                  No se encontraron vehículos en subasta.
                </Typography>
              </ListItem>
            )}
          </List>
        )}
      </FormControl>

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          onClick={() => selectedVehicle && onSelect(selectedVehicle)}
          disabled={!selectedVehicle}
        >
          Continuar
        </Button>
      </Box>
    </Box>
  );
}

export default SelectVehicleStep;

