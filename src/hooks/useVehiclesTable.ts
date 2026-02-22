import * as React from "react";
import type { ColorPaletteProp } from "@mui/joy";

// Reutiliza los tipos que ya tenías
export type Customer = { initial: string; name: string; email: string };
export type OrderRow = {
  id: string;
  date: string;
  status: "Paid" | "Refunded" | "Cancelled" | string;
  customer: Customer;
  [k: string]: unknown;
};

type Order = "asc" | "desc";

export type VehiclesController = {
  // datos derivados
  uniqueCustomers: string[];
  filtered: OrderRow[];
  pageRows: OrderRow[];
  totalPages: number;
  allVisibleIds: string[];
  isAllSelected: boolean;

  // estados
  query: string;
  statusFilter: string | null;
  categoryFilter: string | null;
  customerFilter: string | null;
  openFiltersModal: boolean;
  order: Order;
  selected: string[];
  page: number;
  rowsPerPage: number;

  // setters / callbacks
  setQuery: (q: string) => void;
  setStatusFilter: (s: string | null) => void;
  setCategoryFilter: (c: string | null) => void;
  setCustomerFilter: (c: string | null) => void;
  setOpenFiltersModal: (b: boolean) => void;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;

  toggleSelectAllVisible: (checked: boolean) => void;
  toggleSelectRow: (id: string, checked: boolean) => void;
  resetFilters: () => void;

  chipForStatus: (status?: string) => {
    icon: React.ReactNode | null;
    color: ColorPaletteProp;
  };
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator<Key extends keyof OrderRow>(order: Order, orderBy: Key) {
  return order === "desc"
    ? (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
      ) => descendingComparator(a, b, orderBy)
    : (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
      ) => -descendingComparator(a, b, orderBy);
}

export function useVehiclesTable(
  initialRows: OrderRow[] = [],
): VehiclesController {
  // UI state
  const [rows, setRows] = React.useState<OrderRow[]>(initialRows);
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    null,
  );
  const [customerFilter, setCustomerFilter] = React.useState<string | null>(
    null,
  );
  const [openFiltersModal, setOpenFiltersModal] = React.useState(false);
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  /* =============== Derived data =============== */
  const uniqueCustomers = React.useMemo(
    () => Array.from(new Set(rows.map((r) => r.customer.name))),
    [rows],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((r) => {
        if (
          statusFilter &&
          statusFilter !== "all" &&
          r.status.toLowerCase() !== statusFilter.toLowerCase()
        )
          return false;
        if (
          customerFilter &&
          customerFilter !== "all" &&
          !r.customer.name.toLowerCase().includes(customerFilter.toLowerCase())
        )
          return false;
        if (q === "") return true;
        return [r.id, r.customer.name, r.customer.email, r.date].some((f) =>
          String(f).toLowerCase().includes(q),
        );
      })
      .sort(getComparator(order, "id"));
  }, [rows, query, statusFilter, customerFilter, order]);

  const totalPages = React.useMemo(
    () => Math.max(1, Math.ceil(filtered.length / rowsPerPage)),
    [filtered.length, rowsPerPage],
  );

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const pageRows = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const allVisibleIds = React.useMemo(
    () => pageRows.map((r) => r.id),
    [pageRows],
  );
  const isAllSelected = React.useMemo(
    () =>
      allVisibleIds.length > 0 &&
      allVisibleIds.every((id) => selected.includes(id)),
    [allVisibleIds, selected],
  );

  /* =============== Callbacks =============== */
  const toggleSelectAllVisible = React.useCallback(
    (checked: boolean) => {
      setSelected((prev) => {
        if (checked) {
          return Array.from(new Set(prev.concat(allVisibleIds)));
        }
        return prev.filter((id) => !allVisibleIds.includes(id));
      });
    },
    [allVisibleIds],
  );

  const toggleSelectRow = React.useCallback((id: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? prev.concat(id) : prev.filter((i) => i !== id),
    );
  }, []);

  const resetFilters = React.useCallback(() => {
    setStatusFilter(null);
    setCategoryFilter(null);
    setCustomerFilter(null);
  }, []);

  /* =============== UI helpers =============== */
  const chipForStatus = React.useCallback((status: string | undefined) => {
    // Import icons where uses this hook (o devolver strings aquí y mapear en la vista).
    const mapColor: Record<string, ColorPaletteProp> = {
      Paid: "success",
      Refunded: "neutral",
      Cancelled: "danger",
    };
    return {
      icon: null,
      color: mapColor[status ?? ""] ?? ("neutral" as ColorPaletteProp),
    };
  }, []);

  /* =============== Expose setter for rows for when you fetch data externally =============== */
  // setRows: permitir que el contenedor actualice datos (fetch).
  return {
    uniqueCustomers,
    filtered,
    pageRows,
    totalPages,
    allVisibleIds,
    isAllSelected,

    query,
    statusFilter,
    categoryFilter,
    customerFilter,
    openFiltersModal,
    order,
    selected,
    page,
    rowsPerPage,

    setQuery,
    setStatusFilter,
    setCategoryFilter,
    setCustomerFilter,
    setOpenFiltersModal,
    setOrder,
    setSelected,
    setPage,
    setRowsPerPage,

    toggleSelectAllVisible,
    toggleSelectRow,
    resetFilters,
    chipForStatus,
    // NOTE: si necesitas exponer setRows desde el hook, añádelo aquí.
    setRows,
  } as VehiclesController;
}
