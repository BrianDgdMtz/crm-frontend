import React from "react";

type Props = {
  title: string;
  value: string | number;
  deltaPct?: number;
  icon?: React.ReactNode;
  subtitle?: string;
};

export default function KpiCard({ title, value, deltaPct, icon, subtitle }: Props) {
  const deltaColor =
    deltaPct === undefined ? "" : deltaPct >= 0 ? "text-green-600" : "text-red-600";
  const deltaSign = deltaPct === undefined ? "" : deltaPct >= 0 ? "+" : "";

  return (
    <div className="rounded-2xl shadow p-4 bg-white flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{typeof value === "number" ? value.toLocaleString() : value}</div>
        {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
      </div>
      {deltaPct !== undefined && (
        <div className={`text-sm font-medium ${deltaColor}`}>
          {deltaSign}{deltaPct.toFixed(1)}%
        </div>
      )}
    </div>
  );
}