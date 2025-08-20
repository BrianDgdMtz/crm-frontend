import KpiStatCard from "../KpiStatCard";
import { getKpi_Activities_DoneVsPending_CurrentMonth } from "../../../../utils/dashboard/adapters";

export default function KpiActivitiesDoneThisMonth() {
  const { realizadas } = getKpi_Activities_DoneVsPending_CurrentMonth();
  return <KpiStatCard title="Actividades Realizadas (Mes)" value={realizadas} />;
}