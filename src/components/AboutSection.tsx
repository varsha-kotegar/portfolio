import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImg from "@/assets/profile.jpg";
import Parallax from "@/components/Parallax";
import { MaskRevealLines } from "@/components/MaskReveal";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Mask reveal heading */}
        <div className="mb-16">
          <MaskRevealLines
            lines={["About"]}
            lineClassName="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Parallax image */}
          <div className="lg:col-span-4">
            <Parallax speed={-0.15} className="w-full aspect-[3/4] rounded-sm">
              <img
                src={profileImg}
                alt="Varsha"
                className="w-full h-full object-cover"
              />
            </Parallax>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            <MaskRevealLines
              lines={[
                "Crafting code with the",
                "precision of an engineer",
                "and the soul of a storyteller."
              ]}
              lineClassName="font-display italic text-2xl md:text-3xl text-foreground leading-snug"
            />
            <div className="space-y-6 editorial-body text-muted-foreground text-base md:text-lg">
              <p>
                I'm Varsha, a third-year engineering student passionate about building meaningful digital experiences. My journey spans across frontend frameworks, backend architectures, and the fascinating world of emerging technologies.
              </p>
              <p>
                Beyond code, I'm a writer and speaker who believes in the power of narrative to make complex ideas accessible. I see every project as a story waiting to be told — each line of code a sentence, each feature a chapter.
              </p>
              <p>
                Currently focused on full-stack development with React, Node.js, and exploring the intersections of AI with everyday applications.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
