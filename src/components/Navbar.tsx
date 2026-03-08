import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

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

  const highlighted = hovered ?? active;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="rounded-full px-3 py-2"
        style={{ backgroundColor: "#ECEBE7" }}
        onMouseLeave={() => setHovered(null)}
      >
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item} className="relative">
              <button
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(item)}
                className="relative px-6 py-2.5 text-sm font-body font-medium tracking-widest uppercase transition-colors duration-200"
                style={{ color: "#3A3A37" }}
              >
                {highlighted === item && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#E1DFD9" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  {item === "Home" ? <Home className="w-4 h-4" strokeWidth={2} /> : item}
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
