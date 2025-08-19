import { Pie } from "react-chartjs-2";
import { getCompaniesByStatus } from "../../../utils/dashboard/adapters";

export default function CompaniesByStatus() {
  const { labels, data } = getCompaniesByStatus();
  const total = data.reduce((a, b) => a + (b || 0), 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Empresas",
        data,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#EF5350",
          "#FFA726",
          "#AB47BC",
          "#26C6DA",
          "#D4E157",
          "#8D6E63",
          "#EC407A",
          "#7E57C2",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = Number(ctx.raw || 0);
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
            return `${ctx.label}: ${value} (${pct}%)`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}
