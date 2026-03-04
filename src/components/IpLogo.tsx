import { useColorScheme } from "@mui/material";
import Box from "@mui/material/Box";

interface IpLogoProps {
  variant?: "full" | "icon";
  size?: "small" | "medium" | "large";
  inline?: boolean;
  sx?: object;
}
function IpLogo({
  variant = "full",
  size = "medium",
  inline = false,
  sx = {},
}: IpLogoProps) {
  const { mode, systemMode } = useColorScheme();

  // Detectar el modo real activo
  const currentMode = mode === "system" ? systemMode : mode;

  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const height = sizes[size];

  // Definir rutas dinámicamente
  const logoSrc =
    variant === "full"
      ? currentMode === "dark"
        ? "/images/logo-text-dark.png"
        : "/images/logo-text.png"
      : currentMode === "dark"
        ? "/images/logo.png"
        : "/images/logo.png";

  return (
    <Box
      component={inline ? "span" : "div"}
      sx={{
        display: inline ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 1.5,
        ...sx,
      }}
    >
      <img
        src={logoSrc}
        alt="El Importador de Vehículos"
        style={{
          height: variant === "full" ? height * 0.6 : height,
          width: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

export default IpLogo;
