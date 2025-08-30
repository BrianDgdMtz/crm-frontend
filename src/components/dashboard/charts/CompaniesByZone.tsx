import React from "react";
import { Pie } from "react-chartjs-2";
import { getCompaniesByZone } from "../../../utils/dashboard/adapters";

const CompaniesByZone: React.FC = () => {
  const { labels, data } = getCompaniesByZone();

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#AB47BC", "#42A5F5", "#8D6E63", "#26A69A"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false as const,
  plugins: {
    legend: { position: "bottom" as const,
      labels: {
        font: {
          size: 11,
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const val = Number(ctx.raw || 0);
          const pct = total ? ((val / total) * 100).toFixed(1) : "0.0";
          return `${ctx.label}: ${val} (${pct}%)`;
        },
      },
    },
    datalabels: {
      display: true,
      color: "#111",
      font: { weight: "bold" as const, size: 13 },
      anchor: "center" as const,
      align: "center" as const,
      offset: 8,
      clamp: true,
      formatter: (value: number, context: any) => {
        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
        const pct = total ? ((value / total) * 100).toFixed(1) : "0.0";
        return `${value}\n(${pct}%)`;
      },
    },
  },
};

  return <Pie data={chartData} options={options} />;
};

export default CompaniesByZone;
