import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const technologies = [
  "Java",
  "C",
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "ExpressJS",
  "Flask",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <Code2 className="w-5 h-5 text-accent" />
          <h2 className="font-body text-base text-background/70">
            Technologies I work with:
          </h2>
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.04 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/10 border border-background/15 font-body text-sm text-background/85 hover:bg-background/15 hover:border-accent/40 hover:text-background transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
