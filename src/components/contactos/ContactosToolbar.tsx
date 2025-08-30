import React from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

interface ContactosToolbarProps {
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  onAgregarContacto: () => void;
}

const ContactosToolbar: React.FC<ContactosToolbarProps> = ({
  busqueda,
  onBusquedaChange,
  onAgregarContacto,
}) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <TextField
      size="small"
      placeholder="Buscar"
      value={busqueda}
      onChange={(e) => onBusquedaChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{fontSize: 22}} />
          </InputAdornment>
        ),
        sx: {
          fontSize: "0.90rem",
          height: "36"
        }
      }}
      sx={{ width: 225 }}
    />
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon sx={{ fontSize: 18}} />}
      onClick={onAgregarContacto}
      sx={{ minWidth: 190, fontSize: "0.8rem", fontWeight: "bold", py: 0.7, px: 1.5 }}
    >
      Agregar contacto
    </Button>
  </Box>
);

export default ContactosToolbar;