import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFullName(data.full_name);
          setEmail(data.email);
          setRole(data.role);
          setCode(data.code || "");
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
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

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
          })
          .eq("id", user.id);

        if (error) throw error;
        alert("Perfil actualizado correctamente");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error al actualizar el perfil");
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
          Perfil
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ p: 3 }}>
        <Typography level="title-md" sx={{ mb: 2 }}>
          Datos del usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={saving}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Correo (no editable)</FormLabel>
              <Input type="email" value={email} disabled />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Rol</FormLabel>
              <Input value={role} disabled />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Código</FormLabel>
              <Input value={code} disabled />
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
          <Button
            onClick={handleSave}
            disabled={saving}
            startDecorator={saving ? <CircularProgress size="sm" /> : null}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default ProfilePage;

