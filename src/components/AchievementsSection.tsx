import { motion } from "framer-motion";
import { Award, Code, Users } from "lucide-react";
import { MaskRevealLines } from "@/components/MaskReveal";
import { useMagnetic } from "@/hooks/use-magnetic";

const achievements = [
  {
    icon: Code,
    title: "500+",
    subtitle: "LeetCode Problems Solved",
    description: "Consistent problem-solving practice across data structures and algorithms.",
  },
  {
    icon: Users,
    title: "Community",
    subtitle: "Active Member",
    description: "Active contributor in developer communities, tech meetups, and open-source projects.",
  },
  {
    icon: Award,
    title: "Certifications",
    subtitle: "Continuous Learning",
    description: "Certified in full-stack development, cloud fundamentals, and machine learning basics.",
  },
];

const AchievementCard = ({ item, i }: { item: typeof achievements[0]; i: number }) => {
  const magnetic = useMagnetic({ strength: 0.1, stiffness: 180, damping: 22 });

  return (
    <motion.div
      ref={magnetic.ref}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="text-center p-8 border border-border rounded-sm hover:border-accent transition-colors duration-500"
      data-cursor="Explore"
    >
      <item.icon className="w-8 h-8 mx-auto mb-6 text-accent" />
      <h3 className="font-display text-4xl font-bold text-foreground mb-2">{item.title}</h3>
      <p className="font-body text-sm tracking-wider uppercase text-accent mb-4">{item.subtitle}</p>
      <p className="editorial-body text-muted-foreground text-sm">{item.description}</p>
    </motion.div>
  );
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <MaskRevealLines
            lines={["Achievements"]}
            lineClassName="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
