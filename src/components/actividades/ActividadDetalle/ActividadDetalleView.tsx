import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import ActividadHeader from "./ActividadHeader";
import ActividadDetallesPanel from "./ActividadDetallesPanel";
import ActividadContactoPanel from "./ActividadContactoPanel";
import ActividadResponsabilidadPanel from "./ActividadResponsabilidadPanel";
import type { Actividad } from "../../../mock/actividadesMock";
import { tipoActividadMock } from "../../../mock/tipoActividadMock";
import { empresasMock } from "../../../mock/empresasMock";
import { contactosMock } from "../../../mock/contactosMock";
import { dealsMock } from "../../../mock/dealsMock";
import { usuariosMock } from "../../../mock/usuariosMock";
import ActividadAcciones from "./ActividadAcciones";
import AgregarActividadModal from "../../actividades/AgregarActividadModal";

interface ActividadDetalleViewProps {
  actividad: Actividad;
  onActualizarRealizada?: (id: number, realizada: boolean) => void;
  onEditar?: () => void;
  onEliminar?: () => void;
}

type ModalName = "editar-actividad" | undefined;

const ActividadDetalleView: React.FC<ActividadDetalleViewProps> = ({
  actividad,
  onActualizarRealizada,
  onEditar,
  onEliminar,
}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState<{ name: ModalName }>({ name: undefined });
  const closeModal = () => setModal({ name: undefined });

  const [realizadaLocal, setRealizadaLocal] = useState<boolean>(!!actividad.realizada);

  const tipoNombre = useMemo(
    () => tipoActividadMock.find(t => t.id === actividad.tipo_id)?.nombre || "—",
    [actividad.tipo_id]
  );

  const contacto = useMemo(() => {
    const c = contactosMock.find(x => x.id === actividad.contacto_id);
    return c ? { id: c.id, nombre: c.nombre } : null;
  }, [actividad.contacto_id]);

  const empresa = useMemo(() => {
    const e = empresasMock.find(x => x.id === actividad.empresa_id);
    return e ? { id: e.id, nombre: e.nombre } : null;
  }, [actividad.empresa_id]);

  const deal = useMemo(() => {
    const d = dealsMock.find(x => x.id === actividad.deal_id);
    return d ? { id: d.id, nombre: d.titulo } : null;
  }, [actividad.deal_id]);

  const creadaPor = useMemo(() => {
    const u = usuariosMock.find(x => x.id === actividad.usuario_id);
    return u?.nombre || "—";
  }, [actividad.usuario_id]);

  const creadaEl: string | null = (actividad as any).fecha_creacion || null;
  const ultimaModificacion: string | null = (actividad as any).fecha_actualizacion || null;
  const modificadaPor: string | null = (actividad as any).modificada_por || null;

  const estadoTexto = realizadaLocal ? "Completada" : "Pendiente";

  const acciones = (
    <ActividadAcciones
      context={{ id: actividad.id, asunto: actividad.asunto }}
      handlers={{
        openEditar: () => setModal({ name: "editar-actividad" }),
        onEliminar: () => (onEliminar ? onEliminar() : alert("Eliminar actividad")),
      }}
      align="right"
    />
  );

  const manejarToggleRealizada = (valor: boolean) => {
    setRealizadaLocal(valor);
    onActualizarRealizada?.(actividad.id, valor);
  };

  return (
    <Box>
      <ActividadHeader
        titulo={actividad.asunto}
        realizada={realizadaLocal}
        onToggleRealizada={manejarToggleRealizada}
        onVolver={() => navigate("/actividades")}
        acciones={acciones}
      />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box mb={1}>
            <ActividadDetallesPanel
              estado={estadoTexto}
              tipo={tipoNombre}
              fechaProgramada={actividad.fecha_programada}
              notas={actividad.notas}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box mb={1}>
            <ActividadContactoPanel contacto={contacto} empresa={empresa} deal={deal} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box>
            <ActividadResponsabilidadPanel
              creadaPor={creadaPor}
              creadaEl={creadaEl}
              ultimaModificacion={ultimaModificacion}
              modificadaPor={modificadaPor}
            />
          </Box>
        </Grid>
      </Grid>

      {modal.name === "editar-actividad" && (
        <AgregarActividadModal
          key="editar-actividad"
          open
          onClose={closeModal}
          actividadId={actividad.id}
          defaultEmpresaId={actividad.empresa_id ?? undefined}
          defaultContactoId={actividad.contacto_id ?? undefined}
          defaultDealId={actividad.deal_id ?? undefined}
          onSave={(payload) => {
            console.log("Actividad guardada:", payload);
            onEditar?.();
            alert("Actividad guardada");
            closeModal();
          }}
        />
      )}
    </Box>
  );
};

export default ActividadDetalleView;