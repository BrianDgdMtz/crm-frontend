// src/pages/ActividadesPage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import ActividadesToolbar from "../components/actividades/ActividadesToolbar";
import ActividadesTabs from "../components/actividades/ActividadesTabs";
import ActividadesTable from "../components/actividades/ActividadesTable";

import { actividadesMock, type Actividad } from "../mock/actividadesMock";
import { contactosMock } from "../mock/contactosMock";
import { empresasMock } from "../mock/empresasMock";

// Tipo para las tabs
type TabKey = "todos" | "completadas" | "sin-realizar";

const ActividadesPage: React.FC = () => {
  const navigate = useNavigate();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<TabKey>("todos");

  // Contadores para mostrar en las Tabs
  const counts = useMemo(() => {
    const total = actividadesMock.length;
    const completadas = actividadesMock.filter(a => a.realizada).length;
    const pendientes = total - completadas;
    return { total, completadas, pendientes };
  }, []);

  // Filtrar según el estado seleccionado
  const actividadesFiltradas: Actividad[] = useMemo(() => {
    return actividadesMock.filter(a => {
      if (estadoSeleccionado === "completadas") return a.realizada;
      if (estadoSeleccionado === "sin-realizar") return !a.realizada;
      return true;
    });
  }, [estadoSeleccionado]);

  // Enriquecer con datos de contacto y empresa para la tabla
  const actividadesParaTabla = useMemo(() => {
    return actividadesFiltradas.map(a => {
      const contacto = contactosMock.find(c => c.id === a.contacto_id);
      const empresa = empresasMock.find(e => e.id === a.empresa_id);
      return {
        ...a,
        nombreContacto: contacto?.nombre ?? "—",
        nombreEmpresa: empresa?.nombre ?? "—"
      };
    });
  }, [actividadesFiltradas]);

  return (
    <Box>
      <ActividadesToolbar
        onAgregarActividad={() => alert("Agregar actividad (pendiente)")}
      />

      <ActividadesTabs
        value={estadoSeleccionado}
        onChange={setEstadoSeleccionado}
        total={counts.total}
        completadas={counts.completadas}
        pendientes={counts.pendientes}
      />

      <ActividadesTable
        actividades={actividadesParaTabla}
        onRowClick={(id) => navigate(`/actividades/${id}`)}
      />
    </Box>
  );
};

export default ActividadesPage;
