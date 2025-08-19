import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Link,
  TablePagination, Box
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Actividad } from "../../mock/actividadesMock";
import { contactosMock } from "../../mock/contactosMock";
import { empresasMock } from "../../mock/empresasMock";
import SectionCard from "../ui/SectionCard";

interface ActividadesTableProps {
  actividades: Actividad[];
  onRowClick?: (actividadId: number) => void;
  rowsPerPageOptions?: number[];
}

const ActividadesTable: React.FC<ActividadesTableProps> = ({
  actividades,
  onRowClick,
  rowsPerPageOptions = [10, 20, 50],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated = actividades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <SectionCard hover intro={false}>
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
            paginated.map((a) => {
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TablePagination
          component="div"
          count={actividades.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage="Filas por página"
        />
      </Box>
    </SectionCard>
  );
};

export default ActividadesTable;