import React from "react";
import { Box, Typography } from "@mui/material";

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
  barColor = "#000",
}) => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: barColor,
          color: "white",
          px: 1.5,
          py: 0.5,
          textAlign: "center",
          fontWeight: 800,
          letterSpacing: 0.5,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontSize: 13, fontWeight: 800 }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          px: 2,
          py: 2,
          textAlign: "center",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.05, fontSize: 21 }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>
        {!!subtitle && (
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default KpiStatCard;
