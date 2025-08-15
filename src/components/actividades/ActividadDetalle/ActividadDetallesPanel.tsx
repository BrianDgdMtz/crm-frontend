import React from "react";
import { CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import SectionCard from "../../ui/SectionCard";

interface ActividadDetallesPanelProps {
  estado: string;
  tipo: string;
  fechaProgramada: string;
  notas?: string;
}

const ActividadDetallesPanel: React.FC<ActividadDetallesPanelProps> = ({
  estado,
  tipo,
  fechaProgramada,
  notas,
}) => {
  const fechaLegible = fechaProgramada
    ? new Date(fechaProgramada).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : "—";

  return (
    <SectionCard title="Detalles de la actividad" hover intro>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Estado de la actividad:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {estado || "—"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Tipo de actividad:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {tipo || "—"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Fecha programada:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {fechaProgramada ? fechaLegible : "—"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Notas adicionales:
            </Typography>
            <Typography sx={{ mb: 0 }}>
              {notas?.trim() ? notas : "—"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </SectionCard>
  );
};

export default ActividadDetallesPanel;
