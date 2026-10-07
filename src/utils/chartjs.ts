import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Desactivar por defecto en todas las gráficas el plugin de etiquetas
ChartJS.defaults.set("plugins.datalabels", {
  display: false,
});

// Animaciones más fluidas para gráficas sin romper interactividad
if (ChartJS.defaults.animation && typeof ChartJS.defaults.animation === 'object') {
  ChartJS.defaults.animation.duration = 1200;
  // @ts-ignore
  ChartJS.defaults.animation.easing = 'easeOutQuart';
}
