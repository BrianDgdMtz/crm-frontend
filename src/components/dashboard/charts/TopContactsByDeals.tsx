import React from "react";
import { Bar } from "react-chartjs-2";
import { getTopContactsByDeals } from "../../../utils/dashboard/adapters";

const TopContactsByDeals: React.FC<{ limit?: number }> = ({ limit = 10 }) => {
  const { labels, data } = getTopContactsByDeals(limit);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Deals",
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
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.x} deals`,
        },
      },
    },
    scales: {
      x: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopContactsByDeals;