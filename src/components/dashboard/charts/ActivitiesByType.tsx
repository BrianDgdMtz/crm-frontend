import { Line } from "react-chartjs-2";
import { getActivitiesByTypeLast30d } from "../../../utils/dashboard/adapters";

/**
 * Línea temporal de actividades por tipo (últimos 30 días).
 * Usa labels con fechas (YYYY-MM-DD) y múltiples series (una por tipo).
 */
export default function ActivitiesByType() {
  const { labels, datasets } = getActivitiesByTypeLast30d();

  // Opcional: estilizar suavemente las líneas/points
  const chartData = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      tension: 0.3,       // curva suave
      pointRadius: 2,     // puntos discretos
      fill: false,        // sin relleno por defecto
      borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const v = Number(ctx.raw || 0);
            return `${ctx.dataset.label}: ${v} actividades`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // enteros
          // stepSize: 1, // descomenta si quieres forzar pasos de 1 en datasets pequeños
        },
      },
      x: {
        // Si prefieres eje temporal real, instala un adapter de fechas
        // (ej. chartjs-adapter-date-fns) y cambia a type: "time".
        // type: "time" as const,
        // time: { unit: "day" as const },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
