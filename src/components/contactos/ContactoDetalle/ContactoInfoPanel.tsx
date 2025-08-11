import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import type { Contacto } from "../../../mock/contactosMock";
import type { Empresa } from "../../../mock/empresasMock";
import type { Industria } from "../../../mock/industriasMock";
import type { Zona } from "../../../mock/zonasMock";
import type { estatusContacto } from "../../../mock/estatusContactosMock";

interface ContactoInfoPanelProps {
  contacto: Contacto;
  empresa?: Empresa;
  industria?: Industria | null;
  zona?: Zona | null;
  estatus?: estatusContacto | null;
}

const ContactoInfoPanel: React.FC<ContactoInfoPanelProps> = ({
  contacto,
  empresa,
  industria,
  zona,
  estatus,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Información del contacto
        </Typography>
        <Stack spacing={1.5}>
          <Row label="Posición / Cargo:" value={contacto.posicion} />
          <Row label="Teléfono:" value={contacto.telefono} />
          <Row label="Correo electrónico:" value={contacto.correo} />
          {/* Empresa como enlace clickable */}
          <Box display="flex" gap={1} alignItems="center">
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ minWidth: 132, flexShrink: 0 }}
            >
              Empresa:
            </Typography>
            {empresa ? (
              <Tooltip title="Ver detalle de la empresa" arrow>
                <Link
                  component={RouterLink}
                  to={`/empresas/${empresa.id}`}
                  color="primary"
                  underline="hover"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {empresa.nombre}
                </Link>
              </Tooltip>
            ) : (
              <Typography variant="body2">—</Typography>
            )}
          </Box>
          <Row label="Industria:" value={industria?.nombre || "—"} />
          <Row label="Zona:" value={zona?.nombre || "—"} />
          <Row label="Estatus:" value={estatus?.nombre || "—"} />
          <Row label="Fecha de creación:" value={contacto.fecha_creacion} />
          <Box>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ mb: 0.5, display: "block" }}
            >
              Notas adicionales:
            </Typography>
            <Box
              sx={{
                bgcolor: "#d1caca3a",
                borderRadius: 2,
                minHeight: 60,
                p: 2,
                mt: 0.2,
              }}
            >
              <Typography
                variant="body2"
                color={contacto.notas ? "text.primary" : "text.disabled"}
                sx={{ whiteSpace: "pre-line" }}
              >
                {contacto.notas || "—"}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Row = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <Box display="flex" gap={1} alignItems="center">
    <Typography
      variant="body2"
      fontWeight="bold"
      sx={{ minWidth: 132, flexShrink: 0 }}
    >
      {label}
    </Typography>
    <Typography variant="body2">{value || "—"}</Typography>
  </Box>
);

export default ContactoInfoPanel;
