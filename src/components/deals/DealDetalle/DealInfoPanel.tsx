import React from "react";
import { CardContent, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import type { Empresa } from "../../../mock/empresasMock";
import type { Contacto } from "../../../mock/contactosMock";
import SectionCard from "../../ui/SectionCard";

interface DealInfoPanelProps {
  empresa: Empresa | null;
  montoEstimado: number;
  contacto: Contacto | null;
  fechaCreacion: string;
  fechaCierreEstimada: string;
  prioridad: string;
  observaciones?: string;
  estado: string;
  etapa: string;
}

const DealInfoPanel: React.FC<DealInfoPanelProps> = ({
  empresa,
  montoEstimado,
  contacto,
  fechaCreacion,
  fechaCierreEstimada,
  prioridad,
  observaciones,
  estado,
  etapa
}) => (
  <SectionCard title="Información general" hover intro>
    <CardContent>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Empresa</Typography>
          {empresa?.id ? (
            <Tooltip title="Ver detalle de la empresa" arrow>
              <Link
              component={RouterLink}
              to={`/empresas/${empresa.id}`}
              color="primary"
              underline="hover"
              variant="subtitle1"
              sx={{ fontWeight: 500, cursor: "pointer" }}
            >
              {empresa.nombre}
            </Link>
            </Tooltip>
          ) : (
            <Typography sx={{ mb: 1 }}>—</Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Contacto</Typography>
          {contacto?.id ? (
            <Tooltip title="Ver detalle del contacto" arrow>
              <Link
              component={RouterLink}
              to={`/contactos/${contacto.id}`}
              color="primary"
              underline="hover"
              variant="subtitle1"
              sx={{ fontWeight: 500, cursor: "pointer" }}
            >
              {contacto.nombre}
            </Link>
            </Tooltip>
          ) : (
            <Typography sx={{ mb: 1 }}>—</Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Prioridad</Typography>
          <Typography sx={{ mb: 1 }}>{prioridad || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Monto estimado</Typography>
          <Typography sx={{ mb: 1 }}>
            {Number.isFinite(montoEstimado)
              ? `$${montoEstimado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`
              : "—"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Fecha de creación</Typography>
          <Typography sx={{ mb: 1 }}>{fechaCreacion || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Fecha estimada de cierre</Typography>
          <Typography sx={{ mb: 1 }}>{fechaCierreEstimada || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Estado</Typography>
          <Typography sx={{ mb: 1 }}>{estado || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">Etapa</Typography>
          <Typography sx={{ mb: 1 }}>{etapa || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold">Observaciones</Typography>
          <Typography
            sx={{
              bgcolor: "#d1caca3a",
              borderRadius: 2,
              minHeight: 60,
              p: 2,
              mt: 0.2,
              mb: 0
            }}
          >
            {observaciones || "—"}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </SectionCard>
);

export default DealInfoPanel;