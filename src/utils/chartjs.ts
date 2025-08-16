import {
  Chart as ChartJS,
  CategoryScale, LinearScale, TimeScale,
  BarElement, LineElement, ArcElement, PointElement,
  Tooltip, Legend, Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, TimeScale,
  BarElement, LineElement, ArcElement, PointElement,
  Tooltip, Legend, Filler
);