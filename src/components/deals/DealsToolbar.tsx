import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const opcionesOrdenamiento = [
  { valor: "reciente", etiqueta: "Más reciente" },
  { valor: "antiguo", etiqueta: "Más antiguo" },
  { valor: "mayor_monto", etiqueta: "Mayor monto" },
  { valor: "menor_monto", etiqueta: "Menor monto" },
];

interface DealsToolbarProps {
  onAgregarDeal: () => void;
  orden: string;
  onOrdenChange: (valor: string) => void;
  onLimpiar: () => void;
}

const DealsToolbar: React.FC<DealsToolbarProps> = ({
  onAgregarDeal,
  orden,
  onOrdenChange,
  onLimpiar,
}) => (
  <Box mb={3}>
    <Box display="flex" justifyContent="flex-end" mb={1}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon sx={{ fontSize: 18}} />}
        onClick={onAgregarDeal}
        sx={{ minWidth: 140, fontWeight: "bold", fontSize: "0.8rem", py: 0.7, px: 1.5 }}
      >
        Nuevo deal
      </Button>
    </Box>
    <Box display="flex" gap={2}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="ordenar-label" sx={{fontSize: "0.9rem"}}>Ordenar por</InputLabel>
        <Select
            labelId="ordenar-label"
            id="ordenar-select"
            value={orden}
            label="Ordenar por"
            onChange={(e) => onOrdenChange(e.target.value)}
            sx={{
                fontSize: "0.9rem",
                height: 36
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        "& .MuiMenuItem-root": {
                            fontSize: "0.9rem",
                            py: 0.75
                        }
                    }
                }
            }}
        >
            {opcionesOrdenamiento.map((opcion) => (
            <MenuItem key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={onLimpiar}
        sx={{
            fontSize: "0.8rem",
            minWidth: 120,
            py: 0.7,
            px: 1.5,
        }}>
            Limpiar Filtro
        </Button>
    </Box>
  </Box>
);

export default DealsToolbar;
