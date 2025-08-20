import KpiStatCard from "../KpiStatCard";
import KpiSectionCard from "../../../ui/KpiSectionCard";
import { getKpi_DealsCounts_CurrentMonth } from "../../../../utils/dashboard/adapters";

export function KpiDealsOpenThisMonth() {
  const { abiertos } = getKpi_DealsCounts_CurrentMonth();
  return <KpiSectionCard><KpiStatCard title="Deals Abiertos (Mes)" value={abiertos} /></KpiSectionCard>;
}
export function KpiDealsWonThisMonth() {
  const { ganados } = getKpi_DealsCounts_CurrentMonth();
  return <KpiSectionCard><KpiStatCard title="Deals Ganados (Mes)" value={ganados} /></KpiSectionCard>;
}
export function KpiDealsLostThisMonth() {
  const { perdidos } = getKpi_DealsCounts_CurrentMonth();
  return <KpiSectionCard><KpiStatCard title="Deals Perdidos (Mes)" value={perdidos} /></KpiSectionCard>;
}