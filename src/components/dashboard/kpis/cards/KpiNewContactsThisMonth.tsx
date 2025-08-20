import KpiStatCard from "../KpiStatCard";
import { getKpi_NewContacts_CurrentMonth } from "../../../../utils/dashboard/adapters";

export default function KpiNewContactsThisMonth() {
  const { value } = getKpi_NewContacts_CurrentMonth();
  return <KpiStatCard title="Contactos Nuevos (Mes)" value={value} />;
}