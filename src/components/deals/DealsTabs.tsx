import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const EstadosDeals = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "abiertos", etiqueta: "Abiertos" },
    { valor: "ganados", etiqueta: "Ganados" },
    { valor: "perdidos", etiqueta: "Perdidos" },
];

export type EstadoTab = "todos" | "abiertos" | "ganados" | "perdidos";

interface DealsTabsProps {
    estadoSeleccionado: EstadoTab;
    onCambiarEstado: (valor: EstadoTab) => void;
}

const DealsTabs: React.FC<DealsTabsProps> = ({
    estadoSeleccionado,
    onCambiarEstado,
}) => {
    return (
        <Box mb={3}>
            <Tabs
                value={estadoSeleccionado}
                onChange={(_e, nuevoValor) =>
                    onCambiarEstado(nuevoValor as EstadoTab)
                }
                textColor="primary"
                indicatorColor="primary"
                aria-label="Filtro por estado de deals"
            >
                {EstadosDeals.map((estado) => (
                    <Tab
                        key={estado.valor}
                        value={estado.valor}
                        label={estado.etiqueta}
                        sx={{ fontWeight: "bold", minWidth: 120 }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default DealsTabs;