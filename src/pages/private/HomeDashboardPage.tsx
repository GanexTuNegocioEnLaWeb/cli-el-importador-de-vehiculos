import {
  Box,
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemDecorator,
  Sheet,
  Table,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { Link as RouterLink } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";

interface DashboardActivity {
  created_at: string;
  activity_type: string;
  title: string;
  description: string;
}

function HomeDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Vehículos", value: 0 },
    { label: "Cotizaciones", value: 0 },
    { label: "Prospectos", value: 0 },
    { label: "Clientes", value: 0 },
  ]);
  const [activities, setActivities] = useState<DashboardActivity[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const [
          { count: vehiclesCount },
          { count: quotesCount },
          { count: leadsCount },
          { count: clientsCount },
          { data: recentActivities },
        ] = await Promise.all([
          supabase
            .from("vehicles")
            .select("*", { count: "exact", head: true })
            .eq("advisor_id", user.id),
          supabase
            .from("quotes")
            .select("*", { count: "exact", head: true })
            .eq("created_by", user.id),
          supabase
            .from("contacts")
            .select("*", { count: "exact", head: true })
            .eq("type", "lead")
            .eq("created_by", user.id),
          supabase
            .from("contacts")
            .select("*", { count: "exact", head: true })
            .eq("type", "client")
            .eq("created_by", user.id),
          supabase
            .from("dashboard_recent_activity")
            .select("*")
            .eq("created_by", user.id)
            .limit(10),
        ]);

        setStats([
          { label: "Vehículos", value: vehiclesCount || 0 },
          { label: "Cotizaciones", value: quotesCount || 0 },
          { label: "Prospectos", value: leadsCount || 0 },
          { label: "Clientes", value: clientsCount || 0 },
        ]);

        if (recentActivities) {
          setActivities(recentActivities);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
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
          Panel de control
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography level="title-md" sx={{ mb: 1 }}>
          Estadísticas
        </Typography>
        <Grid container spacing={2}>
          {stats.map((s) => (
            <Grid key={s.label} xs={6} sm={3}>
              <Card variant="soft" sx={{ p: 2, textAlign: "center" }}>
                <Typography level="h3">{s.value}</Typography>
                <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                  {s.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Grid container spacing={3}>
        {/* Última actividad */}
        <Grid
          xs={12}
          md={8}
          sx={{
            order: { xs: 3, md: 1 }, // En mobile va después de acceso rápido
          }}
        >
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography level="title-md" sx={{ mb: 1 }}>
              Última actividad
            </Typography>

            <Sheet
              variant="outlined"
              sx={{ borderRadius: "sm", overflow: "auto" }}
            >
              <Table
                stickyHeader
                size="sm"
                sx={{
                  "--TableCell-paddingY": "8px",
                  "--TableCell-paddingX": "12px",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 140 }}>Fecha</th>
                    <th>Actividad</th>
                  </tr>
                </thead>

                <tbody>
                  {activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <tr key={index}>
                        <td>
                          <Typography level="body-sm">
                            {new Date(activity.created_at).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td>
                          <Box>
                            <Typography level="body-sm" fontWeight="lg">
                              {activity.activity_type}
                            </Typography>
                            <Typography
                              level="body-xs"
                              sx={{ color: "text.tertiary" }}
                            >
                              {activity.description} - {activity.title}
                            </Typography>
                          </Box>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center", padding: "20px" }}>
                        <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                          No hay actividad reciente.
                        </Typography>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Sheet>
          </Card>
        </Grid>

        {/* Columna derecha */}
        <Grid
          xs={12}
          md={4}
          sx={{
            order: { xs: 2, md: 2 }, // En mobile va debajo de estadísticas
          }}
        >
          {/* Acceso rápido */}
          <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography level="title-md" sx={{ mb: 1 }}>
              Acceso rápido
            </Typography>

            <List sx={{ "--ListItem-paddingY": "8px" }}>
              <ListItemButton component={RouterLink} to="/dashboard/leads">
                <ListItemDecorator>
                  <PersonIcon />
                </ListItemDecorator>
                <Typography>Ver prospectos</Typography>
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/dashboard/vehicles/create"
              >
                <ListItemDecorator>
                  <DirectionsCarIcon />
                </ListItemDecorator>
                <Typography>Crear vehículo</Typography>
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/dashboard/quotes/create"
              >
                <ListItemDecorator>
                  <RequestQuoteIcon />
                </ListItemDecorator>
                <Typography>Crear cotización</Typography>
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/dashboard/leads/create"
              >
                <ListItemDecorator>
                  <PersonAddIcon />
                </ListItemDecorator>
                <Typography>Crear prospecto</Typography>
              </ListItemButton>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeDashboardPage;

