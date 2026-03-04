import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabaseClient";

function LeadsCreatePage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = fullName.trim() !== "" && phone.trim() !== "" && !loading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("contacts").insert({
        type: "lead",
        full_name: fullName,
        phone,
        source: source || null,
        age: age ? parseInt(age) : null,
        address: address || null,
        email: email || null,
        created_by: user?.id,
      });

      if (error) throw error;

      navigate("/dashboard/leads");
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Error al crear el prospecto");
    } finally {
      setLoading(false);
    }
  };

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
          Nuevo prospecto
        </Typography>
      </Box>

      <Card
        component="form"
        variant="outlined"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography level="title-md" sx={{ mb: 2 }}>
            Datos principales
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <FormControl required>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Ej: Juan Pérez"
                disabled={loading}
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Teléfono</FormLabel>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Ej: +591 70000000"
                disabled={loading}
              />
            </FormControl>
          </Box>
        </Box>

        <Box>
          <Typography level="title-md" sx={{ mb: 2 }}>
            Detalles avanzados (opcionales)
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel>Fuente</FormLabel>
              <Input
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Facebook, TikTok, en persona, etc."
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Edad</FormLabel>
              <Input
                type="number"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                disabled={loading}
              />
            </FormControl>

            <FormControl sx={{ gridColumn: { xs: "auto" } }}>
              <FormLabel>Dirección</FormLabel>
              <Input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Correo</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
              />
            </FormControl>
          </Box>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/leads")}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!canSubmit}
            startDecorator={loading ? <CircularProgress size="sm" /> : null}
          >
            {loading ? "Guardando..." : "Guardar prospecto"}
          </Button>
        </Stack>
      </Card>
    </>
  );
}

export default LeadsCreatePage;

