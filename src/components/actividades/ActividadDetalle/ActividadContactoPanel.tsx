import React from "react";
import { CardContent, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import SectionCard from "../../ui/SectionCard";

type RelacionSimple = { id: number; nombre: string } | null | undefined;

interface ActividadContactoPanelProps {
  contacto?: RelacionSimple;
  empresa?: RelacionSimple;
  deal?: RelacionSimple;
}

const ActividadContactoPanel: React.FC<ActividadContactoPanelProps> = ({
  contacto,
  empresa,
  deal,
}) => {
  const renderLink = (entidad: RelacionSimple, toBase: string) => {
    if (!entidad) return <Typography sx={{ mb: 2 }}>—</Typography>;
    return (
      <Link
        component={RouterLink}
        to={`/${toBase}/${entidad.id}`}
        color="primary"
        underline="hover"
        variant="subtitle1"
        sx={{ fontWeight: 500, display: "inline-block" }}
      >
        {entidad.nombre}
      </Link>
    );
  };

  return (
    <SectionCard title="Información de contacto" hover intro>
        <CardContent>
            <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" fontWeight="bold">Contacto:</Typography>
                {contacto ? (
                    <Tooltip title="Ver detalle del contacto" arrow>
                        {renderLink(contacto, "contactos")}
                    </Tooltip>
                ) : (
                    <Typography variant="subtitle1">—</Typography>
                )}
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" fontWeight="bold">Empresa:</Typography>
                {contacto ? (
                    <Tooltip title="Ver detalle de la empresa" arrow>
                        {renderLink(empresa, "empresas")}
                    </Tooltip>
                ) : (
                    <Typography variant="subtitle1">—</Typography>
                )}
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" fontWeight="bold">Deal relacionado:</Typography>
                {contacto ? (
                    <Tooltip title="Ver detalle del deal" arrow>
                        {renderLink(deal, "deals")}
                    </Tooltip>
                ) : (
                    <Typography variant="subtitle1">—</Typography>
                )}
            </Grid>
            </Grid>
        </CardContent>
    </SectionCard>
  );
};

export default ActividadContactoPanel;
