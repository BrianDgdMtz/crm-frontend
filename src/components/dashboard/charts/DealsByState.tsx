// src/components/dashboard/charts/DealsByState.tsx
import { Doughnut } from "react-chartjs-2";
import { getDealsByState } from "../../../utils/dashboard/adapters";

/**
 * Muestra un gráfico tipo doughnut con el conteo de deals por estado
 * (ejemplo: Abierto, Ganado, Perdido).
 */
export default function DealsByState() {
  const { labels, data } = getDealsByState();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Deals",
        data,
        backgroundColor: [
          "#EF5350",
          "#FFA726",
          "#AB47BC",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.raw as number;
            return `${ctx.label}: ${value} deals`;
          },
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
