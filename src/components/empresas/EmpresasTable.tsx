import * as React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Aquí va el tipo que representa cada empresa (ajusta según tu mock real)
export interface EmpresaTabla {
  id: number;
  nombre: string;
  industria: string;
  zona: string;
  fecha_ultima_actividad?: string;
}

interface EmpresasTableProps {
  empresas: EmpresaTabla[];
  onRowClick?: (empresaId: number) => void; // Callback opcional para manejar clicks en filas
}

export const EmpresasTable: React.FC<EmpresasTableProps> = ({ empresas, onRowClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Industria</b></TableCell>
            <TableCell><b>Zona</b></TableCell>
            <TableCell><b>Última actividad</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow
                key={empresa.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick?.(empresa.id)}
            >
              <TableCell>{empresa.nombre}</TableCell>
              <TableCell>{empresa.industria}</TableCell>
              <TableCell>{empresa.zona}</TableCell>
              <TableCell>{empresa.fecha_ultima_actividad || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
