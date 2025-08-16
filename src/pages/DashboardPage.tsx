// src/pages/DashboardPage.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "../utils/chartjs"; // registro global

import SectionCard from "../components/ui/SectionCard";

import PipelineByStage from "../components/dashboard/charts/PipelineByStage";
import DealsByState from "../components/dashboard/charts/DealsByState";
import PipelineValueByOwner from "../components/dashboard/charts/PipelineValueByOwner";
import ActivitiesByType from "../components/dashboard/charts/ActivitiesByType";
import CompaniesByStatus from "../components/dashboard/charts/CompaniesByStatus";
import ActivitiesDoneVsPending from "../components/dashboard/charts/ActivitiesDoneVsPending";
import TopCompaniesByOpenValue from "../components/dashboard/charts/TopCompaniesByOpenValue";

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
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card title="Valor de deals por etapa">
            <PipelineByStage />
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card title="Deals por estado">
            <DealsByState />
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card title="Valor por vendedor">
            <PipelineValueByOwner />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Actividades por tipo (últimos 30 días)">
            <ActivitiesByType />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Empresas por estatus">
            <CompaniesByStatus />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Realizadas vs pendientes (8 semanas)">
            <ActivitiesDoneVsPending />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card title="Top 5 empresas por valor abierto">
            <TopCompaniesByOpenValue />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}