import KpiStatCard from "../KpiStatCard";
import { getKpi_Activities_DoneVsPending_CurrentMonth } from "../../../../utils/dashboard/adapters";

export default function KpiActivitiesPendingThisMonth() {
  const { pendientes } = getKpi_Activities_DoneVsPending_CurrentMonth();
  return <KpiStatCard title="Actividades Pendientes (Mes)" value={pendientes} />;
}