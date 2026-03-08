import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "DevFlow",
    description: "A collaborative developer workflow tool with real-time code sharing and task management capabilities for modern teams.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#C8C4BC",
  },
  {
    title: "NarrativeAI",
    description: "An AI-powered content generation platform that helps writers create compelling stories and articles effortlessly.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#8B7EC8",
  },
  {
    title: "CloudNote",
    description: "A minimalist note-taking application with cloud sync, markdown support, and seamless cross-device experience.",
    tech: ["React", "Express.js", "MySQL", "Docker"],
    github: "https://github.com",
    color: "#A8C8A0",
  },
  {
    title: "Portfolio v2",
    description: "An editorial-style developer portfolio with smooth animations, modern design, and premium typography.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#D4C89A",
  },
  {
    title: "TaskBoard",
    description: "A kanban-style project management tool with drag-and-drop interface and real-time collaboration features.",
    tech: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#E8A87C",
  },
  {
    title: "CodeSnap",
    description: "Beautiful code snippet sharing platform with syntax highlighting, themes, and social features for developers.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    github: "https://github.com",
    color: "#7EC8C8",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
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
          className="mb-20"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Selected Work</p>
          <h2 className="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group border border-border/60 rounded-sm p-4 pb-8 hover:border-accent/40 transition-all duration-500 bg-card/30"
              data-cursor="View Project"
            >
              {/* Image placeholder */}
              <div
                className="w-full aspect-[4/3] rounded-lg mb-6 overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: project.color }}
              >
                <span className="font-display text-3xl md:text-4xl font-bold text-white/80 select-none">
                  {project.title}
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={16} />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
