import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MaskRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const MaskReveal = ({ children, className = "", delay = 0, as: Tag = "h2" }: MaskRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Split into lines by word groups for staggered reveal
  const words = children.split(" ");

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          transition={{ delay }}
        >
          <Tag className={className}>
            {children}
          </Tag>
        </motion.div>
      </div>
    </div>
  );
};

// Multi-line version with stagger
export const MaskRevealLines = ({ lines, className = "", lineClassName = "" }: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 50%"],
  });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => {
        const start = i * 0.15;
        const end = start + 0.5;

        return (
          <LineReveal
            key={i}
            line={line}
            progress={scrollYProgress}
            start={Math.min(start, 0.7)}
            end={Math.min(end, 1)}
            className={lineClassName}
          />
        );
      })}
    </div>
  );
};

const LineReveal = ({ line, progress, start, end, className }: {
  line: string;
  progress: any;
  start: number;
  end: number;
  className: string;
}) => {
  const y = useTransform(progress, [start, end], ["110%", "0%"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="overflow-hidden">
      <motion.div style={{ y, opacity }} className={className}>
        {line}
      </motion.div>
    </div>
  );
};

export default MaskReveal;
