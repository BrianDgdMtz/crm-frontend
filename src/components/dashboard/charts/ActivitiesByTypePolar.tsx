import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getActivitiesByTypePolar } from "../../../utils/dashboard/adapters";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const ActivitiesByTypePolar: React.FC = () => {
  const { labels, datasets } = getActivitiesByTypePolar();

  const data = {
    labels,
    datasets: [
      {
        ...datasets[0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${context.label}: ${value} actividades`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "340px" }}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default ActivitiesByTypePolar;
