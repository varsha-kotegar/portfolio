import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { label: "Languages", items: "JavaScript (ES6+), TypeScript" },
      { label: "Frameworks", items: "React.js, Next.js" },
      { label: "Styling & Markup", items: "HTML5, CSS3, Tailwind CSS" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { label: "Runtime", items: "Node.js, Express.js" },
      { label: "Databases", items: "MongoDB, MySQL" },
    ],
  },
  {
    title: "Emerging Tech & Tools",
    skills: [
      { label: "AI/ML", items: "Machine Learning Fundamentals" },
      { label: "Version Control", items: "Git, GitHub" },
      { label: "Tools", items: "Docker, CI/CD, Postman" },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Expertise</p>
          <h2 className="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 pb-4 border-b border-accent">
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.label}>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-1">{skill.label}</p>
                    <p className="font-body text-muted-foreground">{skill.items}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
