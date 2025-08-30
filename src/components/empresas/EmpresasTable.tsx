import * as React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, TablePagination
} from "@mui/material";
import SectionCard from "../ui/SectionCard";

export interface EmpresaTabla {
  id: number;
  nombre: string;
  industria: string;
  zona: string;
  fecha_ultima_actividad?: string;
}

interface EmpresasTableProps {
  empresas: EmpresaTabla[];
  onRowClick?: (empresaId: number) => void;
  rowsPerPageOptions?: number[];
}

export const EmpresasTable: React.FC<EmpresasTableProps> = ({
  empresas,
  onRowClick,
  rowsPerPageOptions = [10, 20, 50],
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0] ?? 10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated = empresas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <SectionCard hover intro={false}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Nombre</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Industria</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Zona</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Última actividad</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.map((empresa) => (
            <TableRow
              key={empresa.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onRowClick?.(empresa.id)}
            >
              <TableCell sx={{fontSize: "0.8rem"}}>{empresa.nombre}</TableCell>
              <TableCell sx={{fontSize: "0.8rem"}}>{empresa.industria}</TableCell>
              <TableCell sx={{fontSize: "0.8rem"}}>{empresa.zona}</TableCell>
              <TableCell sx={{fontSize: "0.8rem"}}>{empresa.fecha_ultima_actividad || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={empresas.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        labelRowsPerPage="Filas por página"
      />
    </SectionCard>
  );
};