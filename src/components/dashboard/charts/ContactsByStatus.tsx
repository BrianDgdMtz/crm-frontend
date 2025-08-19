import React from "react";
import { Doughnut } from "react-chartjs-2";
import { getContactsByStatus } from "../../../utils/dashboard/adapters";

const ContactsByStatus: React.FC = () => {
  const { labels, data } = getContactsByStatus();

  const chartData = {
    labels,
    datasets: [
      {
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

  return <Doughnut data={chartData} options={options} />;
};

export default ContactsByStatus;