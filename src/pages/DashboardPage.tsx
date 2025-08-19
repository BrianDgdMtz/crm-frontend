import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "../utils/chartjs";
import SectionCard from "../components/ui/SectionCard";
import PipelineByStage from "../components/dashboard/charts/PipelineByStage";
import ActivitiesByTypePolar from "../components/dashboard/charts/ActivitiesByTypePolar";
import ActivitiesDoneVsPending from "../components/dashboard/charts/ActivitiesDoneVsPending";
import TopCompaniesByOpenValue from "../components/dashboard/charts/TopCompaniesByOpenValue";
import ClosedDealsTrend from "../components/dashboard/charts/ClosedDealsTrend";
import NewContactsTrend from "../components/dashboard/charts/NewContactsTrend";
import TopContactsByDeals from "../components/dashboard/charts/TopContactsByDeals";
import CompaniesByIndustry from "../components/dashboard/charts/CompaniesByIndustry";
import CompaniesByZone from "../components/dashboard/charts/CompaniesByZone";
import InactiveCompanies from "../components/dashboard/widgets/InactiveCompanies";
import ActivitiesByUser from "../components/dashboard/charts/ActivitiesByUser";
import DonePendingByUser from "../components/dashboard/charts/DonePendingByUser";
import PipelineValueByUser from "../components/dashboard/charts/PipelineValueByUser";
import PipelineValueByUserZone from "../components/dashboard/charts/PipelineValueByUserZone";
import WonLostByUser from "../components/dashboard/charts/WonLostByUser";

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <SectionCard title={title}>
    <Box sx={{ height: 320 }}>{children}</Box>
  </SectionCard>
);

export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Valor de deals por etapa">
            <PipelineByStage />
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Deals ganados / perdidos por vendedor">
            <WonLostByUser />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card title="Top 5 empresas por valor abierto">
            <TopCompaniesByOpenValue />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Evolución mensual de deals cerrados (ganados / perdidos)">
            <ClosedDealsTrend />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Valor del pipeline por vendedor">
            <PipelineValueByUser />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Valor del pipeline por zona">
            <PipelineValueByUserZone />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Top 10 contactos con más deals">
            <TopContactsByDeals limit={10} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Contactos nuevos por mes">
            <NewContactsTrend />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Empresas por industria">
            <CompaniesByIndustry />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Empresas por zona">
            <CompaniesByZone />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Actividades por tipo (últimos 30 días)">
            <ActivitiesByTypePolar />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Realizadas vs pendientes general (últimas 8 semanas)">
            <ActivitiesDoneVsPending />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Actividades por vendedor (últimos 30 días)">
            <ActivitiesByUser />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Realizadas vs pendientes por vendedor (últimos 30 días)">
            <DonePendingByUser />
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card title="Empresas sin actividad">
            <InactiveCompanies days={60} limit={10} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}