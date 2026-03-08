import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";

const OBJECTIVES = [
  { id: "about", label: "Learn about Varsha", sectionId: "about" },
  { id: "skills", label: "Explore Skills", sectionId: "skills" },
  { id: "projects", label: "Discover Projects", sectionId: "projects" },
  { id: "achievements", label: "View Achievements", sectionId: "achievements" },
  { id: "contact", label: "Reach the Final Chapter", sectionId: "contact" },
];

const ScrollQuest = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { completedObjectives, markObjective, unlockAchievement } = useGamification();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    OBJECTIVES.forEach((obj) => {
      const el = document.getElementById(obj.sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            markObjective(obj.id);
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [markObjective]);

  // Check for Explorer achievement
  useEffect(() => {
    if (completedObjectives.size >= OBJECTIVES.length) {
      setTimeout(() => {
        unlockAchievement({ id: "explorer", title: "Explorer", icon: "🏆" });
      }, 1000);
    }
  }, [completedObjectives.size, unlockAchievement]);

  const completed = completedObjectives.size;
  const total = OBJECTIVES.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setCollapsed(false)}
            className="flex items-center gap-2 px-4 py-2.5 bg-card/90 backdrop-blur-sm border border-border rounded-sm shadow-sm hover:border-accent/50 transition-colors duration-300"
            data-cursor="Open Quest"
          >
            <span className="text-xs">📜</span>
            <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
              Quest
            </span>
            <span className="font-display text-xs font-semibold text-accent">
              {completed}/{total}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-72 bg-card/95 backdrop-blur-md border border-border rounded-sm shadow-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setCollapsed(true)}
              className="w-full flex items-center justify-between px-5 py-3.5 border-b border-border hover:bg-muted/30 transition-colors"
              data-cursor="Collapse"
            >
              <div className="text-left">
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-accent">
                  Quest
                </p>
                <p className="font-display text-sm font-semibold text-foreground mt-0.5">
                  Discover Varsha's Odyssey
                </p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </button>

            {/* Progress */}
            <div className="px-5 pt-3 pb-1">
              <div className="h-0.5 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completed / total) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Objectives */}
            <div className="px-5 py-3 space-y-2.5">
              {OBJECTIVES.map((obj) => {
                const done = completedObjectives.has(obj.id);
                return (
                  <motion.div
                    key={obj.id}
                    className="flex items-center gap-3"
                    animate={{ opacity: done ? 1 : 0.5 }}
                  >
                    <motion.div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                        done
                          ? "bg-accent border-accent"
                          : "border-border"
                      }`}
                      animate={done ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {done && (
                        <motion.svg
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className="text-card"
                        >
                          <motion.path
                            d="M2 5L4.5 7.5L8 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.svg>
                      )}
                    </motion.div>
                    <span
                      className={`font-body text-xs tracking-wide ${
                        done
                          ? "text-foreground line-through decoration-accent/40"
                          : "text-muted-foreground"
                      }`}
                    >
                      {obj.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 border-t border-border">
              <p className="font-body text-[10px] text-muted-foreground italic text-center">
                Engineering Odyssey
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScrollQuest;
