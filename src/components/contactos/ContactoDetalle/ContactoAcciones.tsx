import React from 'react';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WorkIcon from '@mui/icons-material/Work';

interface ContactoAccionesProps {
  onNuevaActividad: () => void;
  onNuevoDeal?: () => void;
  onEditarContacto: () => void;
  onEliminarContacto: () => void;
}

const ContactoAcciones: React.FC<ContactoAccionesProps> = ({
  onNuevaActividad,
  onNuevoDeal,
  onEditarContacto,
  onEliminarContacto,
}) => (
  <Box display="flex" gap={2}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<EventNoteIcon />}
      onClick={onNuevaActividad}
    >
      Nueva Actividad
    </Button>
    <Button
        variant="contained"
        color="primary"
        startIcon={<WorkIcon />}
        onClick={onNuevoDeal}
        >
        Nuevo Deal
    </Button>
    <Button
      variant="contained"
      color="primary"
      startIcon={<EditIcon />}
      onClick={onEditarContacto}
    >
      Editar
    </Button>
    <Button
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={onEliminarContacto}
    >
      Eliminar
    </Button>
  </Box>
);

export default ContactoAcciones;
