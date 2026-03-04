import * as React from "react";
import { NavLink, useNavigate } from "react-router";

import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
// import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Button from "@mui/joy/Button";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import ColorSchemeToggle from "../../components/ColorSchemeToggle";
import { closeSidebar } from "../../utils";
import { Link } from "@mui/joy";
import { supabase } from "../../lib/supabaseClient";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState<{
    fullName: string;
    email: string;
  } | null>(null);

  React.useEffect(() => {
    async function fetchUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserProfile({
            fullName: profile.full_name,
            email: profile.email,
          });
        } else {
          setUserProfile({
            fullName: user.user_metadata?.full_name || "Usuario",
            email: user.email || "",
          });
        }
      }
    }
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />

      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />

      {/* Header */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">E I D V</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>

      {/* <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Buscar..."
      /> */}

      {/* Navigation */}
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {/* Inicio */}
          <ListItem>
            <ListItemButton component={NavLink} to="/dashboard">
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Panel de control</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* Cotizaciones de autos */}
          <ListItem>
            <ListItemButton component={NavLink} to="/dashboard/quotes">
              <RequestQuoteRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Cotizaciones</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* Prospectos y Clientes */}
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <MonetizationOnIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Ventas</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton component={NavLink} to="/dashboard/leads">
                    Prospectos
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={NavLink} to="/dashboard/clients">
                    Clientes
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          {/* Vehículos */}
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <DirectionsCarRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Vehículos</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    component={NavLink}
                    to="/dashboard/vehicles/create"
                  >
                    Nuevo vehículo
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={NavLink} to="/dashboard/vehicles">
                    Ver vehículos
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        {/* Bottom */}
        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
          }}
        >
          <ListItem>
            <ListItemButton
              component="a"
              href="https://wa.me/59177053462"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SupportRoundedIcon />
              Soporte
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setOpenLogout(true)}>
              <LogoutRoundedIcon />
              Cerrar sesión
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Link
          variant="soft"
          color="neutral"
          sx={{
            flexGrow: 1,
            justifyContent: "flex-start",
            gap: 1.5,
            textTransform: "none",
            px: 1.5,
          }}
          component={NavLink}
          to="/dashboard/profile"
        >
          <Avatar
            variant="outlined"
            size="sm"
            src={userProfile?.fullName ? undefined : undefined}
          >
            {userProfile?.fullName?.[0]}
          </Avatar>

          <Box
            sx={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              level="title-sm"
              sx={{
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userProfile?.fullName || "Cargando..."}
            </Typography>

            <Typography
              level="body-xs"
              sx={{
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userProfile?.email || ""}
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* Modal de confirmación de cierre de sesión */}
      <Modal open={openLogout} onClose={() => setOpenLogout(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Confirmar cierre de sesión</DialogTitle>
          <Divider />
          <DialogContent>
            ¿Estás seguro de que deseas cerrar sesión?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenLogout(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}
