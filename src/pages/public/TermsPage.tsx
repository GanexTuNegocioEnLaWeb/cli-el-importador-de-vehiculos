import { Box, Container, Stack, Typography } from "@mui/material";

function TermsPage() {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        maxWidth="md"
        sx={{
          pt: { xs: 12, sm: 16 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h3" textAlign="center" fontWeight="bold">
            Términos y Condiciones
          </Typography>

          <Typography color="text.secondary">
            Última actualización: [Fecha]
          </Typography>

          <Typography>
            Bienvenido a [Nombre de la Empresa]. Al utilizar nuestros servicios
            de importación de vehículos desde Estados Unidos hacia Bolivia,
            usted acepta los siguientes términos y condiciones.
          </Typography>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              1. Descripción del Servicio
            </Typography>
            <Typography>
              La empresa actúa como intermediario en la compra de vehículos a
              través de subastas en Estados Unidos (incluyendo plataformas como
              Copart), así como en la gestión logística, transporte marítimo,
              trámites aduaneros y entrega en territorio boliviano.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              2. Responsabilidad del Cliente
            </Typography>
            <Typography>
              El cliente es responsable de:
              <br />- Verificar el estado del vehículo antes de realizar la
              compra.
              <br />- Aceptar los riesgos inherentes a vehículos adquiridos en
              subasta.
              <br />- Proporcionar información correcta y documentación
              requerida.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              3. Pagos y Tarifas
            </Typography>
            <Typography>
              Todos los servicios están sujetos a tarifas previamente acordadas.
              Los costos pueden incluir: valor del vehículo, comisión por
              gestión, transporte interno en EE.UU., flete marítimo, impuestos,
              aranceles aduaneros y gastos administrativos en Bolivia.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              4. Tiempos de Entrega
            </Typography>
            <Typography>
              Los tiempos estimados de importación pueden variar dependiendo del
              puerto de salida, condiciones marítimas, procesos aduaneros y
              regulaciones vigentes en Bolivia. La empresa no se hace
              responsable por retrasos fuera de su control.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              5. Estado del Vehículo
            </Typography>
            <Typography>
              Muchos vehículos adquiridos en subastas pueden presentar daños
              mecánicos o estructurales. La empresa no garantiza el estado
              físico o mecánico del vehículo, actuando únicamente como gestor
              del proceso de compra e importación.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              6. Legislación Aplicable
            </Typography>
            <Typography>
              Estos términos se rigen por las leyes vigentes del Estado
              Plurinacional de Bolivia.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              7. Aceptación
            </Typography>
            <Typography>
              Al contratar nuestros servicios, el cliente declara haber leído,
              entendido y aceptado estos términos y condiciones.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default TermsPage;
