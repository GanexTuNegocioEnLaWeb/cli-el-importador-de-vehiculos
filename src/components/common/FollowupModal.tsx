import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";

interface FollowupModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (note: string, channel: string) => void;
  title?: string;
}

function FollowupModal({
  open,
  onClose,
  onAdd,
  title = "Nuevo seguimiento",
}: FollowupModalProps) {
  const [note, setNote] = useState("");
  const [channel, setChannel] = useState("WhatsApp");

  const handleAdd = () => {
    if (!note.trim()) return;
    onAdd(note.trim(), channel.trim() || "WhatsApp");
    setNote("");
    setChannel("WhatsApp");
    onClose();
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
      <ModalDialog
        variant="outlined"
        sx={{
          width: {
            xs: "90vw",
            sm: 500,
            md: 600,
          },
          maxWidth: "100%",
          mx: 1,
        }}
      >
        <Typography level="title-lg" sx={{ p: 2 }}>
          {title}
        </Typography>
        <Divider />
        <FormControl sx={{ minWidth: 180 }}>
          <FormLabel>Canal</FormLabel>
          <Input
            size="sm"
            fullWidth
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="WhatsApp, Llamada, Reunión..."
          />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Nota</FormLabel>
          <Textarea
            minRows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escribe la nota del seguimiento..."
          />
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <Button size="sm" onClick={handleAdd} disabled={!note.trim()}>
            Agregar
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

export default FollowupModal;
