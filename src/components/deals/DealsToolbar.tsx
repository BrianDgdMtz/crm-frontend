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
    {/* Primera línea: Botón agregar deal a la derecha */}
    <Box display="flex" justifyContent="flex-end" mb={1}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onAgregarDeal}
        sx={{ minWidth: 160, fontWeight: "bold" }}
      >
        Nuevo deal
      </Button>
    </Box>
    <Box display="flex" gap={2}>
        <FormControl size="small" sx={{ minWidth: 170 }}>
        <InputLabel id="ordenar-label">Ordenar por</InputLabel>
        <Select
            labelId="ordenar-label"
            id="ordenar-select"
            value={orden}
            label="Ordenar por"
            onChange={(e) => onOrdenChange(e.target.value)}
        >
            {opcionesOrdenamiento.map((opcion) => (
            <MenuItem key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={onLimpiar}>
            Limpiar Filtro
        </Button>
    </Box>
  </Box>
);

export default DealsToolbar;
