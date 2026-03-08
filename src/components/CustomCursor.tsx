import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const cursorX = useSpring(0, { stiffness: 350, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 350, damping: 30 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window;
    if (isTouchDevice.current) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor]");
      const isBtn = target.closest("button, [role='button']");
      const isLink = target.closest("a");

      if (interactive) {
        setIsHovering(true);
        setIsButton(false);
        setHoverText((interactive as HTMLElement).dataset.cursor || "");
      } else if (isBtn) {
        setIsHovering(true);
        setIsButton(true);
        setHoverText("");
      } else if (isLink) {
        setIsHovering(true);
        setIsButton(false);
        setHoverText("");
      } else {
        setIsHovering(false);
        setIsButton(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOver);

    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.style.cursor = "";
    };
  }, [visible, cursorX, cursorY]);

  if (isTouchDevice.current) return null;

  const size = hoverText ? 100 : isHovering ? 40 : 10;
  const cursorOpacity = isButton ? 0.5 : 1;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? cursorOpacity : 0,
      }}
      transition={{
        width: { type: "spring", stiffness: 350, damping: 28 },
        height: { type: "spring", stiffness: 350, damping: 28 },
        opacity: { duration: 0.15 },
      }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: isHovering
            ? "rgba(58, 58, 55, 0.85)"
            : "rgba(58, 58, 55, 0.6)",
        }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-body font-medium tracking-wider uppercase text-white whitespace-nowrap"
          >
            {hoverText}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default CustomCursor;
