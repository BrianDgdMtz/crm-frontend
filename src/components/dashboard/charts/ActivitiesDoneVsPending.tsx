// src/components/dashboard/charts/ActivitiesDoneVsPending.tsx
import { Bar } from "react-chartjs-2";
import { getActivitiesDoneVsPendingByWeek } from "../../../utils/dashboard/adapters";

/**
 * Barras apiladas por semana (últimas 8 semanas):
 * Realizadas vs Pendientes.
 */
export default function ActivitiesDoneVsPending() {
  const { labels, datasets } = getActivitiesDoneVsPendingByWeek();

  // Dataset base proveniente del adapter + estilos mínimos
  const chartData = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      borderWidth: 1,
      borderRadius: 6,
      // Colores (puedes mapear a tu tema):
      backgroundColor:
        ds.label === "Realizadas" ? "#AB47BC" : "#EF5350",
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = Number(ctx.raw || 0);
            const i = ctx.dataIndex;
            const total = (chartData.datasets[0].data[i] as number) + (chartData.datasets[1].data[i] as number);
            const pct = total ? ((value / total) * 100).toFixed(1) : "0.0";
            return `${ctx.dataset.label}: ${value} (${pct}%)`;
          },
          footer: (items: any[]) => {
            if (!items?.length) return "";
            const i = items[0].dataIndex;
            const total =
              (chartData.datasets[0].data[i] as number) +
              (chartData.datasets[1].data[i] as number);
            return `Total: ${total}`;
          },
        },
      },
    },
    scales: {
      x: { stacked: true as const },
      y: {
        stacked: true as const,
        beginAtZero: true,
        ticks: { precision: 0 }, // enteros
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}