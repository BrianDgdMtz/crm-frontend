import KpiStatCard from "../KpiStatCard";
import { getKpi_NewActiveCompanies_CurrentMonth } from "../../../../utils/dashboard/adapters";

export default function KpiNewActiveCompaniesThisMonth() {
  const { value } = getKpi_NewActiveCompanies_CurrentMonth();
  return <KpiStatCard title="Empresas Activas Nuevas (Mes)" value={value} />;
}