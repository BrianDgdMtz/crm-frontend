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
                  <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Creada por:</Typography>
                  <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>{creadaPor?.trim() || "—"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Creada el:</Typography>
                  <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>{formatearFecha(creadaEl)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Última modificación:</Typography>
                  <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>{formatearFecha(ultimaModificacion)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Modificada por:</Typography>
                  <Typography sx={{ mb: 0, fontSize: "0.9rem" }}>{modificadaPor?.trim() || "—"}</Typography>
              </Grid>
            </Grid>
        </CardContent>
    </SectionCard>
  );
};

export default ActividadResponsabilidadPanel;