import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import type { Zona } from "../../mock/zonasMock";
import type { estatusContacto } from "../../mock/estatusContactosMock";

interface ContactosFiltersProps {
  zonas: Zona[];
  estatus: estatusContacto[];
  zonaSeleccionada: number | "";
  estatusSeleccionado: number | "";
  onZonaChange: (zonaId: number | "") => void;
  onEstatusChange: (estatusId: number | "") => void;
  onLimpiar: () => void;
}

const ContactosFilters: React.FC<ContactosFiltersProps> = ({
  zonas,
  estatus,
  zonaSeleccionada,
  estatusSeleccionado,
  onZonaChange,
  onEstatusChange,
  onLimpiar,
}) => (
  <Box display="flex" gap={2} alignItems="center" mb={3}>
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="zona-label">Zona</InputLabel>
      <Select
        labelId="zona-label"
        label="Zona"
        value={zonaSeleccionada}
        onChange={(e) => onZonaChange(e.target.value as number)}
      >
        <MenuItem value="">Todas</MenuItem>
        {zonas.map((z) => (
          <MenuItem key={z.id} value={z.id}>
            {z.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="estatus-label">Estatus</InputLabel>
      <Select
        labelId="estatus-label"
        label="Estatus"
        value={estatusSeleccionado}
        onChange={(e) => onEstatusChange(e.target.value as number)}
      >
        <MenuItem value="">Todos</MenuItem>
        {estatus.map((e) => (
          <MenuItem key={e.id} value={e.id}>
            {e.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button variant="contained" color="primary" onClick={onLimpiar}>
      Limpiar Filtros
    </Button>
  </Box>
);

export default ContactosFilters;
