import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.55]);
  const nameY = useTransform(scrollYProgress, [0, 0.35], ["0vh", "-8vh"]);

  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative" style={{ height: "200vh" }}>
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

          {/* Name block */}
          <motion.div
            style={{ scale: nameScale, y: nameY }}
            className="origin-center will-change-transform text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 text-muted-foreground"
            >
              Developer · Writer · Explorer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="editorial-heading leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
            >
              <span className="block font-black text-accent">
                Varsha
              </span>
              <span className="block font-bold text-foreground" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
                Kotegar
              </span>
            </motion.h1>

            {/* Editorial divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 mb-4 h-px w-32 md:w-48 origin-center bg-accent/40"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-display italic text-lg md:text-2xl text-accent"
            >
              "An odyssey in engineering; a narrative in progress."
            </motion.p>

            <motion.div
              animate={{ opacity: [1, 0.92, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2.5 }}
              className="absolute inset-0 pointer-events-none"
            />
          </motion.div>

          {/* Two-column content */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute bottom-[12vh] left-0 right-0 px-6 md:px-16 lg:px-24"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left — Photo */}
              <div className="md:col-span-4 flex justify-center md:justify-start">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative w-fit"
                >
                  <div className="w-56 h-72 md:w-72 md:h-[22rem] overflow-hidden rounded-sm">
                    <img
                      src={profileImg}
                      alt="Varsha Kotegar"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 w-56 h-72 md:w-72 md:h-[22rem] rounded-sm -z-10 border border-accent/30"
                  />
                </motion.div>
              </div>

              {/* Right — Intro text */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="font-body text-sm md:text-base max-w-[520px] text-muted-foreground"
                  style={{ lineHeight: 1.7 }}
                >
                  As a third-year engineering student, I am mastering the technical building blocks of my field while refining my voice as a writer and speaker — driven by a passion for exploring new technologies and translating them into stories that make people smarter.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground">
              Scroll
            </span>
            <div className="w-px h-8 bg-border relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-x-0 h-1/2 bg-accent/60"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
