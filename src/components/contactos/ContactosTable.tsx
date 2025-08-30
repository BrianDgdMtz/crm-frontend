import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, TablePagination
} from "@mui/material";
import SectionCard from "../ui/SectionCard";

export interface ContactoTabla {
  id: number;
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
}

interface ContactosTableProps {
  contactos: ContactoTabla[];
  onRowClick?: (contactoId: number) => void;
  rowsPerPageOptions?: number[];
}

const ContactosTable: React.FC<ContactosTableProps> = ({
  contactos,
  onRowClick,
  rowsPerPageOptions = [10, 20, 50],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated = contactos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <SectionCard hover intro={false}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Nombre</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Empresa</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Correo</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Teléfono</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.map((contacto) => (
            <TableRow
              key={contacto.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onRowClick?.(contacto.id)}
            >
              <TableCell sx={{fontSize: "0.8rem"}}>{contacto.nombre}</TableCell>
              <TableCell sx={{fontSize: "0.8rem"}}>{contacto.empresa}</TableCell>
              <TableCell sx={{fontSize: "0.8rem"}}>{contacto.correo}</TableCell>
              <TableCell sx={{fontSize: "0.8rem"}}>{contacto.telefono}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={contactos.length}
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

export default ContactosTable;