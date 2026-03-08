import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">The Story</p>
          <h2 className="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">About</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <div className="w-full aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={profileImg}
                alt="Varsha"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            <p className="font-display italic text-2xl md:text-3xl text-foreground leading-snug">
              Crafting code with the precision of an engineer and the soul of a storyteller.
            </p>
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
            <div className="editorial-divider" />
            <div>
              <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Tools & Technologies</p>
              <div className="flex flex-wrap gap-3">
                {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Docker", "Git"].map((tool) => (
                  <span key={tool} className="px-4 py-2 border border-border rounded-full text-sm font-body text-muted-foreground hover:border-accent hover:text-foreground transition-colors duration-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
