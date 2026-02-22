"use client";

import { useState, useEffect } from "react";
import { parseVehicleData, type VehicleData } from "../lib/parser";
import { Box, FormControl, FormLabel, Input, Grid } from "@mui/joy";

interface ScrapedData {
  metadata: {
    title: string;
    sourceURL: string;
    timezone: string;
    language: string;
  };
  json: {
    company_name: string;
    company_description: string;
  };
}

interface Props {
  rawData: ScrapedData;
  onChange?: (data: VehicleData) => void;
}

export default function VehicleImportForm({ rawData, onChange }: Props) {
  const [formData, setFormData] = useState<VehicleData>(
    parseVehicleData(rawData),
  );

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleChange = (field: keyof VehicleData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fields: Array<{
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
    { key: "auctionDate", label: "Fecha de Subasta", type: "date" },
    { key: "location", label: "Ubicación" },
    { key: "titleType", label: "Tipo de Título" },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {fields.map(({ key, label, type = "text" }) => (
          <Grid key={key} xs={12} sm={6}>
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <Input
                type={type}
                value={formData[key]}
                onChange={(e) =>
                  handleChange(
                    key,
                    type === "number"
                      ? parseInt(e.target.value) || 0
                      : e.target.value,
                  )
                }
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
