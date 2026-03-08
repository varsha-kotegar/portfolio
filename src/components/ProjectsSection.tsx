import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "DevFlow",
    description: "A collaborative developer workflow tool with real-time code sharing and task management.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "NarrativeAI",
    description: "An AI-powered content generation platform that helps writers create compelling stories.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "CloudNote",
    description: "A minimalist note-taking application with cloud sync and markdown support.",
    tech: ["React", "Express.js", "MySQL", "Docker"],
    github: "https://github.com",
  },
  {
    title: "Portfolio v2",
    description: "An editorial-style developer portfolio with smooth animations and modern design.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Selected Work</p>
          <h2 className="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group border border-border rounded-sm p-8 hover:border-accent transition-colors duration-500 bg-card"
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={18} />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <p className="editorial-body text-muted-foreground mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-body tracking-wider uppercase px-3 py-1 border border-border rounded-full text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
