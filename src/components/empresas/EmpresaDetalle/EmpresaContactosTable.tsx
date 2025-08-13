import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import type { Contacto } from '../../../mock/contactosMock';
import SectionCard from '../../ui/SectionCard';


interface EmpresaContactosTableProps {
  contactos: Contacto[];
  onRowClick?: (contactoId: number) => void;
}

const EmpresaContactosTable: React.FC<EmpresaContactosTableProps> = ({ contactos, onRowClick }) => (
    <SectionCard title='Contactos' hover intro>
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
    </SectionCard>
)

export default EmpresaContactosTable;