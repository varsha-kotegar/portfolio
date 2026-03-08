import { useState, createContext, useContext, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionContextType {
  triggerTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [transitioning, setTransitioning] = useState(false);

  const triggerTransition = useCallback((callback: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setTransitioning(false), 400);
    }, 350);
  }, []);

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{ backgroundColor: "hsl(var(--background))" }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
