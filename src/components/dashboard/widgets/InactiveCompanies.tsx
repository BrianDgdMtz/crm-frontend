import React from "react";
import { getInactiveCompanies } from "../../../utils/dashboard/adapters";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

type Props = { days?: number; limit?: number };

const InactiveCompanies: React.FC<Props> = ({ days = 60, limit = 10 }) => {
  const { rows } = getInactiveCompanies(days, limit);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {rows.length === 0 ? (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            No hay empresas con más de {days} días sin actividad.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ overflow: "auto" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Empresa</TableCell>
                <TableCell>Industria</TableCell>
                <TableCell>Zona</TableCell>
                <TableCell>Última actividad</TableCell>
                <TableCell align="right">Días inactivos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.empresa_id} hover>
                  <TableCell sx={{fontSize: "0.8rem"}}>{r.nombre}</TableCell>
                  <TableCell sx={{fontSize: "0.8rem"}}>{r.industria}</TableCell>
                  <TableCell sx={{fontSize: "0.8rem"}}>{r.zona}</TableCell>
                  <TableCell sx={{fontSize: "0.8rem"}}>{r.fecha_ultima_actividad}</TableCell>
                  <TableCell align="right" sx={{fontSize: "0.8rem"}}>{r.dias_inactivos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default InactiveCompanies;