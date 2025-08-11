import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import type { Actividad } from "../../../mock/actividadesMock";
import type { tipoActividad } from "../../../mock/tipoActividadMock";
import type { Usuario } from "../../../mock/usuariosMock";

// Si quieres mostrar el nombre del tipo y del responsable, pasa los catálogos como props

interface ContactoActividadesTableProps {
  actividades: Actividad[];
  tiposActividad?: tipoActividad[];
  usuarios?: Usuario[];
  onRowClick?: (actividadId: number) => void
}

const ContactoActividadesTable: React.FC<ContactoActividadesTableProps> = ({
  actividades,
  tiposActividad = [],
  usuarios = [],
  onRowClick
}) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        Actividades
      </Typography>
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
                <Typography color="text.secondary" align="center">
                  Sin actividades registradas.
                </Typography>
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
                <TableCell>{actividad.asunto}</TableCell>
                <TableCell>
                  {tiposActividad.find((t) => t.id === actividad.tipo_id)?.nombre || "—"}
                </TableCell>
                <TableCell>
                  {usuarios.find((u) => u.id === actividad.usuario_id)?.nombre || "—"}
                </TableCell>
                <TableCell>
                  {actividad.realizada ? "Realizada" : "Pendiente"}
                </TableCell>
                <TableCell>
                  {actividad.realizada
                    ? actividad.fecha_realizacion
                    : actividad.fecha_programada}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ContactoActividadesTable;
