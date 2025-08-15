import React, { useEffect, useRef, useState, cloneElement, isValidElement } from "react";
import { Box, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { keyframes } from "@mui/system";

type HoverableAppearProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  className?: string;
  asChild?: boolean;

  intro?: boolean;
  introDurationMs?: number;
  introBlurPx?: number;
  introFromScale?: number;

  hoverEnabled?: boolean;
  hoverTranslateY?: number;
  hoverScale?: number;
  hoverShadow?: number | string;

  once?: boolean;
};

const HoverableAppear: React.FC<HoverableAppearProps> = ({
  children,
  sx,
  className,
  asChild = true,
  intro = true,
  introDurationMs = 250,
  introBlurPx = 12,
  introFromScale = 0,
  hoverEnabled = true,
  hoverTranslateY = -5,
  hoverScale = 1.01,
  hoverShadow = 6,
  once = true,
}) => {
  const theme = useTheme();
  const didPlayRef = useRef(false);
  const [playingIntro, setPlayingIntro] = useState(intro && (!once || !didPlayRef.current));

  useEffect(() => {
    if (intro && (!once || !didPlayRef.current)) setPlayingIntro(true);
  }, [intro, once]);

  const blurInExpand = keyframes`
    0%   { transform: scale(${introFromScale}); filter: blur(${introBlurPx}px); opacity: 0; }
    100% { transform: scale(1);                filter: blur(0);                opacity: 1; }
  `;

  const animatedSx: SxProps<Theme> = {
    ...(intro && playingIntro
      ? { animation: `${blurInExpand} ${introDurationMs}ms linear both`, willChange: "transform, filter, opacity" }
      : {}),
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
    transition: "transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
    ...(hoverEnabled ? {
      "&:hover": {
        transform: `translateY(${hoverTranslateY}px) scale(${hoverScale})`,
        boxShadow: hoverShadow,
      },
    } : {}),
    ...sx,
  };

  const handleEnd = () => {
    if (once) didPlayRef.current = true;
    setPlayingIntro(false);
  };

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const mergedSx = Array.isArray(child.props.sx) ? [...child.props.sx, animatedSx] : [child.props.sx, animatedSx];
    return cloneElement(child, {
      sx: mergedSx,
      onAnimationEnd: (...args: any[]) => {
        child.props?.onAnimationEnd?.(...args);
        handleEnd();
      },
      className: [child.props?.className, className].filter(Boolean).join(" "),
    });
  }

  return (
    <Box
      onAnimationEnd={handleEnd}
      className={className}
      sx={{
        display: "inline-block",
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Box sx={animatedSx}>{children}</Box>
    </Box>
  );
};

export default HoverableAppear;
