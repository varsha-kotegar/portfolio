import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

interface Achievement {
  id: string;
  title: string;
  icon: string;
}

interface GamificationState {
  // Quest
  completedObjectives: Set<string>;
  markObjective: (id: string) => void;

  // Collectibles
  foundCollectibles: Set<string>;
  discoverCollectible: (id: string) => void;
  totalCollectibles: number;

  // Achievements
  unlockedAchievements: Set<string>;
  unlockAchievement: (achievement: Achievement) => void;
  activePopup: Achievement | null;
}

const GamificationContext = createContext<GamificationState | null>(null);

export const useGamification = () => {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
};

const TOTAL_COLLECTIBLES = 4;

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [completedObjectives, setCompletedObjectives] = useState<Set<string>>(new Set());
  const [foundCollectibles, setFoundCollectibles] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [activePopup, setActivePopup] = useState<Achievement | null>(null);
  const popupTimer = useRef<ReturnType<typeof setTimeout>>();

  const unlockAchievement = useCallback((achievement: Achievement) => {
    setUnlockedAchievements((prev) => {
      if (prev.has(achievement.id)) return prev;
      const next = new Set(prev);
      next.add(achievement.id);

      // Show popup
      if (popupTimer.current) clearTimeout(popupTimer.current);
      setActivePopup(achievement);
      popupTimer.current = setTimeout(() => setActivePopup(null), 4000);

      return next;
    });
  }, []);

  const markObjective = useCallback((id: string) => {
    setCompletedObjectives((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const discoverCollectible = useCallback((id: string) => {
    setFoundCollectibles((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);

      // Check if all found → unlock Curious Mind
      if (next.size >= TOTAL_COLLECTIBLES) {
        setTimeout(() => {
          unlockAchievement({ id: "curious-mind", title: "Curious Mind", icon: "🧠" });
        }, 1500);
      }

      return next;
    });
  }, [unlockAchievement]);

  return (
    <GamificationContext.Provider
      value={{
        completedObjectives,
        markObjective,
        foundCollectibles,
        discoverCollectible,
        totalCollectibles: TOTAL_COLLECTIBLES,
        unlockedAchievements,
        unlockAchievement,
        activePopup,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
