import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography,
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
}

const DealsTable: React.FC<DealsTableProps> = ({ deals, onSeleccionarDeal }) => (
  <SectionCard hover intro>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><b>Deal</b></TableCell>
          <TableCell><b>Empresa</b></TableCell>
          <TableCell><b>Monto estimado</b></TableCell>
          <TableCell><b>Etapa</b></TableCell>
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
          deals.map((deal) => (
            <TableRow
              key={deal.id}
              hover
              sx={{ cursor: onSeleccionarDeal ? "pointer" : "default" }}
              onClick={() => onSeleccionarDeal && onSeleccionarDeal(deal.id)}
            >
              <TableCell>{deal.titulo}</TableCell>
              <TableCell>{deal.nombreEmpresa ?? ""}</TableCell>
              <TableCell>
                {deal.monto_estimado.toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  maximumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell>{deal.nombreEtapa}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </SectionCard>
);

export default DealsTable;