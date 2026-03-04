import {
  Box,
  Button,
  Card,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Modal,
  ModalDialog,
  Sheet,
  Stack,
  Table,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router";
import type { QuoteData, CopartVehicleDetails } from "../../types/vehicle.types";
import { supabase } from "../../lib/supabaseClient";

type VehicleItem = {
  lotId: string;
  title: string;
  status: string;
  copartDetails?: CopartVehicleDetails;
};

type ClientItem = {
  id: string;
  name: string;
};

type QuoteRow = {
  id: string;
  code: string;
  vehicle: VehicleItem;
  client?: ClientItem | null;
  createdAt: string;
  totals: {
    usd: number;
    paralelo: number;
    oficial: number;
  };
  data: QuoteData;
};

function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRow | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("quotes")
        .select(`
          *,
          vehicles (
            lot_id,
            year,
            make,
            model,
            status,
            copart_details
          ),
          contacts (
            id,
            full_name
          )
        `)
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted: QuoteRow[] = data.map((q: any) => ({
          id: q.id,
          code: q.code || q.id.substring(0, 8),
          vehicle: {
            lotId: q.vehicles?.lot_id || "S/N",
            title: `${q.vehicles?.year || ""} ${q.vehicles?.make || ""} ${q.vehicles?.model || ""}`.trim() || "Vehículo sin nombre",
            status: q.vehicles?.status || "Desconocido",
            copartDetails: q.vehicles?.copart_details || {},
          },
          client: q.contacts ? { id: q.contacts.id, name: q.contacts.full_name } : null,
          createdAt: new Date(q.created_at).toLocaleDateString(),
          totals: {
            usd: q.total_usd,
            paralelo: q.total_paralelo || 0,
            oficial: q.total_oficial || 0,
          },
          data: {
            remate: q.remate,
            grua: q.grua,
            transporte: q.transporte,
            fob: q.fob,
            fees: q.fees,
            transferUSA: q.transfer_usa,
            comision: q.comision,
            documentacion: q.documentacion,
            poliza: q.poliza,
            totalUSD: q.total_usd,
            tasaParalelo: q.tasa_paralelo || 0,
            tasaOficial: q.tasa_oficial || 0,
            totalParalelo: q.total_paralelo || 0,
            totalOficial: q.total_oficial || 0,
          },
        }));
        setQuotes(formatted);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredQuotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return quotes;
    return quotes.filter((row) =>
      [
        row.code,
        row.vehicle.lotId,
        row.vehicle.title,
        row.client?.name ?? "",
      ].some((value) => value.toLowerCase().includes(q)),
    );
  }, [quotes, query]);

  const exportImage = async (row: QuoteRow) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header bar
    ctx.fillStyle = "#0b6bcb"; // MUI primary color
    ctx.fillRect(0, 0, canvas.width, 100);

    // Header Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Arial";
    ctx.fillText("EL IMPORTADOR DE VEHÍCULOS", 40, 65);

    ctx.font = "24px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`Cotización: ${row.code}`, canvas.width - 40, 65);
    ctx.textAlign = "left";

    let currentY = 150;

    // Load Car Image
    const carImageUrl = row.vehicle.copartDetails?.high_resolution_image_urls?.[0];
    if (carImageUrl) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = carImageUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        // Draw image (main aspect ratio is usually 4:3 or similar)
        const imgWidth = 500;
        const imgHeight = (img.height / img.width) * imgWidth;
        ctx.drawImage(img, 40, currentY, imgWidth, imgHeight);

        // Vehicle details next to image
        ctx.fillStyle = "#111111";
        ctx.font = "bold 28px Arial";
        ctx.fillText(row.vehicle.title, 570, currentY + 30);

        ctx.font = "20px Arial";
        ctx.fillStyle = "#555555";
        ctx.fillText(`Lote: ${row.vehicle.lotId}`, 570, currentY + 70);
        ctx.fillText(`Estado: ${row.vehicle.status}`, 570, currentY + 105);
        ctx.fillText(`Fecha: ${row.createdAt}`, 570, currentY + 140);
        ctx.fillText(`Cliente: ${row.client?.name ?? "-"}`, 570, currentY + 175);

        currentY += Math.max(imgHeight, 200) + 50;
      } catch (e) {
        console.error("Error loading image for canvas:", e);
        // Fallback if image fails
        ctx.fillStyle = "#111111";
        ctx.font = "bold 28px Arial";
        ctx.fillText(row.vehicle.title, 40, currentY);
        currentY += 40;
      }
    } else {
      ctx.fillStyle = "#111111";
      ctx.font = "bold 28px Arial";
      ctx.fillText(row.vehicle.title, 40, currentY);
      currentY += 40;
    }

    // Costs Table/Section
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.shadowBlur = 10;
    ctx.fillRect(40, currentY, canvas.width - 80, 450);
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#0b6bcb";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Detalle de Costos (USD)", 60, currentY + 40);

    const costItems = [
      { label: "Valor de Remate", value: row.data.remate },
      { label: "Fees Copart/IAAI", value: row.data.fees },
      { label: "Transfer USA", value: row.data.transferUSA },
      { label: "Servicio de Grúa", value: row.data.grua },
      { label: "Transporte Marítimo", value: row.data.transporte },
      { label: "Comisión de Importación", value: row.data.comision },
      { label: "Documentación y Aduana", value: row.data.documentacion },
      { label: "Póliza de Seguro", value: row.data.poliza },
    ];

    ctx.font = "20px Arial";
    ctx.fillStyle = "#333333";
    let costY = currentY + 90;
    costItems.forEach((item) => {
      ctx.fillText(item.label, 80, costY);
      ctx.textAlign = "right";
      ctx.fillText(`$${item.value.toFixed(2)}`, canvas.width - 80, costY);
      ctx.textAlign = "left";

      // Dash line
      ctx.strokeStyle = "#eeeeee";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(80, costY + 10);
      ctx.lineTo(canvas.width - 80, costY + 10);
      ctx.stroke();
      ctx.setLineDash([]);

      costY += 40;
    });

    // Totals
    ctx.fillStyle = "#f0f7ff";
    ctx.fillRect(40, costY + 10, canvas.width - 80, 150);

    ctx.fillStyle = "#0b6bcb";
    ctx.font = "bold 32px Arial";
    ctx.fillText("TOTAL ESTIMADO:", 80, costY + 70);
    ctx.textAlign = "right";
    ctx.fillText(`$${row.totals.usd.toFixed(2)}`, canvas.width - 80, costY + 70);
    ctx.textAlign = "left";

    ctx.font = "22px Arial";
    ctx.fillStyle = "#555555";
    ctx.fillText(`Tasa Paralela: ${row.totals.paralelo.toFixed(2)} BOB`, 80, costY + 110);
    ctx.textAlign = "right";
    ctx.fillText(`Tasa Oficial: ${row.totals.oficial.toFixed(2)} BOB`, canvas.width - 80, costY + 110);
    ctx.textAlign = "left";

    // Footer
    ctx.fillStyle = "#777777";
    ctx.font = "italic 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Esta cotización es una estimación sujeta a cambios según variaciones en subasta y logística.", canvas.width / 2, canvas.height - 40);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `cotizacion-${row.code}.png`;
    a.click();
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
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
          Cotizaciones
        </Typography>
        <Button
          color="primary"
          size="sm"
          component={RouterLink}
          to="/dashboard/quotes/create"
        >
          Nueva cotización
        </Button>
      </Box>

      <Card variant="outlined" sx={{ p: 2 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Input
            size="sm"
            placeholder="Buscar por código, lote, cliente o título..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>

        <Sheet variant="outlined" sx={{ borderRadius: "sm", overflow: "auto" }}>
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
                <th style={{ width: 96 }}>Cotización</th>
                <th style={{ width: 160 }}>Vehículo</th>
                <th style={{ width: 160 }}>Cliente / Total</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((row) => (
                  <tr key={row.id}>
                    {/* Cotización */}
                    <td>
                      <Box>
                        <Typography level="body-sm" fontWeight="lg">
                          {row.code}
                        </Typography>
                        <Typography
                          level="body-xs"
                          sx={{ color: "text.tertiary" }}
                        >
                          {row.createdAt}
                        </Typography>
                      </Box>
                    </td>

                    {/* Vehículo */}
                    <td>
                      <Box>
                        <Typography level="body-sm" fontWeight="md">
                          {row.vehicle.title}
                        </Typography>
                        <Typography
                          level="body-xs"
                          sx={{ color: "text.tertiary" }}
                        >
                          {row.vehicle.lotId} · {row.vehicle.status}
                        </Typography>
                      </Box>
                    </td>

                    {/* Cliente + Total */}
                    <td>
                      <Box>
                        <Typography level="body-sm">
                          {row.client ? row.client.name : "Sin asignar"}
                        </Typography>
                        <Typography level="body-sm" fontWeight="lg">
                          {formatCurrency(row.totals.usd)}
                        </Typography>
                      </Box>
                    </td>

                    {/* Acciones */}
                    <td>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                          size="sm"
                          variant="plain"
                          onClick={() => setSelectedQuote(row)}
                        >
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="outlined"
                          onClick={() => exportImage(row)}
                        >
                          Exportar
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                    <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                      No se encontraron cotizaciones.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Sheet>
      </Card>

      <Modal
        open={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        disablePortal
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalDialog size="lg" sx={{ maxWidth: 720 }}>
          {selectedQuote && (
            <>
              <DialogTitle>Cotización {selectedQuote.code}</DialogTitle>

              <DialogContent>
                <Stack spacing={1}>
                  <Typography level="body-sm">
                    <strong>Fecha:</strong> {selectedQuote.createdAt}
                  </Typography>

                  <Typography level="body-sm">
                    <strong>Cliente:</strong>{" "}
                    {selectedQuote.client?.name ?? "-"}
                  </Typography>

                  <Typography level="body-sm">
                    <strong>Vehículo:</strong> {selectedQuote.vehicle.lotId} -{" "}
                    {selectedQuote.vehicle.title} (
                    {selectedQuote.vehicle.status})
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={0.5}>
                  <Typography level="body-sm">
                    Remate: {formatCurrency(selectedQuote.data.remate)}
                  </Typography>
                  <Typography level="body-sm">
                    Fees: {formatCurrency(selectedQuote.data.fees)}
                  </Typography>
                  <Typography level="body-sm">
                    Transfer USA:{" "}
                    {formatCurrency(selectedQuote.data.transferUSA)}
                  </Typography>
                  <Typography level="body-sm">
                    Grúa: {formatCurrency(selectedQuote.data.grua)}
                  </Typography>
                  <Typography level="body-sm">
                    Transporte: {formatCurrency(selectedQuote.data.transporte)}
                  </Typography>
                  <Typography level="body-sm">
                    Comisión: {formatCurrency(selectedQuote.data.comision)}
                  </Typography>
                  <Typography level="body-sm">
                    Documentación:{" "}
                    {formatCurrency(selectedQuote.data.documentacion)}
                  </Typography>
                  <Typography level="body-sm">
                    Póliza: {formatCurrency(selectedQuote.data.poliza)}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                  <Typography level="title-md">
                    Total USD: {formatCurrency(selectedQuote.totals.usd)}
                  </Typography>

                  <Typography level="body-sm">
                    Total paralelo (BOB):{" "}
                    {selectedQuote.totals.paralelo.toFixed(2)}
                  </Typography>

                  <Typography level="body-sm">
                    Total oficial (BOB):{" "}
                    {selectedQuote.totals.oficial.toFixed(2)}
                  </Typography>
                </Stack>
              </DialogContent>
            </>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}

export default QuotesPage;

