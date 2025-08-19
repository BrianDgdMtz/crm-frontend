import { Bar } from "react-chartjs-2";
import { getPipelineByStage } from "../../../utils/dashboard/adapters";

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