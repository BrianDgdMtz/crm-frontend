import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import type { Contacto } from '../../../mock/contactosMock';

interface EmpresaContactosTableProps {
  contactos: Contacto[];
  onRowClick?: (contactoId: number) => void;
}

const EmpresaContactosTable: React.FC<EmpresaContactosTableProps> = ({ contactos, onRowClick }) => (
    <TableContainer component={Paper} sx={{ boxShadow: "none"}}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><b>Nombre</b></TableCell>
                    <TableCell><b>Cargo</b></TableCell>
                    <TableCell><b>Telefono</b></TableCell>
                    <TableCell><b>Correo</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contactos.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Typography variant="body2" align="center">Sin contactos asociados</Typography>
                        </TableCell>
                    </TableRow>
                ) : (
                    contactos.map((contacto) => (
                        <TableRow
                            key={contacto.id}
                            hover
                            sx={{ cursor: "pointer" }}
                            onClick={() => onRowClick?.(contacto.id)}
                        >
                            <TableCell>{contacto.nombre}</TableCell>
                            <TableCell>{contacto.posicion}</TableCell>
                            <TableCell>{contacto.telefono}</TableCell>
                            <TableCell>{contacto.correo}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </TableContainer>
)

export default EmpresaContactosTable;