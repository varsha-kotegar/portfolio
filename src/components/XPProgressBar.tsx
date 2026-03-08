import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionConfig {
  id: string;
  label: string;
  xp: number;
}

const SECTIONS: SectionConfig[] = [
  { id: "home", label: "Landing explored", xp: 10 },
  { id: "projects", label: "Projects discovered", xp: 30 },
  { id: "about", label: "About revealed", xp: 20 },
  { id: "skills", label: "Skills uncovered", xp: 20 },
  { id: "achievements", label: "Achievements found", xp: 20 },
  { id: "contact", label: "Contact reached", xp: 20 },
];

const TOTAL_XP = SECTIONS.reduce((sum, s) => sum + s.xp, 0);

const XPProgressBar = () => {
  const [earnedXP, setEarnedXP] = useState(0);
  const [discoveredSections, setDiscoveredSections] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<{ xp: number; label: string } | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const notifTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleSectionDiscovered = useCallback((section: SectionConfig) => {
    setDiscoveredSections((prev) => {
      if (prev.has(section.id)) return prev;
      const next = new Set(prev);
      next.add(section.id);

      setEarnedXP((xp) => {
        const newXP = xp + section.xp;
        if (newXP >= TOTAL_XP) {
          setTimeout(() => setShowAchievement(true), 1200);
          setTimeout(() => setShowAchievement(false), 5500);
        }
        return newXP;
      });

      // Show notification
      if (notifTimeout.current) clearTimeout(notifTimeout.current);
      setNotification({ xp: section.xp, label: section.label });
      notifTimeout.current = setTimeout(() => setNotification(null), 2200);

      return next;
    });
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleSectionDiscovered(section);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [handleSectionDiscovered]);

  const progress = (earnedXP / TOTAL_XP) * 100;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-border/40">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* XP notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.label}
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-4 left-1/2 z-[61] flex items-center gap-2 px-4 py-2 rounded-sm bg-card/90 backdrop-blur-sm border border-border shadow-sm"
          >
            <span className="font-display font-bold text-sm text-accent">
              +{notification.xp} XP
            </span>
            <span className="text-[11px] font-body tracking-wide text-muted-foreground">
              {notification.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement unlocked */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[61] flex flex-col items-center gap-1 px-8 py-5 rounded-sm bg-card/95 backdrop-blur-md border border-accent/30 shadow-lg"
          >
            <span className="text-2xl mb-1">🏆</span>
            <span className="font-display font-bold text-sm text-foreground tracking-wide">
              Achievement Unlocked
            </span>
            <span className="font-body text-xs text-muted-foreground italic">
              Explorer of Varsha's Engineering Odyssey
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default XPProgressBar;
