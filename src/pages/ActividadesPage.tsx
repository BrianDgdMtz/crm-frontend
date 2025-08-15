import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ActividadesToolbar from "../components/actividades/ActividadesToolbar";
import ActividadesTabs from "../components/actividades/ActividadesTabs";
import ActividadesTable from "../components/actividades/ActividadesTable";
import AgregarActividadModal, {
  type NuevaActividad,
} from "../components/actividades/AgregarActividadModal";
import {
  actividadesMock,
  type Actividad,
} from "../mock/actividadesMock";

type TabKey = "todos" | "completadas" | "sin-realizar";

const ActividadesPage: React.FC = () => {
  const navigate = useNavigate();

  const [actividades, setActividades] = useState<Actividad[]>(actividadesMock);

  const [estadoSeleccionado, setEstadoSeleccionado] = useState<TabKey>("todos");
  const [modalAbierto, setModalAbierto] = useState(false);

  // Contadores para mostrar en Tabs
  const counts = useMemo(() => {
    const total = actividades.length;
    const completadas = actividades.filter((a) => a.realizada).length;
    const pendientes = total - completadas;
    return { total, completadas, pendientes };
  }, [actividades]);

  // Filtro por pestaña
  const actividadesFiltradas = useMemo(() => {
    return actividades.filter((a) => {
      if (estadoSeleccionado === "completadas") return a.realizada;
      if (estadoSeleccionado === "sin-realizar") return !a.realizada;
      return true;
    });
  }, [actividades, estadoSeleccionado]);

  const handleAbrirModal = () => setModalAbierto(true);
  const handleCerrarModal = () => setModalAbierto(false);

  const handleGuardarActividad = (nueva: NuevaActividad) => {
    setActividades((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;

      const nuevaActividad: Actividad = {
        id: nextId,
        asunto: nueva.asunto,
        tipo_id: nueva.tipo_id,
        empresa_id: nueva.empresa_id ?? null,
        contacto_id: nueva.contacto_id ?? null,
        deal_id: nueva.deal_id ?? null,
        fecha_programada: nueva.fecha_programada,
        realizada: false,
        usuario_id: 1,
        notas: nueva.notas ?? "",
      } as unknown as Actividad;

      return [...prev, nuevaActividad];
    });

    setModalAbierto(false);
  };

  return (
    <Box>
      <ActividadesToolbar onAgregarActividad={handleAbrirModal} />

      <ActividadesTabs
        value={estadoSeleccionado}
        onChange={setEstadoSeleccionado}
        total={counts.total}
        completadas={counts.completadas}
        pendientes={counts.pendientes}
      />

      <ActividadesTable
        actividades={actividadesFiltradas}
        onRowClick={(id) => navigate(`/actividades/${id}`)}
      />

      <AgregarActividadModal
        open={modalAbierto}
        onClose={handleCerrarModal}
        onSave={handleGuardarActividad}
      />
    </Box>
  );
};

export default ActividadesPage;
