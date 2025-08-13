import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import DealHeader from "./DealHeader";
import DealAcciones from "./DealAcciones";
import DealInfoPanel from "./DealInfoPanel";
import DealHistorialTable from "./DealHistorialTable";
import DealActividadesTable from "./DealActividadesTable";

import type { Deal } from "../../../mock/dealsMock";
import type { Empresa } from "../../../mock/empresasMock";
import type { Contacto } from "../../../mock/contactosMock";
import { etapaDealsMock } from "../../../mock/etapaDealsMock";
import { estadoDealsMock } from "../../../mock/estadoDealsMock";
import { historialEtapaDealsMock } from "../../../mock/historialEtapaDealsMock";
import { actividadesMock } from "../../../mock/actividadesMock";

interface DealDetalleViewProps {
  deal: Deal;
  empresa: Empresa | null;
  contacto: Contacto | null;
}

const DealDetalleView: React.FC<DealDetalleViewProps> = ({
  deal,
  empresa,
  contacto
}) => {
  const navigate = useNavigate();

  const etapaNombre =
    etapaDealsMock.find((e) => e.id === deal.etapa_id)?.nombre || "—";
  const estadoNombre =
    estadoDealsMock.find((e) => e.id === deal.estado_id)?.nombre || "—";
    const historial = historialEtapaDealsMock
    .filter(h => h.deal_id === deal.id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const actividadesDeal = actividadesMock
  .filter(a => a.deal_id === deal.id)
  .sort((a, b) => a.fecha_programada.localeCompare(b.fecha_programada));

  const acciones = (
    <DealAcciones
      onEditarDeal={() => alert("Editar deal")}
      onCrearCotizacion={() => {}}
      onCrearActividad={() => alert("Crear actividad")}
    />
  );

  return (
    <Box>
      <DealHeader
        titulo={deal.titulo}
        onVolver={() => navigate("/deals")}
        acciones={acciones}
      />

      {/* Información general */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs:12, md:6 }}>
          <Box mb={2}>
            <DealInfoPanel
            empresa={empresa}
            montoEstimado={deal.monto_estimado}
            contacto={contacto}
            fechaCreacion={deal.fecha_creacion}
            fechaCierreEstimada={deal.fecha_cierre_esperada}
            prioridad={deal.prioridad}
            observaciones={deal.observaciones}
            etapa={etapaNombre}
            estado={estadoNombre}
          />
          </Box>
        </Grid>
          <Grid size={{ xs:12, md:6 }}>
            <Box mb={3}>
              <DealHistorialTable items={historial} />
            </Box>
            <Box>
              <DealActividadesTable
                actividades={actividadesDeal} 
                onRowClick={(id) => navigate(`/actividades/${id}`)}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card sx={{ p:2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Cotizaciones</Typography>
              {/* <DealCotizacionesPn cotizaciones={...} /> */}
              <Typography variant="body2" color="text.secondary">Disponible mas adelante</Typography>
            </Card>
          </Grid>
      </Grid>
    </Box>
  );
};

export default DealDetalleView;