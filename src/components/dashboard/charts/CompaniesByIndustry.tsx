import React from "react";
import { Bar } from "react-chartjs-2";
import { getCompaniesByIndustry } from "../../../utils/dashboard/adapters";

const CompaniesByIndustry: React.FC = () => {
  const { labels, data } = getCompaniesByIndustry();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Empresas",
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
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y} empresas`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true,
        ticks:
        {
          precision: 0,
          font: {
            size: 11
          }
        },
        title:
        {
          display: true, text: "Empresas"
        }
      },
      x: {
        ticks:
        {
          precision: 0,
          font: {
            size: 11
          }
        },
        title: { display: true, text: "Industria" } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CompaniesByIndustry;