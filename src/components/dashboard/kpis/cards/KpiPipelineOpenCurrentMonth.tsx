import KpiStatCard from "../KpiStatCard";
import KpiSectionCard from "../../../ui/KpiSectionCard";
import { getKpi_PipelineOpen_CurrentMonth } from "../../../../utils/dashboard/adapters";
import { formatCurrencyShort } from "../../../../utils/dashboard/format";

export default function KpiPipelineOpenCurrentMonth() {
  const { value } = getKpi_PipelineOpen_CurrentMonth();
  return (
    <KpiSectionCard>
      <KpiStatCard
        title="Pipeline Mes Actual"
        value={formatCurrencyShort(value)}
      />
    </KpiSectionCard>
  );
}