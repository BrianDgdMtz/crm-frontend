import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import type { Industria } from "../../mock/industriasMock";
import type { Zona } from "../../mock/zonasMock";

interface EmpresaFiltersProps {
    zonas: Zona[];
    industrias: Industria[];
    zonaSeleccionada: number | "";
    industriaSeleccionada: number | "";
    onZonaChange: (zonaId: number | "") => void;
    onIndustriaChange: (industriaId: number | "") => void;
    onLimpiar: () => void;
}

export const EmpresaFilters: React.FC<EmpresaFiltersProps> = ({
    zonas,
    industrias,
    zonaSeleccionada,
    industriaSeleccionada,
    onZonaChange,
    onIndustriaChange,
    onLimpiar,
}) => (
    <Box display={"flex"} gap={2} alignItems={"center"} mb={3}>
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
            <InputLabel id="industria-label">Industria</InputLabel>
            <Select
                labelId="industria-label"
                label="Industria"
                value={industriaSeleccionada}
                onChange={(e) => onIndustriaChange(e.target.value as number)}
            >
                <MenuItem value="">Todas</MenuItem>
                {industrias.map((i) => (
                    <MenuItem key={i.id} value={i.id}>
                        {i.nombre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={onLimpiar}>
            Limpiar Filtros
        </Button>
    </Box>
)