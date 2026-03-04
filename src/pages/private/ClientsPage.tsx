import {
  Box,
  Button,
  Card,
  Chip,
  Input,
  Sheet,
  Table,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { supabase } from "../../lib/supabaseClient";
import FollowupModal from "../../components/common/FollowupModal";

type ProspectRow = {
  id: string;
  fullName: string;
  phone: string;
  source: string;
  lastInteraction?: {
    date: string;
    channel: string;
    note: string;
  } | null;
};

function ClientsPage() {
  const navigate = useNavigate();

  const [clients, setClients] = useState<ProspectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [followupOpen, setFollowupOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("contacts")
        .select(`
          id,
          full_name,
          phone,
          source,
          contact_followups (
            created_at,
            channel,
            note
          )
        `)
        .eq("type", "client")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedClients: ProspectRow[] = data.map((item: any) => {
          const lastFollowup = item.contact_followups?.sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )[0];

          return {
            id: item.id,
            fullName: item.full_name,
            phone: item.phone,
            source: item.source || "Desconocido",
            lastInteraction: lastFollowup
              ? {
                  date: new Date(lastFollowup.created_at).toLocaleDateString(),
                  channel: lastFollowup.channel,
                  note: lastFollowup.note,
                }
              : null,
          };
        });
        setClients(formattedClients);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((row) =>
      [row.id, row.fullName, row.phone, row.source].some((value) =>
        value.toLowerCase().includes(q),
      ),
    );
  }, [query, clients]);

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
          Clientes
        </Typography>
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
            placeholder="Buscar por nombre, teléfono o fuente..."
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
                <th style={{ width: 120 }}>Cliente</th>
                <th style={{ width: 128 }}>Contacto</th>
                <th style={{ width: 180 }}>Último seguimiento</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((row) => {
                  const last = row.lastInteraction;

                  return (
                    <tr key={row.id}>
                      <td>
                        <Box>
                          <Typography level="body-sm" fontWeight="lg">
                            {row.fullName}
                          </Typography>
                          <Typography
                            level="body-xs"
                            sx={{ color: "text.tertiary" }}
                          >
                            {row.id}
                          </Typography>
                        </Box>
                      </td>

                      <td>
                        <Box>
                          <Typography level="body-sm">{row.phone}</Typography>
                          <Typography
                            level="body-xs"
                            sx={{ color: "text.tertiary" }}
                          >
                            {row.source}
                          </Typography>
                        </Box>
                      </td>

                      <td>
                        {last ? (
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              <Chip size="sm" variant="soft">
                                {last.channel}
                              </Chip>
                              <Typography
                                level="body-xs"
                                sx={{ color: "text.tertiary" }}
                              >
                                {last.date}
                              </Typography>
                            </Box>
                            <Typography
                              level="body-xs"
                              sx={{
                                mt: 0.5,
                                color: "text.secondary",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              style={{
                                padding: 6,
                              }}
                            >
                              {last.note}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography
                            level="body-xs"
                            sx={{ color: "text.tertiary" }}
                          >
                            Sin seguimiento
                          </Typography>
                        )}
                      </td>

                      <td>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            size="sm"
                            variant="plain"
                            onClick={() =>
                              navigate(`/dashboard/contacts/${row.id}`)
                            }
                          >
                            Ver detalles
                          </Button>
                          <Button
                            size="sm"
                            variant="outlined"
                            onClick={() => {
                              setSelectedClientId(row.id);
                              setFollowupOpen(true);
                            }}
                          >
                            Nuevo seguimiento
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                      No se encontraron clientes.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Sheet>
      </Card>
      <FollowupModal
        open={followupOpen}
        onClose={() => setFollowupOpen(false)}
        onAdd={async (note, channel) => {
          if (!selectedClientId) return;
          try {
            const {
              data: { user },
            } = await supabase.auth.getUser();

            const { error } = await supabase.from("contact_followups").insert({
              contact_id: selectedClientId,
              note,
              channel,
              created_by: user?.id,
            });

            if (error) throw error;

            setFollowupOpen(false);
            fetchClients(); // Refresh list
          } catch (error) {
            console.error("Error adding followup:", error);
            alert("Error al añadir seguimiento");
          }
        }}
      />
    </>
  );
}

export default ClientsPage;

