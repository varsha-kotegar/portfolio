import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Name shrinks and moves up smoothly
  const nameScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.5]);
  const nameY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-15vh"]);

  // Content reveals
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.45], [80, 0]);

  // Scroll indicator fades out
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">
        
        {/* Name block */}
        <motion.div
          style={{ scale: nameScale, y: nameY }}
          className="text-center origin-center will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-muted-foreground mb-8"
          >
            Developer · Writer · Explorer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-heading font-bold text-foreground leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
          >
            <span className="block">Varsha</span>
            <span className="block text-accent" style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}>
              Kotegar
            </span>
          </motion.h1>
        </motion.div>

        {/* Content that fades in on scroll */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute bottom-[12vh] left-0 right-0 px-6 md:px-16 lg:px-24"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-16">
            {/* Photo */}
            <div className="flex-shrink-0 order-2 md:order-1">
              <div className="relative">
                <div className="w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded-sm">
                  <img
                    src={profileImg}
                    alt="Varsha Kotegar"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-40 h-52 md:w-48 md:h-64 border border-accent/40 rounded-sm -z-10" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 order-1 md:order-2 text-center md:text-left">
              <p className="font-display italic text-lg md:text-xl text-accent mb-5">
                "An odyssey in engineering; a narrative in progress."
              </p>
              <p className="editorial-body text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
                As a third-year engineering student, I am mastering the technical building blocks of my field while refining my voice as a writer and speaker — driven by a passion for exploring new technologies and translating them into stories that make people smarter.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-6 flex items-center gap-3"
        >
          <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-0.5 h-1.5 bg-muted-foreground rounded-full"
            />
          </div>
          <span className="text-[10px] font-body text-muted-foreground tracking-[0.3em] uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
