import { createBrowserRouter } from "react-router";
import LayoutDashboard from "./layouts/dashboard/Layout";
import VehiclesPage from "./pages/VehiclesPage";
import HomePage from "./pages/HomePage";
import QuotesPage from "./pages/QuotesPage";
import LeadsPage from "./pages/LeadsPage";
import ClientsPage from "./pages/ClientsPage";
import VehiclesCreatePage from "./pages/VehiclesCreatePage";
import UsersPage from "./pages/UsersPage";
import UsersCreatePage from "./pages/UsersCreatePage";
import SupportPage from "./pages/SupportPage";
import ConfigPage from "./pages/ConfigPage";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: LayoutDashboard,
    handle: { breadcrumb: "Dashboard" },
    children: [
      { index: true, Component: HomePage, handle: { breadcrumb: "Inicio" } },
      {
        path: "quotes",
        Component: QuotesPage,
        handle: { breadcrumb: "Cotizaciones" },
      },
      {
        path: "leads",
        Component: LeadsPage,
        handle: { breadcrumb: "Prospectos" },
      },
      {
        path: "clients",
        Component: ClientsPage,
        handle: { breadcrumb: "Clientes" },
      },
      {
        path: "vehicles",
        handle: { breadcrumb: "Vehículos" },
        children: [
          { index: true, Component: VehiclesPage },
          {
            path: "create",
            Component: VehiclesCreatePage,
            handle: { breadcrumb: "Nuevo vehículo" },
          },
        ],
      },
      {
        path: "users",
        handle: { breadcrumb: "Usuarios" },
        children: [
          { index: true, Component: UsersPage },
          {
            path: "create",
            Component: UsersCreatePage,
            handle: { breadcrumb: "Nuevo usuario" },
          },
        ],
      },
      {
        path: "support",
        Component: SupportPage,
        handle: { breadcrumb: "Soporte" },
      },
      {
        path: "config",
        Component: ConfigPage,
        handle: { breadcrumb: "Configuración" },
      },
    ],
  },
]);
