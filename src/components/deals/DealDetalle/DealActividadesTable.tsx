import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from "@mui/material";

import type { Actividad } from "../../../mock/actividadesMock";
import { tipoActividadMock } from "../../../mock/tipoActividadMock";
import { usuariosMock } from "../../../mock/usuariosMock";

interface DealActividadesTableProps {
  actividades: Actividad[];
  onRowClick?: (actividadId: number) => void
}

const DealActividadesTable: React.FC<DealActividadesTableProps> = ({ actividades, onRowClick }) => (
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
              <Typography variant="body2" align="center">Sin actividades relacionadas.</Typography>
            </TableCell>
          </TableRow>
        ) : (
          actividades.map((a) => {
            const tipo = tipoActividadMock.find(t => t.id === a.tipo_id)?.nombre || "—";
            const responsable = usuariosMock.find(u => u.id === a.usuario_id)?.nombre || "—";
            const estado = a.realizada ? "Realizada" : "Pendiente";
            const fecha = a.realizada && a.fecha_realizacion ? a.fecha_realizacion : a.fecha_programada;

            return (
              <TableRow
                key={a.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick?.(a.id)}
              >
                <TableCell>{a.asunto}</TableCell>
                <TableCell>{tipo}</TableCell>
                <TableCell>{responsable}</TableCell>
                <TableCell>{estado}</TableCell>
                <TableCell>{fecha}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DealActividadesTable;