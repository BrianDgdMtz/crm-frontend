import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from "@mui/material";
import { etapaDealsMock } from "../../../mock/etapaDealsMock";
import { usuariosMock } from "../../../mock/usuariosMock";
import type { HistorialEtapaDeal } from "../../../mock/historialEtapaDealsMock";
import SectionCard from "../../ui/SectionCard";

interface DealHistorialTableProps {
  items: HistorialEtapaDeal[];
}

const DealHistorialTable: React.FC<DealHistorialTableProps> = ({ items }) => (
  <SectionCard title="Historial del deal" hover intro>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{fontSize: "0.8rem"}}><b>Fecha</b></TableCell>
          <TableCell sx={{fontSize: "0.8rem"}}><b>De</b></TableCell>
          <TableCell sx={{fontSize: "0.8rem"}}><b>A</b></TableCell>
          <TableCell sx={{fontSize: "0.8rem"}}><b>Usuario</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant="body2" align="center">Sin cambios de etapa.</Typography>
            </TableCell>
          </TableRow>
        ) : (
          items.map((h) => {
            const etapaAnterior = h.etapa_anterior_id
              ? etapaDealsMock.find(e => e.id === h.etapa_anterior_id)?.nombre
              : "Inicio";
            const etapaNueva = etapaDealsMock.find(e => e.id === h.etapa_nueva_id)?.nombre || "—";
            const usuario = usuariosMock.find(u => u.id === h.usuario_id)?.nombre || "—";
            return (
              <TableRow key={h.id}>
                <TableCell sx={{fontSize: "0.8rem"}}>{h.fecha}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{etapaAnterior || "—"}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{etapaNueva}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{usuario}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </SectionCard>
);

export default DealHistorialTable;
