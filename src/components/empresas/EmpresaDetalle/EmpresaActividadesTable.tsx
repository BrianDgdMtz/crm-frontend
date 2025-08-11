import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import type { Actividad } from '../../../mock/actividadesMock';
import { tipoActividadMock } from '../../../mock/tipoActividadMock';
import { usuariosMock } from '../../../mock/usuariosMock';

interface EmpresaActividadesTableProps {
    actividades: Actividad[];
    onRowClick?: (actividadId: Number) => void
}

const EmpresaActividadesTable: React.FC<EmpresaActividadesTableProps> = ({
    actividades,
    onRowClick
}) => (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><b>Actividad</b></TableCell>
                    <TableCell><b>Tipo</b></TableCell>
                    <TableCell><b>Responsable</b></TableCell>
                    <TableCell><b>Estado</b></TableCell>
                    <TableCell><b>Fecha</b></TableCell>
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
                            <TableCell>
                                {actividad.asunto}
                            </TableCell>
                            <TableCell>
                                {tipoActividadMock.find(t => t.id === actividad.tipo_id)?.nombre || "—"}
                            </TableCell>
                            <TableCell>
                                {usuariosMock.find(u => u.id === actividad.usuario_id)?.nombre || "—"}
                            </TableCell>
                            <TableCell>
                                {actividad.realizada ? "Realizada" : "Pendiente"}
                            </TableCell>
                            <TableCell>
                                {actividad.realizada && actividad.fecha_realizacion ? actividad.fecha_realizacion : actividad.fecha_programada}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </TableContainer>
)

export default EmpresaActividadesTable;