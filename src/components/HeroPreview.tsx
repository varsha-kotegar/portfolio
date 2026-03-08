import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      <p className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6" style={{ color: "#3A3A37" }}>
        Developer · Writer · Explorer
      </p>
      <h2
        className="editorial-heading leading-[0.88] tracking-tight text-center"
        style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
      >
        <span className="block font-black" style={{ color: "#9A9A6A" }}>Varsha</span>
        <span className="block font-bold" style={{ color: "#111111", fontSize: "clamp(3rem, 9vw, 9rem)" }}>
          Kotegar
        </span>
      </h2>
      <p className="font-display italic text-base md:text-xl mt-6" style={{ color: "#9A9A6A" }}>
        "An odyssey in engineering; a narrative in progress."
      </p>
    </motion.section>
  );
};

export default HeroPreview;
