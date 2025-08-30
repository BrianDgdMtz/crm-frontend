import React from "react";
import { 
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@mui/material";
import SectionCard from "../../ui/SectionCard";
import type { Actividad } from "../../../mock/actividadesMock";
import type { tipoActividad } from "../../../mock/tipoActividadMock";
import type { Usuario } from "../../../mock/usuariosMock";

interface ContactoActividadesTableProps {
  actividades: Actividad[];
  tiposActividad?: tipoActividad[];
  usuarios?: Usuario[];
  onRowClick?: (actividadId: number) => void;
}

const ContactoActividadesTable: React.FC<ContactoActividadesTableProps> = ({
  actividades,
  tiposActividad = [],
  usuarios = [],
  onRowClick,
}) => {
  return (
    <SectionCard title="Actividades" hover intro>
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
                <TableCell sx={{fontSize: "0.8rem"}}>{actividad.asunto}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{tiposActividad.find(t => t.id === actividad.tipo_id)?.nombre || "—"}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{usuarios.find(u => u.id === actividad.usuario_id)?.nombre || "—"}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{actividad.realizada ? "Realizada" : "Pendiente"}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{actividad.realizada ? actividad.fecha_realizacion : actividad.fecha_programada}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </SectionCard>
  );
};

export default ContactoActividadesTable;
