import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Option,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";

function VehiclesEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [lotId, setLotId] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("En subasta");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  async function fetchVehicle() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .eq("advisor_id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setLotId(data.lot_id);
        setYear(data.year?.toString() || "");
        setMake(data.make || "");
        setModel(data.model || "");
        setStatus(data.status);
        setLocation(data.location || "");
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("vehicles")
        .update({
          year: year ? parseInt(year) : null,
          make,
          model,
          status,
          location,
        })
        .eq("id", id)
        .eq("advisor_id", user.id);

      if (error) throw error;

      navigate(`/dashboard/vehicles/${id}`);
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert("Error al actualizar el vehículo");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography level="h2" component="h1">
        Editar vehículo {lotId}
      </Typography>

      <Card variant="outlined" sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Año</FormLabel>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={saving}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Marca</FormLabel>
              <Input
                value={make}
                onChange={(e) => setMake(e.target.value)}
                disabled={saving}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Modelo</FormLabel>
              <Input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={saving}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select
                value={status}
                onChange={(_, v) => setStatus(String(v))}
                disabled={saving}
              >
                <Option value="En subasta">En subasta</Option>
                <Option value="Subasta perdida">Subasta perdida</Option>
                <Option value="En logística">En logística</Option>
                <Option value="Vendido">Vendido</Option>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Ubicación</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={saving}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/dashboard/vehicles/${id}`)}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            startDecorator={saving ? <CircularProgress size="sm" /> : null}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default VehiclesEditPage;

