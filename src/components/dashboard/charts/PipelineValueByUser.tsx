import React from "react";
import { Bar } from "react-chartjs-2";
import { getPipelineValueByUser } from "../../../utils/dashboard/adapters";

const PipelineValueByUser: React.FC = () => {
  const { labels, data } = getPipelineValueByUser();

  const chartData = {
    labels,
    datasets: [{
      label: "MXN",
      data,
      backgroundColor: [
          "#EF5350",
          "#FFA726",
          "#AB47BC",
          "#66BB6A",
          "#42A5F5",
          "#EC407A",
          "#FFEB3B",
          "#8D6E63",
          "#26A69A",
          "#424242"
        ],
      borderRadius: 6
    }],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx: any) => `$${ctx.parsed.x.toLocaleString()} MXN` } },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { callback: (v: any) => `$${Number(v).toLocaleString()}` },
        title: { display: true, text: "Valor abierto (MXN)" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default PipelineValueByUser;
