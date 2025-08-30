import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ActividadesToolbarProps {
    onAgregarActividad: () => void;
}

const ActividadesToolbar: React.FC<ActividadesToolbarProps> = ({
    onAgregarActividad,
}) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="flex-end" mb={3}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon sx={{ fontSize: 18}} />}
                onClick={onAgregarActividad}
                sx={{ minWidth: 140, fontWeight: "bold", fontSize: "0.8rem", py: 0.7, px: 1.5 }}
            >
                Agregar actividad
            </Button>
        </Box>
    );
};

export default ActividadesToolbar;