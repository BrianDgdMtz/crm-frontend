import React from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

interface EmpresaToolbarProps {
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  onAgregarEmpresa: () => void;
}

export const EmpresaToolbar: React.FC<EmpresaToolbarProps> = ({
  busqueda,
  onBusquedaChange,
  onAgregarEmpresa,
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
      onClick={onAgregarEmpresa}
      sx={{ minWidth: 180, fontWeight: "bold" }}
    >
      Agregar empresa
    </Button>
  </Box>
);