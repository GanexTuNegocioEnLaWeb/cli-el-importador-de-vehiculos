import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import type { SheetProps } from "@mui/joy";
import type { OrderRow, VehiclesController } from "../hooks/useVehiclesTable";

type VehiclesViewProps = {
  controller: VehiclesController;
  // si quieres controlar estilos del sheet desde el contenedor:
  sx?: SheetProps["sx"];
};

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", size: "sm", color: "neutral" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 160 }}>
        <MenuItem>Ver detalles</MenuItem>
        <MenuItem>Editar</MenuItem>
        <Divider />
        <MenuItem color="danger">Eliminar</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function VehiclesView({ controller, sx }: VehiclesViewProps) {
  const {
    uniqueCustomers,
    pageRows,
    totalPages,
    isAllSelected,
    // allVisibleIds,

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
    // setSelected,
    setPage,
    setRowsPerPage,

    toggleSelectAllVisible,
    toggleSelectRow,
    resetFilters,
    chipForStatus,
  } = controller;

  const FiltersPanel = (
    <>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          value={statusFilter ?? "all"}
          onChange={(_, value) =>
            setStatusFilter(value === "all" ? null : value)
          }
        >
          <Option value="all">All</Option>
          <Option value="Paid">Paid</Option>
          <Option value="Refunded">Refunded</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          value={categoryFilter ?? "all"}
          onChange={(_, value) =>
            setCategoryFilter(value === "all" ? null : value)
          }
        >
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          value={customerFilter ?? "all"}
          onChange={(_, value) =>
            setCustomerFilter(value === "all" ? null : value)
          }
        >
          <Option value="all">All</Option>
          {uniqueCustomers.map((name) => (
            <Option key={name} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );

  return (
    <Sheet
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        ...sx,
      }}
    >
      {/* Mobile search + filters */}
      <Sheet
        sx={{
          display: { xs: "flex", sm: "none" },
          gap: 1,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          placeholder="Buscar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar pedidos"
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpenFiltersModal(true)}
          aria-label="Abrir filtros"
        >
          <FilterAltIcon />
        </IconButton>

        <Modal
          open={openFiltersModal}
          onClose={() => setOpenFiltersModal(false)}
        >
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filtros
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {FiltersPanel}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button color="neutral" variant="plain" onClick={resetFilters}>
                  Reset
                </Button>
                <Button
                  color="primary"
                  onClick={() => setOpenFiltersModal(false)}
                >
                  Apply
                </Button>
              </Box>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* Desktop search + filters */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          gap: 1,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar pedidos</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar por ID, cliente, email..."
            startDecorator={<SearchIcon />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar pedidos"
          />
        </FormControl>

        {FiltersPanel}
      </Box>

      {/* Table (desktop / tablet) */}
      <Sheet
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "block" },
          width: "100%",
          overflow: "auto",
          borderRadius: "sm",
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="orders-table"
          sx={{
            "--TableCell-paddingY": "6px",
            "--TableCell-paddingX": "10px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  checked={isAllSelected}
                  indeterminate={selected.length > 0 && !isAllSelected}
                  onChange={(e) => toggleSelectAllVisible(e.target.checked)}
                  sx={{ verticalAlign: "text-bottom" }}
                  aria-label="Seleccionar visible"
                />
              </th>

              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  component="button"
                  onClick={() =>
                    setOrder((o) => (o === "asc" ? "desc" : "asc"))
                  }
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                  ]}
                >
                  Invoice
                </Link>
              </th>

              <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>

          <tbody>
            {pageRows.map((row: OrderRow) => {
              const chip = chipForStatus(row.status);
              return (
                <tr key={row.id}>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row.id)}
                      onChange={(e) =>
                        toggleSelectRow(row.id, e.target.checked)
                      }
                      aria-label={`Seleccionar ${row.id}`}
                    />
                  </td>

                  <td>
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.date}</Typography>
                  </td>

                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={chip.icon}
                      color={chip.color}
                    >
                      {row.status}
                    </Chip>
                  </td>

                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Avatar size="sm" aria-hidden>
                        {row.customer.initial}
                      </Avatar>
                      <div>
                        <Typography level="body-xs">
                          {row.customer.name}
                        </Typography>
                        <Typography level="body-xs">
                          {row.customer.email}
                        </Typography>
                      </div>
                    </Box>
                  </td>

                  <td>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link level="body-xs" component="button">
                        Download
                      </Link>
                      <RowMenu />
                    </Box>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Sheet>

      {/* List (mobile) */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {pageRows.map((item) => {
          const chip = chipForStatus(item.status);
          return (
            <List key={item.id} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <ListItemContent
                  sx={{ display: "flex", gap: 2, alignItems: "start" }}
                >
                  <ListItemDecorator>
                    <Avatar size="sm" aria-hidden>
                      {item.customer.initial}
                    </Avatar>
                  </ListItemDecorator>

                  <div>
                    <Typography gutterBottom sx={{ fontWeight: 600 }}>
                      {item.customer.name}
                    </Typography>
                    <Typography level="body-xs" gutterBottom>
                      {item.customer.email}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography level="body-xs">{item.date}</Typography>
                      <Typography level="body-xs">&bull;</Typography>
                      <Typography level="body-xs">{item.id}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Link level="body-sm" component="button">
                        Descargar
                      </Link>
                      <RowMenu />
                    </Box>
                  </div>
                </ListItemContent>

                <Chip
                  variant="soft"
                  size="sm"
                  startDecorator={chip.icon}
                  color={chip.color}
                >
                  {item.status}
                </Chip>
              </ListItem>

              <ListDivider />
            </List>
          );
        })}
      </Box>

      {/* Pagination & controls (shared) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          pt: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          flexWrap: "wrap",
        }}
      >
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          aria-label="Página anterior"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <Typography level="body-sm" sx={{ minWidth: 120, textAlign: "center" }}>
          Página {page} de {totalPages}
        </Typography>

        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          aria-label="Página siguiente"
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        <Box sx={{ flex: 1 }} />

        <FormControl size="sm" sx={{ minWidth: 120 }}>
          <FormLabel>Filas</FormLabel>
          <Select
            size="sm"
            value={String(rowsPerPage)}
            onChange={(_, value) => {
              if (!value) return;
              setRowsPerPage(Number(value));
              setPage(1);
            }}
            aria-label="Filas por página"
          >
            <Option value="4">4</Option>
            <Option value="6">6</Option>
            <Option value="10">10</Option>
            <Option value="20">20</Option>
          </Select>
        </FormControl>
      </Box>
    </Sheet>
  );
}
