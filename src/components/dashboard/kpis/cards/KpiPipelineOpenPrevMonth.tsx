import KpiStatCard from "../KpiStatCard";
import KpiSectionCard from "../../../ui/KpiSectionCard";
import { getKpi_PipelineOpen_PrevMonth } from "../../../../utils/dashboard/adapters";
import { formatCurrencyShort } from "../../../../utils/dashboard/format";

export default function KpiPipelineOpenPrevMonth() {
  const { value } = getKpi_PipelineOpen_PrevMonth();
  return (
    <KpiSectionCard>
      <KpiStatCard
        title="Pipeline Mes Anterior"
        value={formatCurrencyShort(value)}
      />
    </KpiSectionCard>
  );
}