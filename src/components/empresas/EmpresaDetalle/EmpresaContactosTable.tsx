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
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Nombre</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Cargo</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Telefono</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Correo</b></TableCell>
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
                            <TableCell sx={{fontSize: "0.8rem"}}>{contacto.nombre}</TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>{contacto.posicion}</TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>{contacto.telefono}</TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>{contacto.correo}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </SectionCard>
)

export default EmpresaContactosTable;