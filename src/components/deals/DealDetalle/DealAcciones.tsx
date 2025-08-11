import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface DealAccionesProps {
  onEditarDeal: () => void;
  onCrearCotizacion: () => void; // quedará deshabilitado por ahora
  onCrearActividad: () => void;
}

const DealAcciones: React.FC<DealAccionesProps> = ({
  onEditarDeal,
  onCrearCotizacion,
  onCrearActividad,
}) => (
  <Box display="flex" gap={2}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<EditIcon />}
      onClick={onEditarDeal}
    >
      Editar deal
    </Button>

    {/* Tooltip + span para que funcione con disabled */}
    <Tooltip title="Disponible más adelante" arrow>
      <span>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DescriptionIcon />}
          onClick={onCrearCotizacion}
          disabled
        >
          Crear cotización
        </Button>
      </span>
    </Tooltip>

    <Button
      variant="contained"
      color="primary"
      startIcon={<EventNoteIcon />}
      onClick={onCrearActividad}
    >
      Crear actividad
    </Button>
  </Box>
);

export default DealAcciones;
