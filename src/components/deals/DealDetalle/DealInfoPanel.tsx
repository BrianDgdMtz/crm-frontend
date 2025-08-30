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
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Empresa</Typography>
          {empresa?.id ? (
            <Tooltip title="Ver detalle de la empresa" arrow>
              <Link
              component={RouterLink}
              to={`/empresas/${empresa.id}`}
              color="primary"
              underline="hover"
              variant="subtitle1"
              sx={{ fontWeight: 500, cursor: "pointer", fontSize: "0.9rem" }}
            >
              {empresa.nombre}
            </Link>
            </Tooltip>
          ) : (
            <Typography sx={{ mb: 1 }}>—</Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Contacto</Typography>
          {contacto?.id ? (
            <Tooltip title="Ver detalle del contacto" arrow>
              <Link
              component={RouterLink}
              to={`/contactos/${contacto.id}`}
              color="primary"
              underline="hover"
              variant="subtitle1"
              sx={{ fontWeight: 500, cursor: "pointer", fontSize: "0.9rem" }}
            >
              {contacto.nombre}
            </Link>
            </Tooltip>
          ) : (
            <Typography sx={{ mb: 1 }}>—</Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Prioridad</Typography>
          <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>{prioridad || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Monto estimado</Typography>
          <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>
            {Number.isFinite(montoEstimado)
              ? `$${montoEstimado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`
              : "—"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Fecha de creación</Typography>
          <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>{fechaCreacion || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Fecha estimada de cierre</Typography>
          <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>{fechaCierreEstimada || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Estado</Typography>
          <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>{estado || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Etapa</Typography>
          <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>{etapa || "—"}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Observaciones</Typography>
          <Typography
            sx={{
              bgcolor: "#d1caca3a",
              borderRadius: 2,
              minHeight: 60,
              p: 2,
              mt: 0.2,
              mb: 0,
              fontSize: "0.9rem"
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