import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import type { Actividad } from '../../../mock/actividadesMock';
import { tipoActividadMock } from '../../../mock/tipoActividadMock';
import { usuariosMock } from '../../../mock/usuariosMock';
import SectionCard from '../../ui/SectionCard';

interface EmpresaActividadesTableProps {
    actividades: Actividad[];
    onRowClick?: (actividadId: Number) => void
}

const EmpresaActividadesTable: React.FC<EmpresaActividadesTableProps> = ({
    actividades,
    onRowClick
}) => (
    <SectionCard title='Actividades' hover intro>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Actividad</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Tipo</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Responsable</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Estado</b></TableCell>
                    <TableCell sx={{fontSize: "0.8rem"}}><b>Fecha</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {actividades.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Typography variant="body2" align="center">Sin actividades asociadas</Typography>
                        </TableCell>
                    </TableRow>
                ) : (
                    actividades.map((actividad) => (
                        <TableRow
                            key={actividad.id}
                            hover
                            sx={{ cursor: "pointer" }}
                            onClick={() => onRowClick?.(actividad.id)}
                        >
                            <TableCell sx={{fontSize: "0.8rem"}}>
                                {actividad.asunto}
                            </TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>
                                {tipoActividadMock.find(t => t.id === actividad.tipo_id)?.nombre || "—"}
                            </TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>
                                {usuariosMock.find(u => u.id === actividad.usuario_id)?.nombre || "—"}
                            </TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>
                                {actividad.realizada ? "Realizada" : "Pendiente"}
                            </TableCell>
                            <TableCell sx={{fontSize: "0.8rem"}}>
                                {actividad.realizada && actividad.fecha_realizacion ? actividad.fecha_realizacion : actividad.fecha_programada}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </SectionCard>
)

export default EmpresaActividadesTable;