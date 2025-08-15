import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Actividad } from "../../mock/actividadesMock";
import { contactosMock } from "../../mock/contactosMock";
import { empresasMock } from "../../mock/empresasMock";
import SectionCard from "../ui/SectionCard";

interface ActividadesTableProps {
  actividades: Actividad[];
  onRowClick?: (actividadId: number) => void;
}

const ActividadesTable: React.FC<ActividadesTableProps> = ({ actividades, onRowClick }) => {
  return (
    <SectionCard hover intro>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Tarea</b></TableCell>
            <TableCell><b>Contacto</b></TableCell>
            <TableCell><b>Empresa</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
            <TableCell><b>Fecha límite</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {actividades.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body2" align="center">
                  No hay actividades para mostrar.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            actividades.map((a) => {
              const contacto = contactosMock.find(c => c.id === a.contacto_id);
              const empresa = empresasMock.find(e => e.id === a.empresa_id);
              const estado = a.realizada ? "Completada" : "Pendiente";

              return (
                <TableRow
                  key={a.id}
                  hover
                  sx={{ cursor: onRowClick ? "pointer" : "default" }}
                  onClick={() => onRowClick?.(a.id)}
                >
                  <TableCell>{a.asunto}</TableCell>

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {contacto ? (
                      <Link
                        component={RouterLink}
                        to={`/contactos/${contacto.id}`}
                        underline="hover"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      >
                        {contacto.nombre}
                      </Link>
                    ) : "—"}
                  </TableCell>

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {empresa ? (
                      <Link
                        component={RouterLink}
                        to={`/empresas/${empresa.id}`}
                        underline="hover"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      >
                        {empresa.nombre}
                      </Link>
                    ) : "—"}
                  </TableCell>

                  <TableCell>{estado}</TableCell>
                  <TableCell>{a.fecha_programada || "—"}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </SectionCard>
  );
};

export default ActividadesTable;
