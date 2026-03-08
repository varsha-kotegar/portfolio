import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const navItems = ["Home", "Projects", "About", "Achievements", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isHovering, setIsHovering] = useState(false);
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
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setHovered(null); }}
      >
        {/* Background pill - visible by default, hides on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border border-border"
          animate={{
            backgroundColor: isHovering ? "hsla(var(--muted), 0)" : "hsla(var(--muted), 0.6)",
            borderColor: isHovering ? "transparent" : "hsl(var(--border))",
          }}
          transition={{ duration: 0.3 }}
        />

        <ul className="relative flex items-center gap-8 px-6 py-2.5">
          {navItems.map((item) => (
            <li key={item} className="relative">
              <button
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(item)}
                className="relative px-5 py-2 text-sm font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {/* Per-item hover pill */}
                {isHovering && hovered === item && (
                  <motion.span
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-muted rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {item === "Home" ? <Home className="w-4 h-4" /> : item}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
