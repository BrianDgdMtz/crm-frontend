import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import SectionCard from "../../ui/SectionCard";
import type { Deal } from "../../../mock/dealsMock";
import type { estadoDeal } from "../../../mock/estadoDealsMock";
import type { etapaDeal } from "../../../mock/etapaDealsMock";

interface ContactoDealsTableProps {
  deals: Deal[];
  estadoDeals?: estadoDeal[];
  etapaDeals?: etapaDeal[];
  onRowClick?: (dealId: number) => void
}

const ContactoDealsTable: React.FC<ContactoDealsTableProps> = ({
  deals,
  estadoDeals = [],
  etapaDeals = [],
  onRowClick
}) => {
  return (
    <SectionCard title="Deals vinculados" hover intro>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Deal</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Monto</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Estado</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Etapa</b></TableCell>
            <TableCell sx={{fontSize: "0.8rem"}}><b>Fecha de cierre estimada</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography color="text.secondary" align="center">
                  Sin deals vinculados.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            deals.map((deal) => (
              <TableRow
                key={deal.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick?.(deal.id)}
              >
                <TableCell sx={{fontSize: "0.8rem"}}>{deal.titulo}</TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>
                  {deal.monto_estimado?.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  })}
                </TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>
                  {estadoDeals.find((e) => e.id === deal.estado_id)?.nombre || "—"}
                </TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>
                  {etapaDeals.find((e) => e.id === deal.etapa_id)?.nombre || "—"}
                </TableCell>
                <TableCell sx={{fontSize: "0.8rem"}}>{deal.fecha_cierre_esperada}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </SectionCard>
  );
};

export default ContactoDealsTable;
