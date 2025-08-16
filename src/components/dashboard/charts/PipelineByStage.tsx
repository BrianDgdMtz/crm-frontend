// src/components/dashboard/charts/PipelineByStage.tsx
import { Bar } from "react-chartjs-2";
import { getPipelineByStage } from "../../../utils/dashboard/adapters";

/**
 * Renderiza el valor total del pipeline por etapa (barras).
 * Si prefieres ver el conteo de deals por etapa:
 *   - usa { datasetsCount } del adapter en lugar de { datasetsMonto }.
 */
export default function PipelineByStage() {
  const { labels, datasetsMonto } = getPipelineByStage();

  const data = {
    labels,
    datasets: datasetsMonto.map(ds => ({
      ...ds,
      backgroundColor: [
          "#EF5350",
          "#FFA726",
          "#AB47BC",
        ],
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: {
        callbacks: {
          // Ejemplo de formateo a moneda (ajústalo a MXN si quieres):
          label: (ctx: any) => {
            const v = Number(ctx.raw || 0);
            return `${ctx.dataset.label}: $${v.toLocaleString()}`;
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
      },
    },
  };

  return <Bar data={data} options={options} />;
}