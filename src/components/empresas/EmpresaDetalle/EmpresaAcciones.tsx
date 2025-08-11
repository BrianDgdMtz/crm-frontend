import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface EmpresaAccionesProps {
    onNuevaActividad: () => void;
    onNuevoDeal: () => void;
    onEditarEmpresa: () => void;
    onAgregarContacto: () => void;
    onEliminarEmpresa: () => void;
}

const EmpresaAcciones: React.FC<EmpresaAccionesProps> = ({
    onNuevaActividad,
    onNuevoDeal,
    onEditarEmpresa,
    onAgregarContacto,
    onEliminarEmpresa,
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
            onClick={onEditarEmpresa}
            >
            Editar Empresa
        </Button>
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAgregarContacto}
            >
            Agregar Contacto
        </Button>
        <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onEliminarEmpresa}
            >
            Eliminar
        </Button>
    </Box> 
);

export default EmpresaAcciones;