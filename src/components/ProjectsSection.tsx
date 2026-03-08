import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";

const projects = [
  {
    title: "DevFlow",
    category: "Developer Tools",
    description: "A collaborative developer workflow tool with real-time code sharing and task management.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#C8C4BC",
  },
  {
    title: "NarrativeAI",
    category: "AI / Machine Learning",
    description: "An AI-powered content generation platform that helps writers create compelling stories.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#8B7EC8",
  },
  {
    title: "CloudNote",
    category: "Productivity",
    description: "A minimalist note-taking app with cloud sync, markdown support, and cross-device experience.",
    tech: ["React", "Express.js", "MySQL", "Docker"],
    github: "https://github.com",
    color: "#A8C8A0",
  },
  {
    title: "Portfolio v2",
    category: "Design / Frontend",
    description: "An editorial-style developer portfolio with smooth animations and premium typography.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#D4C89A",
  },
  {
    title: "TaskBoard",
    category: "Project Management",
    description: "A kanban-style project management tool with drag-and-drop and real-time collaboration.",
    tech: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
    github: "https://github.com",
    demo: "https://example.com",
    color: "#E8A87C",
  },
  {
    title: "CodeSnap",
    category: "Social / Developer",
    description: "Beautiful code snippet sharing platform with syntax highlighting and social features.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    github: "https://github.com",
    color: "#7EC8C8",
  },
];

const MagneticCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const magnetic = useMagnetic({ strength: 0.15, stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={magnetic.ref}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] group"
      data-cursor="View Project"
    >
      {/* Image */}
      <div
        className="w-full aspect-[4/3] rounded-lg mb-6 overflow-hidden flex items-center justify-center relative"
        style={{ backgroundColor: project.color }}
      >
        {/* Category label */}
        <span className="absolute top-4 left-4 text-[10px] font-body tracking-[0.2em] uppercase text-white/70 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
          {project.category}
        </span>
        <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white/30 select-none">
          {project.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex gap-3 mt-2">
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

      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
        {project.description}
      </p>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Map vertical scroll to horizontal movement
  const totalCards = projects.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", `-${(totalCards - 1) * 38}%`]
  );

  return (
    <section ref={sectionRef} id="projects" className="relative" style={{ height: `${totalCards * 60}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-16 lg:px-24 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Selected Work
            </p>
            <div className="flex items-end justify-between">
              <h2 className="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Projects
              </h2>
              <p className="hidden md:block font-body text-sm text-muted-foreground tracking-wider">
                {String(totalCards).padStart(2, "0")} Projects
              </p>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          style={{ x }}
          className="flex gap-8 md:gap-12 pl-6 md:pl-16 lg:pl-24 pr-[20vw]"
        >
          {projects.map((project, i) => (
            <MagneticCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
