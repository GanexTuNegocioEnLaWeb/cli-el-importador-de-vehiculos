import {
  Box,
  Button,
  Card,
  Chip,
  Modal,
  ModalDialog,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  Stack,
  Textarea,
  Typography,
  Link,
  CircularProgress,
} from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import FollowupModal from "../../components/common/FollowupModal";
import { supabase } from "../../lib/supabaseClient";

type Interaction = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  channel: string;
  note: string;
};

type LeadDetail = {
  id: string;
  fullName: string;
  phone: string;
  source: string;
  age: number | null;
  address: string | null;
  email: string | null;
  type: "lead" | "client";
  soldVehicles: {
    lotId: string;
    title: string;
    status: string;
  }[];
};

function formatDateISO(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-BO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function statusColor(status: string) {
  const s = status.toLowerCase();
  if (s.includes("vend")) return "success";
  if (s.includes("subasta") || s.includes("en")) return "warning";
  if (s.includes("disponible")) return "primary";
  return "neutral";
}

function LeadOrClientDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state para edición inline
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addFollowUpDialogOpen, setAddFollowUpDialogOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const [contactRes, followupsRes, vehiclesRes] = await Promise.all([
        supabase
          .from("contacts")
          .select("*")
          .eq("id", id)
          .eq("created_by", user.id)
          .single(),
        supabase
          .from("contact_followups")
          .select("*")
          .eq("contact_id", id)
          .eq("created_by", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("vehicles")
          .select("*")
          .eq("client_id", id)
          .eq("advisor_id", user.id),
      ]);

      if (contactRes.error) throw contactRes.error;

      const contact = contactRes.data;
      const followups = followupsRes.data || [];
      const vehicles = vehiclesRes.data || [];

      setLead({
        id: contact.id,
        fullName: contact.full_name,
        phone: contact.phone,
        source: contact.source || "Desconocido",
        age: contact.age,
        address: contact.address,
        email: contact.email,
        type: contact.type,
        soldVehicles: vehicles.map((v: any) => ({
          lotId: v.lot_id,
          title: `${v.year || ""} ${v.make || ""} ${v.model || ""}`.trim() || "Vehículo sin nombre",
          status: v.status,
        })),
      });

      setInteractions(
        followups.map((f: any) => ({
          id: f.id,
          date: f.created_at,
          channel: f.channel,
          note: f.note,
        })),
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const visibleInteractions = useMemo(() => {
    let list = interactions.slice();
    if (filter.trim()) {
      const q = filter.toLowerCase();
      list = list.filter(
        (it) =>
          it.note.toLowerCase().includes(q) ||
          it.channel.toLowerCase().includes(q) ||
          formatDateISO(it.date).toLowerCase().includes(q),
      );
    }
    return list;
  }, [interactions, filter]);

  const handleAddInteraction = async (note: string, channel: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("contact_followups")
        .insert({
          contact_id: id,
          note,
          channel,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newItem: Interaction = {
          id: data.id,
          date: data.created_at,
          channel: data.channel,
          note: data.note,
        };
        setInteractions((prev) => [newItem, ...prev]);
      }
    } catch (error) {
      console.error("Error adding interaction:", error);
      alert("Error al añadir seguimiento");
    }
  };

  function handleStartEdit(id: string) {
    const it = interactions.find((x) => x.id === id);
    if (!it) return;
    setEdited((prev) => ({ ...prev, [id]: it.note }));
  }
  function handleChangeEdited(id: string, val: string) {
    setEdited((prev) => ({ ...prev, [id]: val }));
  }
  async function handleSaveEdited(id: string) {
    if (!(id in edited)) return;
    try {
      const { error } = await supabase
        .from("contact_followups")
        .update({ note: edited[id].trim() })
        .eq("id", id);

      if (error) throw error;

      const next = interactions.map((it) =>
        it.id === id ? { ...it, note: edited[id].trim() } : it,
      );
      setInteractions(next);
      setEdited((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (error) {
      console.error("Error saving interaction:", error);
      alert("Error al guardar cambios");
    }
  }

  function handleConfirmDelete(id: string) {
    setToDeleteId(id);
    setDeleteDialogOpen(true);
  }
  async function handleDelete() {
    if (toDeleteId == null) return;
    try {
      const { error } = await supabase
        .from("contact_followups")
        .delete()
        .eq("id", toDeleteId);

      if (error) throw error;

      setInteractions((prev) => prev.filter((x) => x.id !== toDeleteId));
      setDeleteDialogOpen(false);
      setToDeleteId(null);
    } catch (error) {
      console.error("Error deleting interaction:", error);
      alert("Error al eliminar seguimiento");
    }
  }

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

  if (!lead) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography level="h4">Contacto no encontrado</Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/dashboard/leads")}
        >
          Volver a prospectos
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gap: 2,
          alignItems: "start",

          height: { xs: "auto", md: "100vh" },
          overflow: { xs: "visible", md: "hidden" },
        }}
      >
        {/* LEFT: perfil y acciones */}
        <Stack
          spacing={2}
          sx={{
            height: { md: "100%" },
            overflow: { md: "auto" },
          }}
        >
          <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack spacing={2}>
              {/* Header perfil */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
              >
                <Box sx={{ flex: 1 }}>
                  <Chip
                    size="sm"
                    variant="soft"
                    color={lead.type === "client" ? "success" : "neutral"}
                    sx={{ textTransform: "uppercase", fontSize: 11, mb: 0.5 }}
                  >
                    {lead.type === "client" ? "Cliente" : "Prospecto"}
                  </Chip>

                  <Typography level="h3">{lead.fullName}</Typography>

                  <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
                    {lead.id}
                  </Typography>

                  <Link
                    onClick={() =>
                      window.open(
                        `https://wa.me/${lead.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                          "Hola, te escribo desde El Importador de Vehículos",
                        )}`,
                      )
                    }
                    sx={{ mt: 1, display: "inline-block" }}
                  >
                    <Typography level="body-md" sx={{ mt: 1, fontWeight: 500 }}>
                      {lead.phone}
                    </Typography>
                  </Link>

                  <Typography
                    level="body-sm"
                    sx={{
                      color: "text.tertiary",
                      mt: 0.5,
                      wordBreak: "break-word",
                    }}
                  >
                    {lead.email}
                  </Typography>

                  <Typography
                    level="body-sm"
                    sx={{
                      color: "text.tertiary",
                      wordBreak: "break-word",
                    }}
                  >
                    {lead.address}
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              {/* Acciones rápidas */}

              <Button
                fullWidth
                size="sm"
                variant="outlined"
                onClick={() =>
                  navigate(
                    lead.type === "client"
                      ? "/dashboard/clients"
                      : "/dashboard/leads",
                  )
                }
              >
                Volver
              </Button>
            </Stack>
          </Card>

          {/* quick details card */}
          <Card variant="outlined">
            <Typography level="title-md" sx={{ mb: 1 }}>
              Datos rápidos
            </Typography>
            <Stack spacing={0.5}>
              <Typography level="body-sm">
                <strong>Fuente:</strong> {lead.source}
              </Typography>
              {lead.age && (
                <Typography level="body-sm">
                  <strong>Edad:</strong> {lead.age} años
                </Typography>
              )}
            </Stack>
          </Card>

          {/* vehículos vendidos */}
          <Card
            variant="outlined"
            sx={{
              p: { xs: 2, sm: 3 },
            }}
          >
            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Box>
                <Typography level="title-md">Vehículos relacionados</Typography>
                <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                  Últimos registrados
                </Typography>
              </Box>

              <Chip size="sm" variant="soft" color="success">
                {lead.soldVehicles.length}
              </Chip>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {lead.soldVehicles.length === 0 ? (
              <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                Este contacto aún no tiene vehículos registrados.
              </Typography>
            ) : (
              <List sx={{ gap: 1 }}>
                {lead.soldVehicles.map((vehicle) => (
                  <ListItem
                    key={vehicle.lotId}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: "md",
                      transition: "all .2s ease",
                      "&:hover": {
                        backgroundColor: "background.paper",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography level="body-sm" sx={{ fontWeight: 500 }}>
                          {vehicle.title}
                        </Typography>

                        <Chip
                          size="sm"
                          variant="soft"
                          color={statusColor(vehicle.status)}
                        >
                          {vehicle.status}
                        </Chip>
                      </Stack>

                      <Typography
                        level="body-xs"
                        sx={{ color: "text.tertiary", mt: 0.5 }}
                      >
                        ID: {vehicle.lotId}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </Stack>

        {/* RIGHT: contenido principal (vehículos e historial) */}
        <Stack
          spacing={2}
          sx={{
            height: { md: "100%" },
            overflow: { md: "hidden" },
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: { xs: 2, sm: 3 },

              height: { md: "100%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
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
              <Typography level="title-md" component="h1">
                Historial y seguimiento
              </Typography>
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setAddFollowUpDialogOpen(true);
                }}
              >
                Nuevo seguimiento
              </Button>
            </Box>

            <Input
              size="sm"
              placeholder="Buscar seguimientos..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                flex: 1,
                overflow: "auto",
              }}
            >
              {/* list */}
              <List sx={{ "--ListItem-paddingY": "8px" }}>
                {visibleInteractions.length === 0 && (
                  <Box sx={{ p: 2 }}>
                    <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                      No hay seguimientos que coincidan. Agrega uno con el
                      botón superior.
                    </Typography>
                  </Box>
                )}

                {visibleInteractions.map((item) => {
                  const isEditing = item.id in edited;
                  const editedValue = edited[item.id] ?? item.note;
                  const changed =
                    isEditing && editedValue.trim() !== item.note.trim();

                  return (
                    <ListItem
                      key={item.id}
                      sx={{
                        alignItems: "stretch",
                        px: 0,
                      }}
                    >
                      <Card
                        variant="soft"
                        sx={{
                          width: "100%",
                          p: 2,
                          transition: "all .2s ease",
                          "&:hover": {
                            boxShadow: "sm",
                          },
                        }}
                      >
                        <Stack spacing={1}>
                          {/* Header */}
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Chip size="sm" variant="soft" color="primary">
                                {item.channel}
                              </Chip>

                              <Typography
                                level="body-xs"
                                sx={{ color: "text.tertiary" }}
                              >
                                {formatDateISO(item.date)}
                              </Typography>
                            </Stack>

                            <Stack direction="row" spacing={0.5}>
                              {!isEditing ? (
                                <IconButton
                                  size="sm"
                                  variant="plain"
                                  onClick={() => handleStartEdit(item.id)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              ) : (
                                <IconButton
                                  size="sm"
                                  variant="solid"
                                  color="success"
                                  onClick={() => handleSaveEdited(item.id)}
                                  disabled={!changed}
                                >
                                  <SaveIcon fontSize="small" />
                                </IconButton>
                              )}

                              <IconButton
                                size="sm"
                                variant="plain"
                                color="danger"
                                onClick={() => handleConfirmDelete(item.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Stack>

                          {/* Content */}
                          {!isEditing ? (
                            <Typography
                              level="body-sm"
                              sx={{
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                              }}
                            >
                              {item.note}
                            </Typography>
                          ) : (
                            <Textarea
                              minRows={3}
                              value={editedValue}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                              ) => handleChangeEdited(item.id, e.target.value)}
                              autoFocus
                            />
                          )}
                        </Stack>
                      </Card>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Card>
        </Stack>
      </Box>

      <Modal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        disablePortal
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalDialog variant="outlined">
          <Typography level="title-lg" sx={{ p: 2 }}>
            Confirmar eliminación
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography>
              ¿Estás seguro que deseas eliminar este seguimiento? Esta acción no
              se puede deshacer.
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2, justifyContent: "flex-end" }}
            >
              <Button
                variant="plain"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button color="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </Stack>
          </Box>
        </ModalDialog>
      </Modal>

      <FollowupModal
        open={addFollowUpDialogOpen}
        onClose={() => setAddFollowUpDialogOpen(false)}
        onAdd={(note, channel) => handleAddInteraction(note, channel)}
      />
    </>
  );
}

export default LeadOrClientDetailPage;

