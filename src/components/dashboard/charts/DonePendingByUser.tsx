import React from "react";
import { Bar } from "react-chartjs-2";
import { getActivitiesDoneVsPendingByUserLast30d } from "../../../utils/dashboard/adapters";

const DonePendingByUser: React.FC = () => {
  const { labels, datasets } = getActivitiesDoneVsPendingByUserLast30d();

  const data = {
    labels,
    datasets: datasets.map(ds => ({
      ...ds,
      borderRadius: 6,
      backgroundColor:
        ds.label === "Realizadas" ? "rgb(75, 192, 192)" : "rgb(192, 75, 75)",
    }))
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: { callbacks: { label: (ctx: any) => `${ctx.parsed.x} actividades` } },
    },
    scales: {
      x: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DonePendingByUser;
