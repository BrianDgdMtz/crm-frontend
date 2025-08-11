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
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ width: 250 }}
    />
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onAgregarContacto}
      sx={{ minWidth: 180, fontWeight: "bold" }}
    >
      Agregar contacto
    </Button>
  </Box>
);

export default ContactosToolbar;