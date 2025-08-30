import React from "react";
import { Line } from "react-chartjs-2";
import { getClosedDealsByMonth } from "../../../utils/dashboard/adapters";

const ClosedDealsTrend: React.FC = () => {
  const { labels, datasets } = getClosedDealsByMonth();

  const data = {
    labels,
    datasets: [
      {
        label: datasets[0].label,
        data: datasets[0].data,
        tension: 0.3,
        pointRadius: 3,
        borderWidth: 2,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: datasets[1].label,
        data: datasets[1].data,
        tension: 0.3,
        pointRadius: 3,
        borderWidth: 2,
        fill: false,
        borderColor: 'rgb(192, 75, 75)',
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
          label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0,
          font: {
            size: 11,
          },
        },
        title: { display: true, text: "Deals" },
      },
      x: {
        title: { display: true, text: "Mes (YYYY-MM)" }, ticks: { precision: 0,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ClosedDealsTrend;
