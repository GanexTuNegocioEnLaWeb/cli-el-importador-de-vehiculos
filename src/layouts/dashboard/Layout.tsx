import {
  Box,
  Breadcrumbs,
  CssBaseline,
  CssVarsProvider,
  Link,
  Typography,
} from "@mui/joy";

import { NavLink, Outlet, useMatches, type UIMatch } from "react-router";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Header from "../../components/Header";
import Sidebar from "./Sidebar";

function LayoutDashboard() {
  type BreadcrumbHandle = {
    breadcrumb?: string;
  };

  const matches = useMatches() as UIMatch<unknown, BreadcrumbHandle>[];

  const crumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match, index, arr) => {
      const isLast = index === arr.length - 1;

      if (isLast) {
        return (
          <Typography
            key={match.pathname}
            color="primary"
            sx={{ fontWeight: 500, fontSize: 12 }}
          >
            {match.handle?.breadcrumb}
          </Typography>
        );
      }

      return (
        <Link
          key={match.pathname}
          component={NavLink}
          to={match.pathname}
          underline="hover"
          color="neutral"
          sx={{ fontSize: 12, fontWeight: 500 }}
        >
          {match.handle?.breadcrumb}
        </Link>
      );
    });
  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Header /> {/* Is for mobile */}
          <Sidebar />
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 6 },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100dvh",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs
                size="sm"
                separator={<ChevronRightRoundedIcon />}
                sx={{ pl: 0 }}
              >
                <Link
                  component={NavLink}
                  to="/dashboard"
                  underline="none"
                  color="neutral"
                >
                  <HomeRoundedIcon />
                </Link>

                {crumbs}
              </Breadcrumbs>
            </Box>
            <Outlet />
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default LayoutDashboard;
