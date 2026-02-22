import { Box, Button, Typography } from "@mui/joy";

import AddIcon from "@mui/icons-material/Add";

import VehiclesController from "../components/VehiclesController";
import { Link } from "react-router";

function VehiclesPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Vehículos
        </Typography>
        <Link to="/dashboard/vehicles/create">
          <Button color="primary" startDecorator={<AddIcon />} size="sm">
            Crear vehículo
          </Button>
        </Link>
      </Box>

      <VehiclesController />
    </>
  );
}

export default VehiclesPage;
