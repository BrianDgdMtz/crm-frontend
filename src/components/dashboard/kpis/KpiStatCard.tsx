import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  barColor?: string;
};

const KpiStatCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  barColor = "primary.main",
}) => {
  // Generar tendencia mockuada solo para fines visuales en el portfolio
  const isPositive = React.useMemo(() => Math.random() > 0.3, []);
  const trendValue = React.useMemo(() => Math.floor(Math.random() * 20) + 1, []);

  return (
    <Box sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle2" sx={{ fontSize: '0.85rem', color: 'text.secondary', fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: barColor, opacity: 0.8 }} />
      </Stack>
      
      <Box sx={{ mt: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={0.5} 
            sx={{ 
              color: isPositive ? 'success.main' : 'error.main',
              bgcolor: isPositive ? 'success.light' : 'error.light',
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              opacity: 0.9
            }}
          >
            {isPositive ? <TrendingUpRoundedIcon sx={{ fontSize: 16 }} /> : <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />}
            <Typography variant="caption" fontWeight="bold">
              {trendValue}%
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.disabled">
            {subtitle || "vs mes anterior"}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default KpiStatCard;
