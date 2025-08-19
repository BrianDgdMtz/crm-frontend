import React from "react";
import { Bar } from "react-chartjs-2";
import { getWonLostByUser } from "../../../utils/dashboard/adapters";

const WonLostByUser: React.FC = () => {
  const { labels, datasets } = getWonLostByUser();

  const data = {
    labels,
    datasets: datasets.map(ds => ({
      ...ds,
      borderRadius: 6,
      backgroundColor:
        ds.label === "Ganados" ? "rgb(75, 192, 192)" : "rgb(192, 75, 75)",
     }))
    };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: { callbacks: { label: (ctx: any) => `${ctx.parsed.y} deals` } },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return <Bar data={data} options={options} />;
};

export default WonLostByUser;
