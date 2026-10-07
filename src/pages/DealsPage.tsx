import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import DealsToolbar, { opcionesOrdenamiento } from "../components/deals/DealsToolbar";
import DealsTabs from "../components/deals/DealsTabs";
import DealsTable from "../components/deals/DealsTable";
import DealsKanbanBoard from "../components/deals/DealsKanbanBoard";
import AgregarDealModal from "../components/deals/AgregarDealModal";
import { dealsMock } from "../mock/dealsMock";
import { empresasMock } from "../mock/empresasMock";
import { etapaDealsMock } from "../mock/etapaDealsMock";
import { estadoDealsMock } from "../mock/estadoDealsMock";

const MAPA_ESTADO = {
  todos: null as number | null,
  abiertos: estadoDealsMock.find(e => e.nombre === "Abierto")?.id ?? 1,
  ganados: estadoDealsMock.find(e => e.nombre === "Ganado")?.id ?? 2,
  perdidos: estadoDealsMock.find(e => e.nombre === "Perdido")?.id ?? 3,
};

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState(dealsMock);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [orden, setOrden] = useState(opcionesOrdenamiento[0].valor);
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<keyof typeof MAPA_ESTADO>("todos");
  const [vista, setVista] = useState<"kanban" | "tabla">("kanban");

  const navigate = useNavigate();

  const dealsFiltrados = useMemo(() => {
    const estadoId = MAPA_ESTADO[estadoSeleccionado];
    if (!estadoId) return deals;
    return deals.filter(d => d.estado_id === estadoId);
  }, [deals, estadoSeleccionado]);

  const dealsOrdenados = useMemo(() => {
    const arr = [...dealsFiltrados];
    switch (orden) {
      case "reciente":
        return arr.sort((a, b) => b.fecha_creacion.localeCompare(a.fecha_creacion));
      case "antiguo":
        return arr.sort((a, b) => a.fecha_creacion.localeCompare(b.fecha_creacion));
      case "mayor_monto":
        return arr.sort((a, b) => b.monto_estimado - a.monto_estimado);
      case "menor_monto":
        return arr.sort((a, b) => a.monto_estimado - b.monto_estimado);
      default:
        return arr;
    }
  }, [dealsFiltrados, orden]);

  const dealsParaTabla = useMemo(() => {
    return dealsOrdenados.map((deal) => {
      const empresa = empresasMock.find(e => e.id === deal.empresa_id);
      const etapa = etapaDealsMock.find(e => e.id === deal.etapa_id);
      const estado = estadoDealsMock.find(e => e.id === deal.estado_id);
      return {
        ...deal,
        nombreEmpresa: empresa?.nombre ?? "—",
        nombreEtapa: etapa?.nombre ?? "—",
        nombreEstado: estado?.nombre ?? "—",
      };
    });
  }, [dealsOrdenados]);

  const handleLimpiar = () => {
    setOrden(opcionesOrdenamiento[0].valor);
    setEstadoSeleccionado("todos");
  };

  const handleAbrirModal = () => setModalAbierto(true);
  const handleCerrarModal = () => setModalAbierto(false);

  const handleGuardarDeal = (nuevoDeal: any) => {
    setDeals(prev => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [...prev, { id: nextId, ...nuevoDeal }];
    });
    setModalAbierto(false);
  };

  const handleDealMove = (dealId: number, nuevaEtapaId: number) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, etapa_id: nuevaEtapaId } : d));
  };

  return (
    <Box>
      <DealsToolbar
        onAgregarDeal={handleAbrirModal}
        orden={orden}
        onOrdenChange={setOrden}
        onLimpiar={handleLimpiar}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <DealsTabs
          estadoSeleccionado={estadoSeleccionado}
          onCambiarEstado={setEstadoSeleccionado}
        />
        <ToggleButtonGroup
          value={vista}
          exclusive
          onChange={(_, value) => { if (value) setVista(value); }}
          size="small"
          sx={{ bgcolor: 'background.paper' }}
        >
          <ToggleButton value="kanban"><ViewKanbanIcon fontSize="small" sx={{ mr: 1 }}/> Kanban</ToggleButton>
          <ToggleButton value="tabla"><ViewListIcon fontSize="small" sx={{ mr: 1 }}/> Tabla</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {vista === "tabla" ? (
        <DealsTable
          deals={dealsParaTabla}
          onSeleccionarDeal={(id) => navigate(`/deals/${id}`)}
        />
      ) : (
        <DealsKanbanBoard 
          deals={dealsParaTabla} 
          onSeleccionarDeal={(id) => navigate(`/deals/${id}`)}
          onDealMove={handleDealMove}
        />
      )}

      <AgregarDealModal
        open={modalAbierto}
        onClose={handleCerrarModal}
        onSave={handleGuardarDeal}
      />
    </Box>
  );
};

export default DealsPage;
