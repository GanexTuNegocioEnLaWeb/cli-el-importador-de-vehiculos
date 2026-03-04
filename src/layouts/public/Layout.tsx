import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../../components/public/sections/AppAppBar";
import AppTheme from "../../theme/AppTheme";
import { Outlet } from "react-router";
import Footer from "../../components/public/sections/Footer";

export default function LayoutPublic(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Outlet />
      <Footer />
    </AppTheme>
  );
}
