"use client";

import { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Box,
} from "@mui/joy";
import DownloadIcon from "@mui/icons-material/Download";
import { type FirecrawlResponse } from "../lib/parser";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";

interface Props {
  onDataImported: (data: FirecrawlResponse | null) => void;
}

export default function ImportButton({ onDataImported }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const validateCopartLotUrl = (input: string): boolean => {
    try {
      const parsed = new URL(input);

      if (parsed.protocol !== "https:") return false;

      const hostnameValid =
        parsed.hostname === "www.copart.com" ||
        parsed.hostname === "copart.com";

      if (!hostnameValid) return false;

      const lotRegex = /^\/lot\/\d+\/?/;
      return lotRegex.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  const handleImport = async () => {
    setError(null);

    if (!validateCopartLotUrl(url)) {
      setError("Ingresa una URL válida de detalle de vehículo de Copart");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_FIRECRAWL}`, // luego lo pasas a env
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          onlyMainContent: false,
          maxAge: 172800000,
          formats: [
            {
              type: "json",
              schema: {
                type: "object",
                properties: {
                  copart_vehicle_details: {
                    type: "object",
                    properties: {
                      year_make_model: { type: "string" },
                      run_and_drive: { type: "string" },
                      vin: { type: "string" },
                      lot_number: { type: "string" },
                      lane_item: { type: "string" },
                      sale_name: { type: "string" },
                      location: { type: "string" },
                      engine_starts: { type: "string" },
                      transmission_engages: { type: "string" },
                      title_code: { type: "string" },
                      odometer: { type: "string" },
                      odometer_status: { type: "string" },
                      primary_damage: { type: "string" },
                      cylinders: { type: "string" },
                      color: { type: "string" },
                      has_key: { type: "string" },
                      engine_type: { type: "string" },
                      transmission: { type: "string" },
                      vehicle_type: { type: "string" },
                      drivetrain: { type: "string" },
                      fuel: { type: "string" },
                      body_style: { type: "string" },
                      sale_date: { type: "string" },
                      highlights: { type: "string" },
                      notes: { type: "string" },
                      current_bid: { type: "string" },
                      auction_countdown: { type: "string" },
                      minimum_bid: { type: "string" },
                      max_bid: { type: "string" },
                      bidding_increment: { type: "string" },
                      high_resolution_image_urls: {
                        type: "array",
                        maxItems: 1,
                        items: { type: "string", format: "url" },
                      },
                      video_urls: {
                        type: "array",
                        items: { type: "string", format: "url" },
                      },
                    },
                    required: [
                      "year_make_model",
                      "vin",
                      "odometer",
                      "primary_damage",
                    ],
                  },
                },
                required: ["copart_vehicle_details"],
              },
            },
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(errText);
        throw new Error("Error en scraping: " + errText);
      }

      const data = await res.json();
      console.log("Data scrapeada:", data);

      onDataImported(data);
    } catch (e) {
      console.error(e);
      setError("Ocurrió un error al importar el vehículo.");
      setOpenErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        borderRadius: "md",
        p: 3,
      }}
    >
      <Stack spacing={2}>
        <Typography level="title-lg">Importar vehículo desde Copart</Typography>

        <Box>
          <Typography level="body-sm" sx={{ mb: 0.5 }}>
            URL del vehículo
          </Typography>
          <Input
            fullWidth
            placeholder="https://www.copart.com/lot/73687685/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{
              borderColor: error ? "danger.outlinedColor" : undefined,
            }}
          />
          <Typography level="body-xs" sx={{ mt: 0.5, color: "text.tertiary" }}>
            {error
              ? "Solo se permiten URLs específicas de detalle (/lot/ID)"
              : "Solo se permiten URLs específicas de detalle (/lot/ID)"}
          </Typography>
        </Box>

        {error && (
          <Alert variant="soft" color="danger">
            {error}
          </Alert>
        )}

        <Button
          variant="solid"
          size="lg"
          startDecorator={
            loading ? <CircularProgress size="sm" /> : <DownloadIcon />
          }
          disabled={loading}
          onClick={handleImport}
        >
          {loading ? "Importando..." : "Importar vehículo"}
        </Button>
      </Stack>
      <Modal open={openErrorModal} onClose={() => setOpenErrorModal(false)}>
        <ModalDialog>
          <ModalClose />
          <Typography level="title-md" sx={{ mb: 1 }}>
            Error al importar
          </Typography>
          <Typography level="body-sm" sx={{ mb: 2 }}>
            {error ?? "No se pudo obtener los datos del vehículo desde Copart."}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setOpenErrorModal(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setOpenErrorModal(false);
                onDataImported(null);
              }}
            >
              Continuar de manera manual
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </Card>
  );
}
