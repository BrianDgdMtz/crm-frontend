import React from "react";
import { Bar } from "react-chartjs-2";
import { getPipelineValueByUserZone } from "../../../utils/dashboard/adapters";

const PipelineValueByUserZone: React.FC = () => {
  const { labels, data } = getPipelineValueByUserZone();

  const chartData = {
    labels,
    datasets: [{
      label: "MXN",
      data,
      backgroundColor: [
          "#AB47BC",
          "#42A5F5",
          "#8D6E63",
          "#26A69A",
        ],
      borderRadius: 6
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx: any) => `$${ctx.parsed.y.toLocaleString()} MXN` } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v: any) => `$${Number(v).toLocaleString()}` },
        title: { display: true, text: "Valor abierto (MXN)" },
      },
      x: { title: { display: true, text: "Zona del usuario" } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default PipelineValueByUserZone;
