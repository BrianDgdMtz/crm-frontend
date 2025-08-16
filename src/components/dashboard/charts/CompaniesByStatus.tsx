// src/components/dashboard/charts/CompaniesByStatus.tsx
import { Pie } from "react-chartjs-2";
import { getCompaniesByStatus } from "../../../utils/dashboard/adapters";

/**
 * Muestra la distribución de empresas por estatus en un gráfico tipo Pie.
 * Usa los datos del adapter: { labels, data }.
 */
export default function CompaniesByStatus() {
  const { labels, data } = getCompaniesByStatus();
  const total = data.reduce((a, b) => a + (b || 0), 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Empresas",
        data,
        // Paleta básica (puedes mapearla a tu theme MUI si lo prefieres)
        backgroundColor: [
          "#42A5F5", // azul
          "#66BB6A", // verde
          "#EF5350", // rojo
          "#FFA726", // naranja
          "#AB47BC", // morado
          "#26C6DA", // cian
          "#D4E157", // lima
          "#8D6E63", // café
          "#EC407A", // rosa
          "#7E57C2", // púrpura
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
          label: (ctx: any) => {
            const value = Number(ctx.raw || 0);
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
            return `${ctx.label}: ${value} (${pct}%)`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}
