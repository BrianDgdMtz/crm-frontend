import React from "react";
import { Line } from "react-chartjs-2";
import { getNewContactsByMonth } from "../../../utils/dashboard/adapters";

const NewContactsTrend: React.FC = () => {
  const { labels, datasets } = getNewContactsByMonth();

  const data = {
    labels,
    datasets: datasets.map(ds => ({
      ...ds,
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y} contactos`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
        title: { display: true, text: "Contactos" },
      },
      x: {
        title: { display: true, text: "Mes (YYYY-MM)" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default NewContactsTrend;