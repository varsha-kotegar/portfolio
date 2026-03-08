import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "@/context/GamificationContext";

interface CollectibleProps {
  id: string;
  icon: string;
  label: string;
  className?: string;
}

const Collectible = ({ id, icon, label, className = "" }: CollectibleProps) => {
  const { foundCollectibles, discoverCollectible, totalCollectibles } = useGamification();
  const [showMessage, setShowMessage] = useState(false);
  const found = foundCollectibles.has(id);

  const handleClick = () => {
    if (found) return;
    discoverCollectible(id);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  if (found && !showMessage) {
    return (
      <motion.div
        className={`inline-flex ${className}`}
        initial={{ scale: 1 }}
        animate={{ opacity: 0.25, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm select-none">{icon}</span>
      </motion.div>
    );
  }

  return (
    <div className={`relative inline-flex ${className}`}>
      <motion.button
        onClick={handleClick}
        className="relative text-sm select-none opacity-30 hover:opacity-80 transition-opacity duration-500"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={!found ? { y: [0, -2, 0] } : {}}
        transition={!found ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : {}}
        data-cursor="Discover"
      >
        {icon}
      </motion.button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 px-4 py-3 bg-card/95 backdrop-blur-md border border-accent/30 rounded-sm shadow-lg text-center z-50"
          >
            <p className="font-display text-xs font-semibold text-accent mb-1">
              Artifact discovered
            </p>
            <p className="font-body text-[10px] text-muted-foreground leading-relaxed">
              You found a piece of Varsha's engineering journey.
            </p>
            <p className="font-body text-[10px] text-accent/60 mt-1.5">
              {foundCollectibles.size}/{totalCollectibles} collected
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collectible;
