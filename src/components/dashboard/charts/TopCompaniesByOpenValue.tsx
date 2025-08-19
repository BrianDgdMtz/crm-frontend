import { Bar } from "react-chartjs-2";
import { getTopCompaniesByOpenValue } from "../../../utils/dashboard/adapters";

export default function TopCompaniesByOpenValue({ limit = 5 }: { limit?: number }) {
  const { labels, data } = getTopCompaniesByOpenValue(limit);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Valor abierto",
        data,
        backgroundColor: [
          "#AB47BC",
          "#42A5F5",
          "#8D6E63",
          "#26A69A",
          "#EC407A",
        ],
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
