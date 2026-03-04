import { createBrowserRouter } from "react-router";
import LayoutDashboard from "./layouts/dashboard/Layout";

import PublicHomePage from "./pages/public/HomePage";
import PublicInvitePage from "./pages/public/InvitePage";
import PublicVehiclesPage from "./pages/public/VehiclesPage";
import PublicVehicleDetailPage from "./pages/public/VehicleDetailPage";
import PublicTermsPage from "./pages/public/TermsPage";
import PublicAboutPage from "./pages/public/AboutPage";
import PublicAdvisorDetailPage from "./pages/public/AdvisorDetailPage";
import PublicHowWeWorkPage from "./pages/public/HowWeWorkPage";
import PublicServicesPage from "./pages/public/ServicesPage";
import PublicFAQPage from "./pages/public/FAQPage";
import PublicLoginPage from "./pages/public/LoginPage";

import VehiclesPage from "./pages/private/VehiclesPage";
import QuotesPage from "./pages/private/QuotesPage";
import QuotesCreatePage from "./pages/private/QuotesCreatePage";
import LeadsPage from "./pages/private/LeadsPage";
import ClientsPage from "./pages/private/ClientsPage";
import VehiclesCreatePage from "./pages/private/VehiclesCreatePage";
import VehiclesDetailPage from "./pages/private/VehiclesDetailPage";
import VehiclesEditPage from "./pages/private/VehiclesEditPage";
import LeadsCreatePage from "./pages/private/LeadsCreatePage";
import LeadOrClientDetailPage from "./pages/private/LeadOrClientDetailPage";
import HomeDashboardPage from "./pages/private/HomeDashboardPage";
import LayoutPublic from "./layouts/public/Layout";
import ProfilePage from "./pages/private/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: LayoutDashboard,
    handle: { breadcrumb: "Dashboard" },
    children: [
      {
        index: true,
        Component: HomeDashboardPage,
        handle: { breadcrumb: "Inicio" },
      },
      {
        path: "quotes",
        handle: { breadcrumb: "Cotizaciones" },
        children: [
          { index: true, Component: QuotesPage },
          {
            path: "create",
            Component: QuotesCreatePage,
            handle: { breadcrumb: "Nueva cotización" },
          },
        ],
      },
      {
        path: "leads",
        handle: { breadcrumb: "Prospectos" },
        children: [
          { index: true, Component: LeadsPage },
          {
            path: "create",
            Component: LeadsCreatePage,
            handle: { breadcrumb: "Nuevo prospecto" },
          },
        ],
      },
      {
        path: "contacts/:id",
        Component: LeadOrClientDetailPage,
        handle: { breadcrumb: "Detalle contacto" },
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
            path: ":id",
            Component: VehiclesDetailPage,
            handle: { breadcrumb: "Detalle vehículo" },
          },
          {
            path: "edit/:id",
            Component: VehiclesEditPage,
            handle: { breadcrumb: "Editar vehículo" },
          },
          {
            path: "create",
            Component: VehiclesCreatePage,
            handle: { breadcrumb: "Nuevo vehículo" },
          },
        ],
      },
      {
        path: "profile",
        handle: { breadcrumb: "Perfil" },
        children: [{ index: true, Component: ProfilePage }],
      },
    ],
  },
  {
    path: "/",
    Component: LayoutPublic,
    children: [
      {
        index: true,
        Component: PublicHomePage,
        handle: { breadcrumb: "Inicio" },
      },

      { path: "vehicles", Component: PublicVehiclesPage },
      { path: "vehicles/:id", Component: PublicVehicleDetailPage },
      { path: "about", Component: PublicAboutPage },
      { path: "advisors/:id", Component: PublicAdvisorDetailPage },
      { path: "how-we-work", Component: PublicHowWeWorkPage },
      { path: "services", Component: PublicServicesPage },
      { path: "faq", Component: PublicFAQPage },
      { path: "terms", Component: PublicTermsPage },
    ],
  },
  {
    path: "login",
    Component: PublicLoginPage,
  },
  {
    path: "/invite",
    Component: PublicInvitePage,
  },
]);
