import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DealHeader from "./DealHeader";
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
import AgregarActividadModal from "../../actividades/AgregarActividadModal";
import AgregarDealModal from "../../deals/AgregarDealModal";
import DealAcciones from "./DealAcciones";

interface DealDetalleViewProps {
  deal: Deal;
  empresa: Empresa | null;
  contacto: Contacto | null;
}

type ModalName = "editar-deal" | "agregar-actividad" | undefined;

const DealDetalleView: React.FC<DealDetalleViewProps> = ({ deal, empresa, contacto }) => {
  const navigate = useNavigate();

  const etapaNombre = etapaDealsMock.find((e) => e.id === deal.etapa_id)?.nombre || "—";
  const estadoNombre = estadoDealsMock.find((e) => e.id === deal.estado_id)?.nombre || "—";

  const historial = historialEtapaDealsMock
    .filter((h) => h.deal_id === deal.id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  const actividadesDeal = actividadesMock
    .filter((a) => a.deal_id === deal.id)
    .sort((a, b) => a.fecha_programada.localeCompare(b.fecha_programada));

  const [modal, setModal] = useState<{ name: ModalName }>({ name: undefined });
  const closeModal = () => setModal({ name: undefined });

  const acciones = (
    <DealAcciones
      context={{
        dealId: deal.id,
        empresaId: deal.empresa_id,
        contactoId: deal.contacto_id ?? undefined,
        titulo: deal.titulo,
      }}
      handlers={{
        openEditarDeal: () => setModal({ name: "editar-deal" }),
        openCrearActividad: () => setModal({ name: "agregar-actividad" }),
        onEliminar: () => alert("Eliminar deal (no implementado)"),
      }}
      align="right"
    />
  );

  return (
    <Box>
      <DealHeader titulo={deal.titulo} onVolver={() => navigate("/deals")} acciones={acciones} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box mb={2}>
            <DealInfoPanel
              empresa={empresa}
              contacto={contacto}
              montoEstimado={deal.monto_estimado}
              fechaCreacion={deal.fecha_creacion}
              fechaCierreEstimada={deal.fecha_cierre_esperada}
              prioridad={deal.prioridad}
              observaciones={deal.observaciones}
              etapa={etapaNombre}
              estado={estadoNombre}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Cotizaciones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Disponible más adelante
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {modal.name === "editar-deal" && (
        <AgregarDealModal
          key="editar-deal"
          open
          onClose={closeModal}
          dealId={deal.id}
          defaultEmpresaId={deal.empresa_id}
          defaultContactoId={deal.contacto_id ?? undefined}
          onSave={(payload) => {
            console.log("Deal actualizado/creado:", payload);
            alert("Deal guardado");
            closeModal();
          }}
        />
      )}

      {modal.name === "agregar-actividad" && (
        <AgregarActividadModal
          key="agregar-actividad"
          open
          onClose={closeModal}
          defaultEmpresaId={deal.empresa_id}
          defaultContactoId={deal.contacto_id ?? undefined}
          defaultDealId={deal.id}
          onSave={(actividad) => {
            console.log("Actividad guardada:", actividad);
            alert("Actividad agregada");
            closeModal();
          }}
        />
      )}
    </Box>
  );
};

export default DealDetalleView;