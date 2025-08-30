import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography, TablePagination
} from "@mui/material";
import SectionCard from "../ui/SectionCard";

export interface DealTabla {
  id: number;
  titulo: string;
  empresa_id: number;
  monto_estimado: number;
  nombreEmpresa?: string;
  nombreEtapa: string;
  nombreEstado?: string;
}

interface DealsTableProps {
  deals: DealTabla[];
  onSeleccionarDeal?: (dealId: number) => void;
  rowsPerPageOptions?: number[];
}

const DealsTable: React.FC<DealsTableProps> = ({
  deals,
  onSeleccionarDeal,
  rowsPerPageOptions = [10, 20, 50],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated =
    deals.length > 0
      ? deals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : [];

  return (
    <SectionCard hover intro={false}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Deal</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Empresa</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Monto estimado</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Etapa</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography color="text.secondary" align="center">
                  No hay deals para mostrar.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((deal) => (
              <TableRow
                key={deal.id}
                hover
                sx={{ cursor: onSeleccionarDeal ? "pointer" : "default" }}
                onClick={() => onSeleccionarDeal?.(deal.id)}
              >
                <TableCell sx={{fontSize: "0.8rem"}}>{deal.titulo}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{deal.nombreEmpresa ?? ""}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>
                  {deal.monto_estimado.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                    maximumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{deal.nombreEtapa}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={deals.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        labelRowsPerPage="Filas por página"
      />
    </SectionCard>
  );
};

export default DealsTable;