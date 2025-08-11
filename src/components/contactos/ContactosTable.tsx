import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
//import type { ContactoConEmpresa } from "../../pages/ContactosPage";

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
}

const ContactosTable: React.FC<ContactosTableProps> = ({
  contactos,
  onRowClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Empresa</b></TableCell>
            <TableCell><b>Correo</b></TableCell>
            <TableCell><b>Teléfono</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactos.map((contacto) => (
            <TableRow
              key={contacto.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onRowClick?.(contacto.id)}
            >
              <TableCell>{contacto.nombre}</TableCell>
              <TableCell>{contacto.empresa}</TableCell>
              <TableCell>{contacto.correo}</TableCell>
              <TableCell>{contacto.telefono}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactosTable;