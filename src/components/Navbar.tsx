import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "Projects", "About", "Achievements", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/80 shadow-lg" : "bg-background/60 backdrop-blur-md"
      } rounded-full border border-border px-2 py-2`}
    >
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item} className="relative">
            <button
              onClick={() => handleClick(item)}
              className={`relative z-10 px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-full ${
                active === item ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === item && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
