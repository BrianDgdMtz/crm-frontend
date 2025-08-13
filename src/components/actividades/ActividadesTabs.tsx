// src/components/actividades/ActividadesTabs.tsx
import React from "react";
import { Tabs, Tab } from "@mui/material";

export type TabKey = "todos" | "completadas" | "sin-realizar";

export interface ActividadesTabsProps {
  value: TabKey;
  onChange: (v: TabKey) => void;
  total?: number;
  completadas?: number;
  pendientes?: number;
}

const ActividadesTabs: React.FC<ActividadesTabsProps> = ({
  value,
  onChange,
  total = 0,
  completadas = 0,
  pendientes = 0,
}) => {
  return (
    <Tabs
      value={value}
      onChange={(_, v: TabKey) => onChange(v)}
      sx={{ mb: 2 }}
    >
      <Tab value="todos" label={`Todos (${total})`} sx={{ fontWeight: "bold", minWidth: 120}} />
      <Tab value="completadas" label={`Completadas (${completadas})`} sx={{ fontWeight: "bold", minWidth: 120}} />
      <Tab value="sin-realizar" label={`Sin realizar (${pendientes})`} sx={{ fontWeight: "bold", minWidth: 120}} />
    </Tabs>
  );
};

export default ActividadesTabs;
