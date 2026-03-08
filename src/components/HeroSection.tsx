import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center section-padding pt-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
            >
              Developer · Writer · Explorer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="editorial-heading text-7xl sm:text-8xl md:text-9xl font-bold text-foreground"
            >
              Varsha Kotegar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-display italic text-xl md:text-2xl text-accent max-w-xl"
            >
              "An odyssey in engineering; a narrative in progress."
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="editorial-body text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed"
            >
              As a third-year engineering student, I am currently mastering the technical building blocks of my field while refining my voice as a writer and speaker. I am in a dedicated 'learning and building' phase, driven by a passion for exploring new technologies and translating them into stories that make people smarter.
            </motion.p>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-72 h-96 md:w-80 md:h-[28rem] overflow-hidden rounded-sm">
                <img
                  src={profileImg}
                  alt="Varsha - Developer Portrait"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-96 md:w-80 md:h-[28rem] border border-accent rounded-sm -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex items-center gap-3"
        >
          <div className="w-8 h-12 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-muted-foreground rounded-full"
            />
          </div>
          <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
