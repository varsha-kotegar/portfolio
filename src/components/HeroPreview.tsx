import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A static preview of the hero that appears at the bottom of the page
 * to create the illusion of circular scrolling.
 */
const HeroPreview = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      <p className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-muted-foreground mb-8">
        Developer · Writer · Explorer
      </p>
      <h2
        className="editorial-heading font-bold text-foreground leading-[0.85] tracking-tight text-center"
        style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
      >
        <span className="block">Varsha</span>
        <span className="block text-accent" style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}>
          Kotegar
        </span>
      </h2>
    </motion.section>
  );
};

export default HeroPreview;
