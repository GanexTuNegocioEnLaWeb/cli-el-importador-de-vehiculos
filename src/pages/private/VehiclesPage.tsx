import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Input,
  Sheet,
  Table,
  Typography,
  CircularProgress,
  type ColorPaletteProp,
} from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { supabase } from "../../lib/supabaseClient";

export type Customer = { initial: string; name: string; email: string };

export type VehicleInfo = {
  brand: string;
  model: string;
  year: number;
  imageUrl: string;
};

export type VehiclesRow = {
  id: string; // real uuid from DB
  lotId: string; // LOT-xxxx
  date: string;
  status: string;
  vehicle: VehicleInfo;
  customer: Customer; // asesor
  [k: string]: unknown;
};

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [vehicles, setVehicles] = useState<VehiclesRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("vehicles")
        .select(`
          *,
          profiles:advisor_id (
            full_name,
            email
          )
        `)
        .eq("advisor_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted: VehiclesRow[] = data.map((item: any) => ({
          id: item.id,
          lotId: item.lot_id,
          date: new Date(item.created_at).toLocaleDateString(),
          status: item.status,
          vehicle: {
            brand: item.make || "Desconocido",
            model: item.model || "Desconocido",
            year: item.year || 0,
            imageUrl: item.copart_details?.images?.[0] || "https://via.placeholder.com/80x60",
          },
          customer: {
            initial: item.profiles?.full_name?.charAt(0) || "U",
            name: item.profiles?.full_name || "Sin asesor",
            email: item.profiles?.email || "",
          },
        }));
        setVehicles(formatted);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter((row) =>
      [row.lotId, row.customer.name, row.customer.email].some((value) =>
        value.toLowerCase().includes(q),
      ),
    );
  }, [query, vehicles]);

  const chipForStatus = useCallback((status: string | undefined) => {
    const mapColor: Record<string, ColorPaletteProp> = {
      "En subasta": "primary",
      "Subasta perdida": "neutral",
      "En logística": "warning",
      Vendido: "success",
    };
    return {
      icon: null,
      color: mapColor[status ?? ""] ?? ("neutral" as ColorPaletteProp),
    };
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography level="h2" component="h1">
          Vehículos
        </Typography>
        <Button
          component={RouterLink}
          to="/dashboard/vehicles/create"
          color="primary"
          size="sm"
        >
          Nuevo vehículo
        </Button>
      </Box>

      <Card variant="outlined" sx={{ p: 2 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Input
            size="sm"
            startDecorator={<SearchIcon />}
            placeholder="Buscar por lote, asesor o email..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>

        <Sheet
          variant="outlined"
          sx={{
            width: "100%",
            overflow: "auto",
            borderRadius: "sm",
          }}
        >
          <Table
            stickyHeader
            size="sm"
            sx={{
              "--TableCell-paddingY": "8px",
              "--TableCell-paddingX": "12px",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 140 }}>Vehículo</th>
                <th style={{ width: 160 }}>Asesor</th>
                <th style={{ width: 120 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((row) => {
                  const chip = chipForStatus(row.status);

                  return (
                    <tr key={row.id}>
                      {/* VEHÍCULO */}
                      <td>
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              src={row.vehicle.imageUrl}
                              alt={`${row.vehicle.brand} ${row.vehicle.model}`}
                              width={80}
                              height={60}
                              style={{ objectFit: "cover", borderRadius: 8 }}
                            />
                            <Chip
                              variant="soft"
                              sx={{ mt: 1 }}
                              size="sm"
                              startDecorator={chip.icon}
                              color={chip.color}
                            >
                              {row.status}
                            </Chip>
                          </Box>
                          <div>
                            <Typography level="body-sm" fontWeight="lg">
                              {row.vehicle.year} {row.vehicle.brand}{" "}
                              {row.vehicle.model}
                            </Typography>
                            <Typography level="body-xs">{row.lotId}</Typography>
                            <Typography level="body-xs" color="neutral">
                              {row.date}
                            </Typography>
                          </div>
                        </Box>
                      </td>

                      {/* ASESOR */}
                      <td>
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Avatar size="sm">{row.customer.initial}</Avatar>
                          <div>
                            <Typography level="body-sm">
                              {row.customer.name}
                            </Typography>
                            <Typography level="body-xs">
                              {row.customer.email}
                            </Typography>
                          </div>
                        </Box>
                      </td>

                      {/* ACCIONES */}
                      <td>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            size="sm"
                            variant="plain"
                            onClick={() =>
                              navigate(`/dashboard/vehicles/${row.id}`)
                            }
                          >
                            Ver detalles
                          </Button>
                          <Button
                            size="sm"
                            variant="outlined"
                            onClick={() =>
                              navigate(
                                `/dashboard/quotes/create?vehicleId=${row.id}`,
                              )
                            }
                          >
                            Nueva cotización
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                      No se encontraron vehículos.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Sheet>
      </Card>

      {confirmDeleteId && (
        <Card
          variant="outlined"
          sx={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2000,
            p: 2,
            minWidth: 320,
          }}
        >
          <Typography level="title-md" sx={{ mb: 1 }}>
            Confirmar eliminación
          </Typography>
          <Typography level="body-sm" sx={{ mb: 2 }}>
            ¿Eliminar el vehículo {confirmDeleteId}?
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => setConfirmDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              color="danger"
              onClick={async () => {
                try {
                  const { error } = await supabase
                    .from("vehicles")
                    .delete()
                    .eq("id", confirmDeleteId);
                  if (error) throw error;
                  setVehicles((prev) =>
                    prev.filter((v) => v.id !== confirmDeleteId),
                  );
                  setConfirmDeleteId(null);
                } catch (error) {
                  console.error("Error deleting vehicle:", error);
                  alert("Error al eliminar el vehículo");
                }
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
}

