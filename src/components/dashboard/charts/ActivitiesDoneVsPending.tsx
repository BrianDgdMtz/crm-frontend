import { Bar } from "react-chartjs-2";
import { getActivitiesDoneVsPendingByWeek } from "../../../utils/dashboard/adapters";

export default function ActivitiesDoneVsPending() {
  const { labels, datasets } = getActivitiesDoneVsPendingByWeek();
  const chartData = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor:
        ds.label === "Realizadas" ? "rgb(75, 192, 192)" : "rgb(192, 75, 75)",
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
        ticks: { precision: 0 },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}