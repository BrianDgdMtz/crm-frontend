import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import type { Deal } from "../../../mock/dealsMock";
import { estadoDealsMock } from "../../../mock/estadoDealsMock";
import { etapaDealsMock } from "../../../mock/etapaDealsMock";

interface EmpresaDealsTableProps {
    deals: Deal[];
    onRowClick?: (dealId: number) => void
}

const EmpresaDealsTable: React.FC<EmpresaDealsTableProps> = ({
    deals,
    onRowClick
}) => (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><b>Deal</b></TableCell>
                    <TableCell><b>Monto</b></TableCell>
                    <TableCell><b>Estado</b></TableCell>
                    <TableCell><b>Etapa</b></TableCell>
                    <TableCell><b>Fecha cierre estimada</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {deals.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5}>
                    <Typography variant="body2" align="center">Sin deals vinculados.</Typography>
                    </TableCell>
                </TableRow>
                ) : (
                deals.map((deal) => (
                    <TableRow
                        key={deal.id}
                        hover
                        sx={{ cursor:"pointer" }}
                        onClick={() => onRowClick?.(deal.id)}
                    >
                        <TableCell>{deal.titulo}</TableCell>
                        <TableCell>${deal.monto_estimado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell>
                            {estadoDealsMock.find(e => e.id === deal.estado_id)?.nombre || "—"}
                        </TableCell>
                        <TableCell>
                            {etapaDealsMock.find(et => et.id === deal.etapa_id)?.nombre || "—"}
                        </TableCell>
                        <TableCell>{deal.fecha_cierre_esperada}</TableCell>
                    </TableRow>
                ))
                )}
            </TableBody>
        </Table>
    </TableContainer>
);

export default EmpresaDealsTable;