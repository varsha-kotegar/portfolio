import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "Projects", "About", "Achievements", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (item: string) => {
    setActive(item);
    const id = item.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-5"
    >
      <ul
        className="flex items-center justify-center gap-12"
        onMouseLeave={() => setHovered(null)}
      >
        {navItems.map((item) => (
          <li key={item} className="relative">
            <button
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHovered(item)}
              className="relative px-5 py-2 text-sm font-body font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {hovered === item && (
                <motion.span
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-muted/80 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
