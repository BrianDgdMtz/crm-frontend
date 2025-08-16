// src/components/dashboard/charts/PipelineValueByOwner.tsx
import { Bar } from "react-chartjs-2";
import { getPipelineValueByOwner } from "../../../utils/dashboard/adapters";

/**
 * Renderiza un gráfico de barras horizontales que muestra
 * el valor total del pipeline abierto por cada vendedor.
 */
export default function PipelineValueByOwner() {
  const { labels, data } = getPipelineValueByOwner();

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
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const v = Number(ctx.raw || 0);
            return `$${v.toLocaleString()} MXN`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (val: any) => `$${Number(val).toLocaleString()}`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}