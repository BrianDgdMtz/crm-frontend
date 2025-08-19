import React from "react";
import { Bar } from "react-chartjs-2";
import { getActivitiesByUserLast30d } from "../../../utils/dashboard/adapters";

const ActivitiesByUser: React.FC = () => {
  const { labels, data } = getActivitiesByUserLast30d();

  const chartData = {
    labels,
    datasets: [{
      label: "Actividades",
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
      borderRadius: 6 }],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx: any) => `${ctx.parsed.x} actividades` } },
    },
    scales: {
      x: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ActivitiesByUser;