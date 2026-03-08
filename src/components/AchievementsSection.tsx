import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Users, ChevronRight, X, ExternalLink } from "lucide-react";
import { MaskRevealLines } from "@/components/MaskReveal";
import { useMagnetic } from "@/hooks/use-magnetic";

/* ── Communities ─────────────────────────────────── */

const communities = [
  {
    role: "Lead",
    org: "Sahyadri Open Source Women Community (SOSWC)",
    period: "Oct 2025 – Present",
    points: [
      "Leading the women-in-tech community at Sahyadri by organizing workshops, coding sessions, and mentorship programs to encourage participation and confidence among women in technology.",
      "Guiding junior students in Git workflows, open-source contributions, and project development while promoting women's visibility and leadership through community initiatives.",
    ],
  },
  {
    role: "Joint Secretary & Webmaster",
    org: "IEEE Student Branch SCEM (ComSoc & WiE Society)",
    period: "Sep 2025 – Present",
    points: [
      "Strengthening Women-in-Engineering initiatives through technical outreach and community engagement.",
      "Supported flagship events including Anvesh 2025 as MC and contributed documentation for IEEE Cosmic Day.",
    ],
  },
  {
    role: "Industry Committee Lead",
    org: "IEEE Mangaluru Subsection",
    period: "2025 – Present",
    points: [
      "Coordinating industry outreach initiatives and fostering collaboration between students and industry professionals.",
      "Supporting programs that connect IEEE members with real-world technical insights and mentorship.",
    ],
  },
  {
    role: "Joint Secretary",
    org: "MinDS (ISE Branch Association)",
    period: "Sep 2025 – Present",
    points: [
      "Coordinating department-level academic, cultural, and technical programs to enhance peer learning.",
      "Assisting in planning events and skill-building initiatives for ISE students.",
    ],
  },
  {
    role: "Executive Member",
    org: "Sahyadri Open Source Community (SOSC)",
    period: "",
    points: [
      "Contributed as Content Writer & Documentation Lead for Synergia DevHost 2025, an event featuring 30+ speakers and 1000+ participants.",
      "Collaborated with organizations including GDSC, IEEE, and FOSS United Mangalore to support event coordination and outreach.",
      "Helped organize Tech Pitch, enabling students to present early-stage technical ideas.",
    ],
  },
];

/* ── Certifications ──────────────────────────────── */

const certifications = [
  {
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    date: "2025",
    description:
      "Comprehensive certification covering React, Node.js, databases, and deployment pipelines for modern web applications.",
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "AWS Academy",
    date: "2025",
    description:
      "Foundational certification in cloud architecture, services, and best practices for scalable infrastructure.",
  },
];

/* ── Community Card (expandable) ─────────────────── */

const CommunityCard = ({
  item,
  i,
}: {
  item: (typeof communities)[0];
  i: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="border border-border rounded-sm overflow-hidden hover:border-accent/60 transition-colors duration-500"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
      >
        <div className="min-w-0">
          <p className="font-display text-base md:text-lg font-semibold text-foreground leading-snug">
            {item.role}
          </p>
          <p className="font-body text-sm text-muted-foreground mt-0.5">
            {item.org}
          </p>
          {item.period && (
            <p className="font-body text-[11px] tracking-widest uppercase text-accent mt-1.5">
              {item.period}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-6 pb-5 space-y-2">
              {item.points.map((point, j) => (
                <li
                  key={j}
                  className="font-body text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent"
                >
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Certificate Modal ───────────────────────────── */

const CertificateCard = ({
  cert,
  i,
}: {
  cert: (typeof certifications)[0];
  i: number;
}) => {
  const [open, setOpen] = useState(false);
  const magnetic = useMagnetic({ strength: 0.08, stiffness: 180, damping: 22 });

  return (
    <>
      <motion.div
        ref={magnetic.ref}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.12 }}
        onClick={() => setOpen(true)}
        className="border border-border rounded-sm p-6 cursor-pointer hover:border-accent/60 transition-colors duration-500 group"
        data-cursor="View"
      >
        <Award className="w-6 h-6 text-accent mb-4" />
        <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {cert.title}
        </h4>
        <p className="font-body text-sm text-muted-foreground mt-1">
          {cert.issuer}
        </p>
        <p className="font-body text-[11px] tracking-widest uppercase text-accent mt-2">
          {cert.date}
        </p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-background border border-border rounded-sm p-8 md:p-10 shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <Award className="w-10 h-10 text-accent mb-5" />
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {cert.title}
              </h3>
              <div className="flex items-center gap-3 mt-3 mb-6">
                <span className="font-body text-sm text-muted-foreground">
                  {cert.issuer}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="font-body text-[11px] tracking-widest uppercase text-accent">
                  {cert.date}
                </span>
              </div>
              <div className="h-px bg-border mb-6" />
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Main Section ────────────────────────────────── */

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <MaskRevealLines
            lines={["Achievements"]}
            lineClassName="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
          />
        </div>

        {/* Communities */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Communities
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {communities.map((item, i) => (
              <CommunityCard key={item.org} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Certifications
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <CertificateCard key={cert.title} cert={cert} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
