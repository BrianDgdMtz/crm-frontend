import KpiStatCard from "../KpiStatCard";
import KpiSectionCard from "../../../ui/KpiSectionCard";
import { getKpi_PipelineOpen_Total } from "../../../../utils/dashboard/adapters";
import { formatCurrencyShort } from "../../../../utils/dashboard/format";

export default function KpiPipelineOpenTotal() {
  const { total } = getKpi_PipelineOpen_Total();
  return (
    <KpiSectionCard>
      <KpiStatCard
        title="Pipeline Abierto"
        value={formatCurrencyShort(total)}
      />
    </KpiSectionCard>
  );
}