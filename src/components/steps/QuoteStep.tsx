import {
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Card,
} from "@mui/joy";
import { useMemo, useState } from "react";
import type { QuoteData } from "../../types/vehicle.types";

interface QuoteStepProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: QuoteData) => void;
  initialData?: QuoteData | null;
}

const DEFAULT_DOCUMENTACION = 700;
const DEFAULT_COMISION = 500;
const DEFAULT_FACTURA_TALLER = 100;
const DEFAULT_TASA_OFICIAL = 6.97;
const DEFAULT_FEES_PERCENT = 13;
const DEFAULT_TRANSFER_PERCENT = 4;

// Single Responsibility: Handle vehicle quote/pricing
export function QuoteStep({
  onNext,
  onBack,
  onSave,
  initialData,
}: QuoteStepProps) {
  const [remate, setRemate] = useState<number>(initialData?.remate ?? 0);
  const [grua, setGrua] = useState<number>(initialData?.grua ?? 0);
  const [transporte, setTransporte] = useState<number>(
    initialData?.transporte ?? 0,
  );
  const [fob, setFob] = useState<number>(initialData?.fob ?? 0);
  const [comision, setComision] = useState<number>(
    initialData?.comision ?? DEFAULT_COMISION,
  );
  const [documentacion, setDocumentacion] = useState<number>(
    initialData?.documentacion ?? DEFAULT_DOCUMENTACION,
  );
  const [facturaTaller, setFacturaTaller] = useState<number>(
    DEFAULT_FACTURA_TALLER,
  );
  const [tasaParalelo, setTasaParalelo] = useState<number>(
    initialData?.tasaParalelo ?? 0,
  );
  const [tasaOficial, setTasaOficial] = useState<number>(
    initialData?.tasaOficial ?? DEFAULT_TASA_OFICIAL,
  );
  const [feesPercent, setFeesPercent] = useState<number>(() => {
    if (initialData && initialData.remate > 0) {
      return (initialData.fees / initialData.remate) * 100;
    }
    return DEFAULT_FEES_PERCENT;
  });
  const [transferPercent, setTransferPercent] = useState<number>(() => {
    if (initialData) {
      const base = initialData.remate + initialData.fees;
      if (base > 0) {
        return (initialData.transferUSA / base) * 100;
      }
    }
    return DEFAULT_TRANSFER_PERCENT;
  });

  const fees = useMemo(
    () => (remate > 0 ? (remate * feesPercent) / 100 : 0),
    [remate, feesPercent],
  );

  const transferUSA = useMemo(() => {
    const base = remate + fees;
    return base > 0 ? (base * transferPercent) / 100 : 0;
  }, [remate, fees, transferPercent]);

  const cif = useMemo(() => {
    const fobDep = fob * 0.8;
    const seguro = fobDep * 0.02;
    const flete = 900;
    const gtoPto = 35;
    const gtoTaller = 200;
    const utilidad = 20;
    return fobDep + seguro + flete + gtoPto + gtoTaller + utilidad;
  }, [fob]);

  const impuestos = useMemo(() => {
    const ga = cif * 0.1;
    const iva = (cif + ga) * 0.1494;
    const ice = (cif + ga) * 0.15;
    return { ga, iva, ice, total: ga + iva + ice };
  }, [cif]);

  const poliza = useMemo(() => {
    const agencia = 150;
    const gasSao = 70;
    const facturaVenta = 300;
    const almacenaje = 160;
    return (
      impuestos.total +
      facturaTaller +
      agencia +
      gasSao +
      facturaVenta +
      almacenaje
    );
  }, [impuestos.total, facturaTaller]);

  const totalUSD =
    remate +
    fees +
    transferUSA +
    grua +
    transporte +
    comision +
    documentacion +
    poliza;
  const totalParalelo = tasaParalelo > 0 ? totalUSD * tasaParalelo : 0;
  const totalOficial = tasaOficial > 0 ? totalUSD * tasaOficial : 0;

  const totalPromedio =
    tasaParalelo > 0 && tasaOficial > 0
      ? (totalParalelo + totalOficial) / 2
      : tasaParalelo > 0
        ? totalParalelo
        : totalOficial;

  const handleSave = () => {
    const data: QuoteData = {
      remate,
      grua,
      transporte,
      fob,
      fees,
      transferUSA,
      comision,
      documentacion,
      poliza,
      totalUSD,
      tasaParalelo,
      tasaOficial,
      totalParalelo,
      totalOficial,
    };
    onSave(data);
  };

  const handleNext = () => {
    handleSave();
    onNext();
  };

  const handleBackClick = () => {
    handleSave();
    onBack();
  };

  const numberInput = (
    label: string,
    value: number,
    setValue: (v: number) => void,
  ) => (
    <Grid xs={12} sm={6}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => setValue(parseFloat(e.target.value || "0"))}
        />
      </FormControl>
    </Grid>
  );

  const percentageInput = (
    label: string,
    value: number,
    setValue: (v: number) => void,
  ) => (
    <Grid xs={12} sm={6}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => setValue(parseFloat(e.target.value || "0"))}
        />
      </FormControl>
    </Grid>
  );

  return (
    <Box>
      <Typography level="h3" sx={{ mb: 3 }}>
        Cotización del Vehículo
      </Typography>

      <Grid container spacing={2}>
        {numberInput("Precio de remate (USD)", remate, setRemate)}
        {numberInput("Precio de la grúa (USD)", grua, setGrua)}
        {numberInput("Transporte (USD)", transporte, setTransporte)}
        {numberInput("Valor FOB (USD)", fob, setFob)}
        {numberInput(
          "Tasa dólar paralelo (BOB/USD)",
          tasaParalelo,
          setTasaParalelo,
        )}
      </Grid>

      <Typography level="title-md" sx={{ mt: 3, mb: 2 }}>
        Valores por defecto y parámetros
      </Typography>

      <Grid container spacing={2}>
        {percentageInput(
          "Porcentaje de fees (% sobre remate)",
          feesPercent,
          setFeesPercent,
        )}
        <Grid xs={12} sm={6}>
          <FormControl>
            <FormLabel>Fees calculados (USD)</FormLabel>
            <Input type="number" value={fees.toFixed(2)} readOnly />
          </FormControl>
        </Grid>

        {percentageInput(
          "Porcentaje transferencia USA (% sobre remate + fees)",
          transferPercent,
          setTransferPercent,
        )}
        <Grid xs={12} sm={6}>
          <FormControl>
            <FormLabel>Transferencia USA calculada (USD)</FormLabel>
            <Input type="number" value={transferUSA.toFixed(2)} readOnly />
          </FormControl>
        </Grid>

        {numberInput("Comisión al asesor (Logística)", comision, setComision)}
        {numberInput(
          "Documentación de ingreso",
          documentacion,
          setDocumentacion,
        )}
        {numberInput("Factura del taller", facturaTaller, setFacturaTaller)}
        {numberInput(
          "Tasa dólar oficial (BOB/USD)",
          tasaOficial,
          setTasaOficial,
        )}
      </Grid>

      <Button
        variant="outlined"
        size="sm"
        sx={{ mt: 2 }}
        onClick={() => {
          setComision(DEFAULT_COMISION);
          setDocumentacion(DEFAULT_DOCUMENTACION);
          setFacturaTaller(DEFAULT_FACTURA_TALLER);
          setTasaOficial(DEFAULT_TASA_OFICIAL);
          setFeesPercent(DEFAULT_FEES_PERCENT);
          setTransferPercent(DEFAULT_TRANSFER_PERCENT);
        }}
      >
        Volver a valores por defecto
      </Button>

      <Card variant="outlined" sx={{ mt: 3, p: 2 }}>
        <Typography level="title-md" sx={{ mb: 1 }}>
          Cálculos de la póliza
        </Typography>
        <Typography level="body-sm">Valor CIF: {cif.toFixed(2)} USD</Typography>
        <Typography level="body-sm">
          GA (10%): {impuestos.ga.toFixed(2)} USD
        </Typography>
        <Typography level="body-sm">
          IVA (14.94% de CIF+GA): {impuestos.iva.toFixed(2)} USD
        </Typography>
        <Typography level="body-sm">
          ICE (15% de CIF+GA): {impuestos.ice.toFixed(2)} USD
        </Typography>
        <Typography level="body-sm" sx={{ mt: 1 }}>
          Póliza: {poliza.toFixed(2)} USD
        </Typography>
      </Card>

      <Card variant="outlined" sx={{ mt: 3, p: 2 }}>
        <Typography level="title-md" sx={{ mb: 1 }}>
          Total de la cotización
        </Typography>
        <Typography level="body-sm">
          Total (USD): {totalUSD.toFixed(2)}
        </Typography>
        <Typography level="body-sm">
          Total en dólar paralelo (BOB): {totalParalelo.toFixed(2)}
        </Typography>
        <Typography level="body-sm">
          Total en dólar oficial (BOB): {totalOficial.toFixed(2)}
        </Typography>
        <Typography level="body-sm">
          Total promedio (BOB): {totalPromedio.toFixed(2)}
        </Typography>
        <Typography level="body-xs" sx={{ mt: 1, color: "text.tertiary" }}>
          Plazos de pago: remate, fees y transferencia en 2 días; demás (excepto
          póliza) en 7 días; póliza en 3/4 a 4 meses.
        </Typography>
      </Card>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleBackClick}>
          Atrás
        </Button>
        <Button onClick={handleNext}>Guardar y continuar</Button>
      </Stack>
    </Box>
  );
}
