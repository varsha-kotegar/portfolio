import { useRef, useState, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseMagneticOptions {
  strength?: number;
  damping?: number;
  stiffness?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const { strength = 0.3, damping = 20, stiffness = 150 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [strength, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    style: { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
  };
}
