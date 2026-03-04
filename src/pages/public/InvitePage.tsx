import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useState } from "react";
import GoogleIcon from "../../components/icons/GoogleMaterialIcon";

function InvitePage() {
  const [search] = useSearchParams();
  const role = search.get("role") ?? "";
  const token = search.get("token") ?? "";
  const [decision, setDecision] = useState<string | null>(null);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Button
        fullWidth
        component="a"
        href="/dashboard"
        startIcon={<GoogleIcon />}
        color="primary"
        variant="text"
        size="medium"
      >
        Continuar con Google
      </Button>
      <Box>
        <Card variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
            Invitación de usuario
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Rol: {role || "—"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.tertiary", mb: 2 }}>
            Token: {token || "—"}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button onClick={() => setDecision("accepted")}>Aceptar</Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDecision("rejected")}
            >
              Rechazar
            </Button>
          </Box>

          {decision ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {decision === "accepted"
                ? "Invitación aceptada."
                : "Invitación rechazada."}
            </Typography>
          ) : null}
        </Card>
      </Box>
    </Container>
  );
}

export default InvitePage;
