import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import EmpresaHeader from "./EmpresaHeader";
import EmpresaInfoPanel from "./EmpresaInfoPanel";
import EmpresaAcciones from "./EmpresaAcciones";
import EmpresaContactosTable from "./EmpresaContactosTable";
import EmpresaActividadesTable from "./EmpresaActividadesTable";
import EmpresaDealsTable from "./EmpresaDealsTable";
import { contactosMock } from "../../../mock/contactosMock";
import { actividadesMock } from "../../../mock/actividadesMock";
import { dealsMock } from "../../../mock/dealsMock";
import { industriasMock } from "../../../mock/industriasMock";
import { estatusEmpresasMock } from "../../../mock/estatusEmpresasMock";
import type { Empresa } from "../../../mock/empresasMock";
import { useNavigate } from "react-router-dom";

interface EmpresaDetalleViewProps {
  empresa: Empresa;
}

const EmpresaDetalleView: React.FC<EmpresaDetalleViewProps> = ({ empresa }) => {
  const navigate = useNavigate();

  const contactosEmpresa = contactosMock.filter(c => c.empresa_id === empresa.id);
  const actividadesEmpresa = actividadesMock.filter(a => a.empresa_id === empresa.id);
  const dealsEmpresa = dealsMock.filter(d => d.empresa_id === empresa.id);

  // Acciones como JSX para pasar al header
  const acciones = (
    <EmpresaAcciones
      onNuevaActividad={() => alert("Nueva Actividad")}
      onNuevoDeal={() => alert("Nuevo Deal")}
      onEditarEmpresa={() => alert("Editar Empresa")}
      onAgregarContacto={() => alert("Agregar Contacto")}
      onEliminarEmpresa={() => alert("Eliminar Empresa")}
    />
  );

  return (
    <Box>
      {/* HEADER con botón volver y nombre empresa */}
      <EmpresaHeader
        nombre={empresa.nombre}
        onVolver={() => navigate("/empresas")}
        acciones={acciones}
      />

      {/* Panel de información general */}
      <EmpresaInfoPanel
        industria={industriasMock.find(i => i.id === empresa.industria_id)?.nombre || "—"}
        rfc={empresa.rfc || "—"}
        estatus={estatusEmpresasMock.find(e => e.id === empresa.estatus_id)?.nombre || "—"}
        fechaAlta={empresa.fecha_alta || "—"}
      />

      {/* Tablas de contactos, actividades y deals */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Contactos</Typography>
            <EmpresaContactosTable
              contactos={contactosEmpresa}
              onRowClick={(id) => navigate(`/contactos/${id}`)}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Actividades</Typography>
            <EmpresaActividadesTable
              actividades={actividadesEmpresa}
              onRowClick={(id) => navigate(`/actividades/${id}`)}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Deals vinculados</Typography>
            <EmpresaDealsTable
              deals={dealsEmpresa}
              onRowClick={(id) => navigate(`/deals/${id}`)}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmpresaDetalleView;
