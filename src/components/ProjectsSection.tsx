import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { MaskRevealLines } from "@/components/MaskReveal";

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

const MagneticCard = ({ project }: { project: typeof projects[0] }) => {
  const magnetic = useMagnetic({ strength: 0.12, stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={magnetic.ref}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] group"
      data-cursor="View Project"
    >
      {/* Image with hover zoom */}
      <div className="w-full aspect-[4/3] rounded-lg mb-6 overflow-hidden relative">
        <motion.div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: project.color }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white/25 select-none">
            {project.title}
          </span>
        </motion.div>

        {/* Category label */}
        <span className="absolute top-4 left-4 text-[10px] font-body tracking-[0.2em] uppercase text-white/80 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {project.category}
        </span>

        {/* Hover overlay with "View Case Study" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end justify-start p-6">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            View Case Study →
          </span>
        </div>
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

  const totalCards = projects.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", `-${(totalCards - 1) * 38}%`]
  );

  return (
    <section ref={sectionRef} id="projects" className="relative" style={{ height: `${totalCards * 60}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header with mask reveal */}
        <div className="px-6 md:px-16 lg:px-24 mb-12 flex items-end justify-between">
          <MaskRevealLines
            lines={["Projects"]}
            lineClassName="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
          />
          <p className="hidden md:block font-body text-sm text-muted-foreground tracking-wider">
            {String(totalCards).padStart(2, "0")} Projects
          </p>
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          style={{ x }}
          className="flex gap-8 md:gap-12 pl-6 md:pl-16 lg:pl-24 pr-[20vw]"
        >
          {projects.map((project, i) => (
            <MagneticCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
