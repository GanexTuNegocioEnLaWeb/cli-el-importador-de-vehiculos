import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/joy";
import { useState } from "react";
import type { ClientItem } from "../types/quotes.types";
import { supabase } from "../lib/supabaseClient";

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (client: ClientItem) => void;
}

function CreateClientModal({
  open,
  onClose,
  onCreate,
}: CreateClientModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || !phone.trim() || loading) return;

    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("contacts")
        .insert({
          type: "lead",
          full_name: name.trim(),
          phone: phone.trim(),
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        onCreate({
          id: data.id,
          name: data.full_name,
          phone: data.phone,
        });
      }

      setName("");
      setPhone("");
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Error al crear el cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      disablePortal
      sx={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalDialog>
        <ModalClose />
        <Typography level="h4">Crear cliente</Typography>

        <Grid container spacing={2}>
          <Grid xs={12}>
            <FormControl required>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <FormControl required>
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="tel"
                id="phone"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleCreate}
            disabled={loading}
            startDecorator={loading ? <CircularProgress size="sm" /> : null}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

export default CreateClientModal;
