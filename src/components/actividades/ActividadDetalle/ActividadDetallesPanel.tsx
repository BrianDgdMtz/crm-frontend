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
            <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>
              Estado de la actividad:
            </Typography>
            <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>
              {estado || "—"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>
              Tipo de actividad:
            </Typography>
            <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>
              {tipo || "—"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>
              Fecha programada:
            </Typography>
            <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>
              {fechaProgramada ? fechaLegible : "—"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>
              Notas adicionales:
            </Typography>
            <Typography sx={{ mb: 0, fontSize: "0.9rem" }}>
              {notas?.trim() ? notas : "—"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </SectionCard>
  );
};

export default ActividadDetallesPanel;
