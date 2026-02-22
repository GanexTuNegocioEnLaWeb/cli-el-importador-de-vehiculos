import { useVehiclesTable, type OrderRow } from "../hooks/useVehiclesTable";
import type { SheetProps } from "@mui/joy";
import VehiclesView from "./VehiclesTable";

// Mantén SAMPLE_ROWS exportado en algún archivo de fixtures si quieres
const SAMPLE_ROWS: OrderRow[] = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: { initial: "O", name: "Olivia Ryhe", email: "olivia@email.com" },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: { initial: "J", name: "Jay Hooper", email: "hooper@email.com" },
  },
];

type Props = {
  rows?: OrderRow[]; // inyectables desde la página
  sx?: SheetProps["sx"];
};

/**
 * VehiclesResponsive: contenedor que usa el hook (lógica) y renderiza la vista.
 * Si más adelante quieres data real: reemplaza SAMPLE_ROWS por fetch y pasa los datos
 * al hook / al controller.
 */
export default function VehiclesResponsive({ rows = SAMPLE_ROWS, sx }: Props) {
  // Opción A: pasar `rows` al hook (si lo expones). Actualmente el hook no expone setRows;
  // una forma simple: si vas a traer datos reales, haz fetch aquí y guarda `rows` en estado
  // y pásalos al hook (o modifica el hook para aceptar/actualizar rows).
  const controller = useVehiclesTable(rows);

  // Ejemplo corto: si quieres hacer fetch aquí:
  // React.useEffect(() => {
  //   async function load() {
  //     const resp = await fetch("/api/vehicles");
  //     const data = await resp.json();
  //     // aquí necesitarías exponer setRows desde el hook o mantener rows localmente
  //   }
  //   load();
  // }, []);

  return <VehiclesView controller={controller} sx={sx} />;
}
