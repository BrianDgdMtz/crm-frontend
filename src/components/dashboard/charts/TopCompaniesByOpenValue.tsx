// src/components/dashboard/charts/TopCompaniesByOpenValue.tsx
import { Bar } from "react-chartjs-2";
import { getTopCompaniesByOpenValue } from "../../../utils/dashboard/adapters";

/**
 * Muestra el Top N de empresas por valor abierto (suma de montos de deals en estado "Abierto").
 * El adapter por defecto regresa Top 5, pero puedes pasar otro límite si lo prefieres.
 */
export default function TopCompaniesByOpenValue({ limit = 5 }: { limit?: number }) {
  const { labels, data } = getTopCompaniesByOpenValue(limit);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Valor abierto",
        data,
        backgroundColor: "#42A5F5",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const v = Number(ctx.raw || 0);
            return `Valor abierto: $${v.toLocaleString()} MXN`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val: any) => `$${Number(val).toLocaleString()}`,
        },
        title: { display: true, text: "Monto (MXN)" },
      },
      x: {
        ticks: { maxRotation: 0, minRotation: 0 },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
