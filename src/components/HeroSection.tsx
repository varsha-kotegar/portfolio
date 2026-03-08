import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Name block shrinks and lifts
  const nameScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.55]);
  const nameY = useTransform(scrollYProgress, [0, 0.35], ["0vh", "-12vh"]);

  // Content reveals on scroll
  const contentOpacity = useTransform(scrollYProgress, [0.18, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.18, 0.4], [60, 0]);

  // Scroll indicator
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

          {/* Name block — centered initially */}
          <motion.div
            style={{ scale: nameScale, y: nameY }}
            className="origin-center will-change-transform text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6"
              style={{ color: "#3A3A37" }}
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
              <span className="block font-black" style={{ color: "#9A9A6A" }}>
                Varsha
              </span>
              <span className="block font-bold" style={{ color: "#111111", fontSize: "clamp(3rem, 9vw, 9rem)" }}>
                Kotegar
              </span>
            </motion.h1>

            {/* Tagline directly under name */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-display italic text-base md:text-xl mt-6"
              style={{ color: "#9A9A6A" }}
            >
              "An odyssey in engineering; a narrative in progress."
            </motion.p>

            {/* Subtle breathing animation after load */}
            <motion.div
              animate={{ opacity: [1, 0.92, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2.5 }}
              className="absolute inset-0 pointer-events-none"
            />
          </motion.div>

          {/* Two-column content — fades in on scroll */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute bottom-[10vh] left-0 right-0 px-6 md:px-16 lg:px-24"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
              {/* Left — Photo */}
              <div className="md:col-span-4">
                <div className="relative w-fit">
                  <div className="w-44 h-56 md:w-56 md:h-72 overflow-hidden rounded-sm">
                    <img
                      src={profileImg}
                      alt="Varsha Kotegar"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 w-44 h-56 md:w-56 md:h-72 rounded-sm -z-10"
                    style={{ border: "1px solid rgba(154, 154, 106, 0.3)" }}
                  />
                </div>
              </div>

              {/* Right — Intro text */}
              <div className="md:col-span-8 flex flex-col justify-end">
                <p
                  className="font-body text-sm md:text-base max-w-[520px]"
                  style={{ color: "#3A3A37", lineHeight: 1.7 }}
                >
                  As a third-year engineering student, I am mastering the technical building blocks of my field while refining my voice as a writer and speaker — driven by a passion for exploring new technologies and translating them into stories that make people smarter.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3"
          >
            <div className="w-6 h-10 border rounded-full flex justify-center pt-2" style={{ borderColor: "rgba(58, 58, 55, 0.25)" }}>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-0.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#3A3A37" }}
              />
            </div>
            <span className="text-[10px] font-body tracking-[0.3em] uppercase" style={{ color: "#3A3A37" }}>
              Scroll
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
