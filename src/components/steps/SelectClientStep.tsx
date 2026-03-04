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
import { useEffect, useMemo, useState } from "react";
import type { ClientItem } from "../../types/quotes.types";
import CreateClientModal from "../CreateClientModal";
import { supabase } from "../../lib/supabaseClient";

interface SelectClientStepProps {
  onBack: () => void;
  onSelect: (client: ClientItem) => void;
}

function SelectClientStep({ onBack, onSelect }: SelectClientStepProps) {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientQuery, setClientQuery] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("id, full_name, phone")
        .order("full_name");

      if (error) throw error;

      if (data) {
        setClients(
          data.map((c: any) => ({
            id: c.id,
            name: c.full_name,
            phone: c.phone,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = useMemo(() => {
    const q = clientQuery.trim().toLowerCase();
    if (!q) return clients;

    return clients.filter((c) =>
      [c.id, c.name, c.phone].some((val) => val.toLowerCase().includes(q)),
    );
  }, [clientQuery, clients]);

  const selectedClient = clients.find((c) => c.id === selectedClientId) ?? null;

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
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Seleccionar cliente
        </Typography>

        <Button variant="soft" onClick={() => setIsModalOpen(true)}>
          + Nuevo cliente
        </Button>
      </Box>

      <FormControl>
        <FormLabel>Buscar</FormLabel>
        <Input
          placeholder="Escribe nombre, teléfono o fuente"
          value={clientQuery}
          onChange={(e) => setClientQuery(e.target.value)}
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
            {filteredClients.length > 0 ? (
              filteredClients.map((c) => {
                const isSelected = selectedClientId === c.id;

                return (
                  <ListItem key={c.id}>
                    <ListItemButton
                      selected={isSelected}
                      onClick={() => setSelectedClientId(c.id)}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography level="body-sm">{c.name}</Typography>
                        <Typography
                          level="body-xs"
                          sx={{ color: "text.tertiary" }}
                        >
                          {c.phone}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <Typography
                  level="body-sm"
                  sx={{ p: 1, color: "text.tertiary" }}
                >
                  No se encontraron clientes.
                </Typography>
              </ListItem>
            )}
          </List>
        )}
      </FormControl>

      <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
        <Button variant="outlined" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={() => selectedClient && onSelect(selectedClient)}
          disabled={!selectedClient}
        >
          Continuar
        </Button>
      </Box>

      <CreateClientModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(client) => {
          setClients((prev) => [client, ...prev]);
          setSelectedClientId(client.id);
        }}
      />
    </Box>
  );
}

export default SelectClientStep;
