import * as React from "react";
import { NavLink } from "react-router";

import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import ColorSchemeToggle from "../../components/ColorSchemeToggle";
import { closeSidebar } from "../../utils";
import { Link } from "@mui/joy";

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

      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Buscar..."
      />

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
                <Typography level="title-sm">Inicio</Typography>
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

          {/* Usuarios */}
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Usuarios</Typography>
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
                    to="/dashboard/users/create"
                  >
                    Nuevo usuario
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={NavLink} to="/dashboard/users">
                    Ver usuarios
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
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton component={NavLink} to="/dashboard/support">
              <SupportRoundedIcon />
              Soporte
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={NavLink} to="/dashboard/config">
              <SettingsRoundedIcon />
              Configuración
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
          <Avatar variant="outlined" size="sm" />

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
              Usuario
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
              usuario@email.com
            </Typography>
          </Box>
        </Link>
      </Box>
    </Sheet>
  );
}
