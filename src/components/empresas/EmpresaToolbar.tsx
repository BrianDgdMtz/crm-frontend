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
      onClick={onAgregarEmpresa}
      sx={{ minWidth: 190, fontSize: "0.8rem", fontWeight: "bold", py: 0.7, px: 1.5 }}
    >
      Agregar empresa
    </Button>
  </Box>
);