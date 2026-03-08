import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "@/context/GamificationContext";

const AchievementPopup = () => {
  const { activePopup } = useGamification();

  return (
    <AnimatePresence>
      {activePopup && (
        <motion.div
          key={activePopup.id}
          initial={{ opacity: 0, y: 30, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -15, x: "-50%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-10 left-1/2 z-[70] flex items-center gap-3 px-6 py-4 bg-card/95 backdrop-blur-md border border-accent/30 rounded-sm shadow-lg"
        >
          <span className="text-2xl">{activePopup.icon}</span>
          <div>
            <p className="font-body text-[9px] tracking-[0.25em] uppercase text-accent">
              Achievement Unlocked
            </p>
            <p className="font-display text-sm font-semibold text-foreground mt-0.5">
              {activePopup.title}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPopup;
