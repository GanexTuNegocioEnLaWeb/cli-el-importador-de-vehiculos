import { Button, Card, Stack, Typography } from "@mui/joy";
import GoogleIcon from "../../components/icons/GoogleMaterialIcon";
import { supabase } from "../../lib/supabaseClient";

async function handleLoginWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export default function LoginPage() {
  return (
    <Stack
      minHeight="70vh"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Card variant="outlined" sx={{ maxWidth: 400, width: "100%" }}>
        <Stack spacing={3} alignItems="stretch">
          <Stack spacing={0.5}>
            <Typography level="h3">Iniciar sesión</Typography>
            <Typography level="body-sm" color="neutral">
              Accede al panel usando tu cuenta de Google.
            </Typography>
          </Stack>

          <Button
            variant="soft"
            color="neutral"
            startDecorator={<GoogleIcon />}
            onClick={handleLoginWithGoogle}
          >
            Iniciar sesión con Google
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

