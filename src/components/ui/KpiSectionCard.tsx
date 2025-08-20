import React from "react";
import { Paper } from "@mui/material";
import HoverableAppear from "./HoverableAppear";

type Props = {
  children: React.ReactNode;
  hover?: boolean;
  intro?: boolean;
  elevation?: number;
  sx?: any;
};

const KpiSectionCard: React.FC<Props> = ({
  children,
  hover = true,
  intro = true,
  elevation = 2,
  sx,
}) => {
  const card = (
    <Paper
      elevation={elevation}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        p: 0,
        transition:
          "transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
        ...(hover && {
          "&:hover": {
            transform: "translateY(-5px) scale(1.01)",
            boxShadow: 6,
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Paper>
  );

  return intro ? (
    <HoverableAppear asChild introDurationMs={250} hoverScale={1.01} hoverShadow={6}>
      {card}
    </HoverableAppear>
  ) : (
    card
  );
};

export default KpiSectionCard;
