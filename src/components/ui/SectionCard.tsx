import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import HoverableAppear from "./HoverableAppear";

type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
  hover?: boolean;           // hover flotante
  intro?: boolean;           // blur/expand al montar
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  hover = true,
  intro = true,
}) => {
  const card = (
    <Card
      variant="outlined"
      sx={{
        borderColor: "divider",
        boxShadow: 1, // 👈 mismo “peso” visual que los otros
        transition:
          "transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
        ...(hover && {
          "&:hover": {
            transform: "translateY(-5px) scale(1.01)",
            boxShadow: 6,
          },
        }),
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );

  // Aplica blur/expand + hover al propio Card
  return intro ? (
    <HoverableAppear asChild introDurationMs={250} hoverScale={1.01} hoverShadow={6}>
      {card}
    </HoverableAppear>
  ) : (
    card
  );
};

export default SectionCard;