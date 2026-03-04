import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import CTA from "../../components/public/sections/CTA";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "¿Cuánto tiempo tarda el proceso completo de importación?",
        answer:
          "El proceso completo toma entre 60 a 90 días desde la compra del vehículo hasta su entrega en Bolivia. Esto incluye la compra, transporte marítimo, trámites aduaneros y nacionalización.",
      },
      {
        question: "¿Qué tipos de vehículos puedo importar?",
        answer:
          "Puedes importar cualquier tipo de vehículo: sedanes, SUVs, camionetas, deportivos, clásicos, etc. Solo deben cumplir con las regulaciones bolivianas de antigüedad y emisiones.",
      },
      {
        question: "¿Cuál es el costo total de importar un vehículo?",
        answer:
          "El costo total incluye: precio del vehículo, transporte ($1,200-$2,000), aranceles e impuestos (30-40% del valor), y nuestros honorarios ($1,800-$2,500). Te damos un presupuesto detallado antes de comenzar.",
      },
    ],
  },
  {
    category: "Proceso de Compra",
    questions: [
      {
        question: "¿Cómo sé que el vehículo está en buenas condiciones?",
        answer:
          "Verificamos el historial completo con Carfax, revisamos fotos detalladas, y en algunos casos podemos coordinar inspecciones físicas. Te compartimos toda la información antes de la compra.",
      },
      {
        question: "¿Puedo elegir el vehículo específico que quiero?",
        answer:
          "Sí, trabajamos contigo para encontrar exactamente el vehículo que buscas. Puedes enviarnos links de vehículos específicos o describirnos tus preferencias para que busquemos opciones.",
      },
      {
        question: "¿Qué pasa si el vehículo tiene problemas al llegar?",
        answer:
          "Realizamos inspecciones antes del envío y el transporte está asegurado. Si hay algún problema, trabajamos con las aseguradoras para resolver la situación.",
      },
    ],
  },
  {
    category: "Costos y Pagos",
    questions: [
      {
        question: "¿Cómo se realizan los pagos?",
        answer:
          "Los pagos se realizan en etapas: anticipo para la compra, pago del transporte, y pago final para nacionalización. Aceptamos transferencias bancarias y otros métodos seguros.",
      },
      {
        question: "¿Hay costos ocultos?",
        answer:
          "No. Te proporcionamos un presupuesto detallado con todos los costos desde el inicio. Solo podrían surgir costos adicionales si solicitas servicios extra o si hay cambios en aranceles.",
      },
      {
        question: "¿Puedo financiar la importación?",
        answer:
          "Nosotros no ofrecemos financiamiento directo, pero podemos asesorarte sobre opciones de financiamiento con entidades bancarias en Bolivia.",
      },
    ],
  },
  {
    category: "Documentación y Legal",
    questions: [
      {
        question: "¿Qué documentos necesito para importar?",
        answer:
          "Necesitas tu cédula de identidad y NIT. Nosotros gestionamos todos los demás documentos: título del vehículo, bill of sale, documentos de aduana, etc.",
      },
      {
        question: "¿El vehículo queda a mi nombre?",
        answer:
          "Sí, el vehículo se registra directamente a tu nombre en Bolivia. Te entregamos todos los documentos legales y el registro vehicular.",
      },
      {
        question: "¿Puedo importar un vehículo con título salvage?",
        answer:
          "Sí, es posible importar vehículos con título salvage. Sin embargo, debes considerar que pueden requerir reparaciones y el proceso de nacionalización puede ser más complejo.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
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
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: "center",
                fontSize: "clamp(3rem, 10vw, 3.5rem)",
              }}
            >
              Preguntas Frecuentes
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              Encuentra respuestas a las preguntas más comunes sobre importación
              de vehículos
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* FAQs por categoría */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {faqs.map((category, catIndex) => (
            <Box key={catIndex}>
              <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                sx={{ mb: 3 }}
              >
                {category.category}
              </Typography>
              <Stack>
                {category.questions.map((faq, qIndex) => (
                  <Accordion key={qIndex}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" fontWeight={600}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>

      <CTA
        title="¿No encontraste tu respuesta?"
        description="Contáctanos y con gusto resolveremos todas tus dudas."
        primaryButtonText="Contactar un asesor"
        primaryButtonLink="https://wa.me/5210000000000"
        primaryButtonBlank
      />
    </>
  );
}
