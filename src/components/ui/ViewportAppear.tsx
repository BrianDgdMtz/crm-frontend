import React, { useEffect, useRef, useState } from "react";
import HoverableAppear from "./HoverableAppear";

type Props = {
  children: React.ReactNode;
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  introDurationMs?: number;
  introFromScale?: number;
  introBlurPx?: number;
  hoverScale?: number;
  hoverShadow?: number | string;
};

const ViewportAppear: React.FC<Props> = ({
  children,
  once = true,
  rootMargin = "0px 0px -20% 0px",
  threshold = 0.15,
  introDurationMs = 350,
  introFromScale = 0.96,
  introBlurPx = 10,
  hoverScale = 1.01,
  hoverShadow = 6,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, threshold]);

  // Cuando visible === true, se dispara la intro de HoverableAppear.
  return (
    <div ref={ref}>
      <HoverableAppear
        asChild
        intro={visible}
        introDurationMs={introDurationMs}
        introFromScale={introFromScale}
        introBlurPx={introBlurPx}
        hoverScale={hoverScale}
        hoverShadow={hoverShadow}
      >
        {children}
      </HoverableAppear>
    </div>
  );
};

export default ViewportAppear;
