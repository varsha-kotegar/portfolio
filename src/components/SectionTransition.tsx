import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
}

const SectionTransition = ({ children, className = "" }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.6"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y, scale }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
