import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import type { Actividad } from "../../../mock/actividadesMock";
import { tipoActividadMock } from "../../../mock/tipoActividadMock";
import { usuariosMock } from "../../../mock/usuariosMock";
import SectionCard from "../../ui/SectionCard";

interface DealActividadesTableProps {
  actividades: Actividad[];
  onRowClick?: (actividadId: number) => void
}

const DealActividadesTable: React.FC<DealActividadesTableProps> = ({ actividades, onRowClick }) => (
  <SectionCard title="Actividades relacionadas" hover intro>
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
                <TableCell sx={{fontSize: "0.8rem"}}>{a.asunto}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{tipo}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{responsable}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{estado}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{fecha}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </SectionCard>
);

export default DealActividadesTable;