"use client";

import { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Grid, Typography } from "@mui/joy";
import type { VehicleData, CopartVehicleDetails } from "../types/vehicle.types";

interface Props {
  value: VehicleData;
  onChange?: (data: VehicleData) => void;
}

export default function VehicleImportForm({ value, onChange }: Props) {
  const [formData, setFormData] = useState<VehicleData>(value);

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleChange = (field: keyof VehicleData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value as unknown as VehicleData[typeof field],
    }));
  };

  const handleDetailsChange = (field: keyof CopartVehicleDetails, value: string) => {
    setFormData((prev) => ({
      ...prev,
      copartDetails: {
        ...(prev.copartDetails ?? {}),
        [field]: value,
      },
    }));
  };

  const generalFields: Array<{
    key: keyof VehicleData;
    label: string;
    type?: string;
  }> = [
    { key: "lotId", label: "ID de Lote" },
    { key: "year", label: "Año", type: "number" },
    { key: "make", label: "Marca" },
    { key: "model", label: "Modelo" },
    { key: "trim", label: "Versión" },
    { key: "condition", label: "Condición" },
    { key: "auctionDate", label: "Fecha de Subasta" },
    { key: "location", label: "Ubicación" },
    { key: "titleType", label: "Tipo de Título" },
  ];

  const details = formData.copartDetails ?? {};

  const copartFields: Array<{ key: keyof CopartVehicleDetails; label: string }> = [
    { key: "vin", label: "VIN" },
    { key: "run_and_drive", label: "Run & Drive" },
    { key: "lane_item", label: "Lane/Item" },
    { key: "sale_name", label: "Nombre de Subasta" },
    { key: "engine_starts", label: "Motor" },
    { key: "transmission_engages", label: "Transmisión" },
    { key: "odometer", label: "Odómetro" },
    { key: "odometer_status", label: "Estado Odómetro" },
    { key: "primary_damage", label: "Daño Principal" },
    { key: "cylinders", label: "Cilindros" },
    { key: "color", label: "Color" },
    { key: "has_key", label: "Llave" },
    { key: "engine_type", label: "Tipo de Motor" },
    { key: "transmission", label: "Transmisión" },
    { key: "vehicle_type", label: "Tipo de Vehículo" },
    { key: "drivetrain", label: "Tracción" },
    { key: "fuel", label: "Combustible" },
    { key: "body_style", label: "Carrocería" },
    { key: "highlights", label: "Highlights" },
    { key: "notes", label: "Notas" },
    { key: "current_bid", label: "Oferta Actual" },
    { key: "auction_countdown", label: "Cuenta Regresiva" },
    { key: "minimum_bid", label: "Oferta Mínima" },
    { key: "max_bid", label: "Oferta Máxima" },
    { key: "bidding_increment", label: "Incremento" },
  ];

  return (
    <Box>
      <Typography level="title-md" sx={{ mb: 2 }}>
        Datos generales
      </Typography>
      <Grid container spacing={2}>
        {generalFields.map(({ key, label, type = "text" }) => (
          <Grid key={key} xs={12} sm={6}>
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <Input
                type={type}
                value={
                  type === "number"
                    ? Number((formData[key] as number | string | undefined) ?? 0)
                    : String((formData[key] as string | number | undefined) ?? "")
                }
                onChange={(e) =>
                  handleChange(
                    key,
                    type === "number" ? parseInt(e.target.value) || 0 : e.target.value,
                  )
                }
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>

      <Typography level="title-md" sx={{ mt: 3, mb: 2 }}>
        Datos de Copart
      </Typography>
      <Grid container spacing={2}>
        {copartFields.map(({ key, label }) => (
          <Grid key={key as string} xs={12} sm={6}>
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <Input
                value={(details[key] as string) ?? ""}
                onChange={(e) => handleDetailsChange(key, e.target.value)}
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>

      {(details.high_resolution_image_urls?.[0] || details.video_urls?.[0]) && (
        <Box sx={{ mt: 3 }}>
          <Typography level="title-md" sx={{ mb: 2 }}>
            Multimedia
          </Typography>
          {details.high_resolution_image_urls?.[0] && (
            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Imagen principal
              </Typography>
              <Box
                component="img"
                src={details.high_resolution_image_urls[0]}
                alt="Imagen del vehículo"
                sx={{
                  maxWidth: "100%",
                  borderRadius: "md",
                  border: "1px solid",
                  borderColor: "neutral.outlinedBorder",
                }}
              />
              <FormControl sx={{ mt: 1 }}>
                <FormLabel>URL de la imagen</FormLabel>
                <Input
                  value={details.high_resolution_image_urls[0]}
                  readOnly
                />
              </FormControl>
            </Box>
          )}

          {details.video_urls?.[0] && (
            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Video principal
              </Typography>
              <FormControl>
                <FormLabel>URL del video</FormLabel>
                <Input value={details.video_urls[0]} readOnly />
              </FormControl>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
