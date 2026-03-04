import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../../theme/ColorModeIconDropdown";
// import GoogleIcon from "../../icons/GoogleMaterialIcon";
import IpLogo from "../../IpLogo";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              px: 0,
              gap: 2,
            }}
          >
            <Button component="a" href="/">
              <IpLogo />
            </Button>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                component="a"
                href="/about"
                variant="text"
                color="info"
                size="medium"
              >
                Quienes Somos
              </Button>
              {/* <Button
                component="a"
                href="/how-we-work"
                variant="text"
                color="info"
                size="medium"
              >
                Cómo trabajamos
              </Button>
              <Button
                component="a"
                href="/faq"
                variant="text"
                color="info"
                size="medium"
              >
                Preguntas frecuentes
              </Button> */}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              fullWidth
              component="a"
              href="/vehicles"
              variant="outlined"
              size="large"
              sx={{
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Ver vehículos disponibles
            </Button>
            {/* <Button
              fullWidth
              component="a"
              href="/dashboard"
              startIcon={<GoogleIcon />}
              color="primary"
              variant="text"
              size="medium"
            >
              Continuar con Google
            </Button> */}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 2,
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <Button
                  fullWidth
                  component="a"
                  href="/about"
                  variant="text"
                  color="info"
                  size="medium"
                >
                  Quienes Somos
                </Button>

                {/* <Button
                  fullWidth
                  component="a"
                  href="/how-we-work"
                  variant="text"
                  color="info"
                  size="medium"
                >
                  Cómo trabajamos
                </Button>

                <Button
                  fullWidth
                  component="a"
                  href="/faq"
                  variant="text"
                  color="info"
                  size="medium"
                >
                  FAQs
                </Button> */}

                <Divider sx={{ my: 3 }} />

                <Button
                  fullWidth
                  component="a"
                  href="/vehicles"
                  variant="outlined"
                  size="large"
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                >
                  Ver vehículos disponibles
                </Button>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
