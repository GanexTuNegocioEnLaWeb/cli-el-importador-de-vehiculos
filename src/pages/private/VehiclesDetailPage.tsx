import {
  Box,
  Card,
  Chip,
  List,
  ListItem,
  ListItemDecorator,
  Sheet,
  Table,
  Typography,
  CircularProgress,
  Button,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  Autocomplete,
  Divider,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";

interface VehicleDetail {
  id: string;
  lotId: string;
  date: string;
  status: string;
  advisor: { name: string; email: string };
  title: string;
  location: string;
}

interface QuoteHistory {
  id: string;
  code: string;
  client: string;
  usd: number;
  date: string;
}

interface ContactOption {
  id: string;
  full_name: string;
  type: "lead" | "client";
}

function VehiclesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [quotes, setQuotes] = useState<QuoteHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Mark as sold state
  const [openSoldModal, setOpenSoldModal] = useState(false);
  const [contacts, setContacts] = useState<ContactOption[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactOption | null>(null);
  const [processingSold, setProcessingSold] = useState(false);

  useEffect(() => {
    if (id) {
      fetchVehicleData();
    }
  }, [id]);

  useEffect(() => {
    if (openSoldModal) {
      fetchContacts();
    }
  }, [openSoldModal]);

  async function fetchContacts() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("contacts")
        .select("id, full_name, type")
        .eq("created_by", user.id)
        .order("full_name");
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  async function handleMarkAsSold() {
    if (!selectedContact || !id) return;

    setProcessingSold(true);
    try {
      // 1. Update vehicle
      const { error: vError } = await supabase
        .from("vehicles")
        .update({
          status: "Vendido",
          client_id: selectedContact.id,
        })
        .eq("id", id);

      if (vError) throw vError;

      // 2. Update contact if it was a lead
      if (selectedContact.type === "lead") {
        const { error: cError } = await supabase
          .from("contacts")
          .update({ type: "client" })
          .eq("id", selectedContact.id);

        if (cError) throw cError;
      }

      setOpenSoldModal(false);
      fetchVehicleData(); // Refresh data
    } catch (error) {
      console.error("Error marking as sold:", error);
      alert("Error al marcar como vendido");
    } finally {
      setProcessingSold(false);
    }
  }

  async function fetchVehicleData() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: vData, error: vError } = await supabase
        .from("vehicles")
        .select(`
          *,
          profiles:advisor_id (
            full_name,
            email
          )
        `)
        .eq("id", id)
        .eq("advisor_id", user.id)
        .single();

      if (vError) throw vError;

      if (vData) {
        setVehicle({
          id: vData.id,
          lotId: vData.lot_id,
          date: new Date(vData.created_at).toLocaleDateString(),
          status: vData.status,
          advisor: {
            name: vData.profiles?.full_name || "Sin asesor",
            email: vData.profiles?.email || "",
          },
          title: `${vData.year || ""} ${vData.make || ""} ${vData.model || ""}`.trim() || "Vehículo sin nombre",
          location: vData.location || "No especificada",
        });
      }

      const { data: qData, error: qError } = await supabase
        .from("quotes")
        .select(`
          *,
          contacts:client_id (
            full_name
          )
        `)
        .eq("vehicle_id", id)
        .order("created_at", { ascending: false });

      if (qError) throw qError;

      if (qData) {
        setQuotes(
          qData.map((q: any) => ({
            id: q.id,
            code: q.code || q.id.substring(0, 8),
            client: q.contacts?.full_name || "Sin cliente",
            usd: q.total_usd,
            date: new Date(q.created_at).toLocaleDateString(),
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!vehicle) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography level="h4">Vehículo no encontrado</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/dashboard/vehicles")}>
          Volver a vehículos
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography level="h2" component="h1">
          Vehículo {vehicle.lotId}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {vehicle.status !== "Vendido" && (
            <Button
              variant="solid"
              color="success"
              onClick={() => setOpenSoldModal(true)}
            >
              Marcar como vendido
            </Button>
          )}
          <Button variant="outlined" onClick={() => navigate("/dashboard/vehicles")}>
            Volver
          </Button>
        </Box>
      </Box>

      {/* Modal Marcar como vendido */}
      <Modal open={openSoldModal} onClose={() => setOpenSoldModal(false)}>
        <ModalDialog sx={{ width: 400 }}>
          <DialogTitle>Marcar como vendido</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography level="body-sm" sx={{ mb: 2 }}>
              Selecciona el contacto que realizó la compra. Si es un prospecto, se convertirá automáticamente en cliente.
            </Typography>
            <FormControl>
              <FormLabel>Contacto</FormLabel>
              <Autocomplete
                placeholder="Buscar contacto..."
                options={contacts}
                getOptionLabel={(option) => `${option.full_name} (${option.type === "lead" ? "Prospecto" : "Cliente"})`}
                value={selectedContact}
                onChange={(_, newValue) => setSelectedContact(newValue)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="success"
              onClick={handleMarkAsSold}
              loading={processingSold}
              disabled={!selectedContact}
            >
              Confirmar venta
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenSoldModal(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography level="title-md" sx={{ mb: 1 }}>
          Datos del vehículo
        </Typography>
        <List sx={{ "--ListItem-paddingY": "8px" }}>
          <ListItem>
            <ListItemDecorator sx={{ minWidth: 100 }}>Lote</ListItemDecorator>
            <Typography level="body-sm">{vehicle.lotId}</Typography>
          </ListItem>
          <ListItem>
            <ListItemDecorator sx={{ minWidth: 100 }}>Título</ListItemDecorator>
            <Typography level="body-sm">{vehicle.title}</Typography>
          </ListItem>
          <ListItem>
            <ListItemDecorator sx={{ minWidth: 100 }}>Fecha</ListItemDecorator>
            <Typography level="body-sm">{vehicle.date}</Typography>
          </ListItem>
          <ListItem>
            <ListItemDecorator sx={{ minWidth: 100 }}>Estado</ListItemDecorator>
            <Chip size="sm" variant="soft">
              {vehicle.status}
            </Chip>
          </ListItem>
          <ListItem>
            <ListItemDecorator sx={{ minWidth: 100 }}>Asesor</ListItemDecorator>
            <Typography level="body-sm">
              {vehicle.advisor.name} • {vehicle.advisor.email}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemDecorator sx={{ minWidth: 100 }}>Ubicación</ListItemDecorator>
            <Typography level="body-sm">{vehicle.location}</Typography>
          </ListItem>
        </List>
      </Card>

      <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography level="title-md" sx={{ mb: 1 }}>
          Historial de cotizaciones
        </Typography>
        <Sheet variant="outlined" sx={{ borderRadius: "sm", overflow: "auto" }}>
          <Table
            stickyHeader
            size="sm"
            sx={{ "--TableCell-paddingY": "8px", "--TableCell-paddingX": "12px" }}
          >
            <thead>
              <tr>
                <th style={{ width: 120 }}>Código</th>
                <th style={{ width: 160 }}>Fecha</th>
                <th>Cliente</th>
                <th style={{ width: 160 }}>Total USD</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length > 0 ? (
                quotes.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Typography level="body-xs">{row.code}</Typography>
                    </td>
                    <td>
                      <Typography level="body-sm">{row.date}</Typography>
                    </td>
                    <td>
                      <Typography level="body-sm">{row.client}</Typography>
                    </td>
                    <td>
                      <Typography level="body-sm">${row.usd.toFixed(2)}</Typography>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                    <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                      No hay cotizaciones registradas.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Sheet>
      </Card>
    </Box>
  );
}

export default VehiclesDetailPage;

