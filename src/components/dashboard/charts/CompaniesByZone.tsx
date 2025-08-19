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
        backgroundColor: [
          "#AB47BC",
          "#42A5F5",
          "#8D6E63",
          "#26A69A",
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
          label: (ctx: any) => `${ctx.label}: ${ctx.raw}`,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default CompaniesByZone;