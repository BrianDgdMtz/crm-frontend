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
                startIcon={<AddIcon />}
                onClick={onAgregarActividad}
                sx={{ minWidth: 200, fontWeight: "bold" }}
            >
                Agregar actividad
            </Button>
        </Box>
    );
};

export default ActividadesToolbar;