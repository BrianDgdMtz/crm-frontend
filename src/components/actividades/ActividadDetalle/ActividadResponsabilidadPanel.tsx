import React from "react";
import { CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import SectionCard from "../../ui/SectionCard";

interface ActividadResponsabilidadPanelProps {
  creadaPor?: string | null;
  creadaEl?: string | null;
  ultimaModificacion?: string | null;
  modificadaPor?: string | null;
}

const formatearFecha = (valor?: string | null) => {
  if (!valor) return "—";
  const d = new Date(valor);
  return isNaN(d.getTime())
    ? valor
    : d.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "2-digit" });
};

const ActividadResponsabilidadPanel: React.FC<ActividadResponsabilidadPanelProps> = ({
  creadaPor,
  creadaEl,
  ultimaModificacion,
  modificadaPor,
}) => {
  return (
    <SectionCard title="Responsabilidad" hover intro>
        <CardContent>
            <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" fontWeight="bold">Creada por:</Typography>
                <Typography sx={{ mb: 2 }}>{creadaPor?.trim() || "—"}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" fontWeight="bold">Creada el:</Typography>
                <Typography sx={{ mb: 2 }}>{formatearFecha(creadaEl)}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" fontWeight="bold">Última modificación:</Typography>
                <Typography sx={{ mb: 2 }}>{formatearFecha(ultimaModificacion)}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" fontWeight="bold">Modificada por:</Typography>
                <Typography sx={{ mb: 0 }}>{modificadaPor?.trim() || "—"}</Typography>
            </Grid>
            </Grid>
        </CardContent>
    </SectionCard>
  );
};

export default ActividadResponsabilidadPanel;