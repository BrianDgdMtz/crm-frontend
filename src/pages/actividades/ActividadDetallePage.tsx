import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ActividadDetalleView from "../../components/actividades/ActividadDetalle/ActividadDetalleView";
import { actividadesMock } from "../../mock/actividadesMock";

const ActividadDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const actividad = actividadesMock.find(a => a.id === Number(id));

  if (!actividad) {
    return (
      <div>
        <h2>No se encontró la actividad.</h2>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/actividades")}
          sx={{ mb: 3 }}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <ActividadDetalleView
      actividad={actividad}
      onActualizarRealizada={(actividadId, realizada) => {
        console.log("Actualizar realizada", { actividadId, realizada });
      }}
      onEditar={() => alert("Editar actividad")}
      onEliminar={() => alert("Eliminar actividad")}
    />
  );
};

export default ActividadDetallePage;
