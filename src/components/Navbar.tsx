import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import { usePageTransition } from "@/components/PageTransition";

const navItems = ["Home", "Projects", "About", "Achievements", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { triggerTransition } = usePageTransition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (item: string) => {
    if (item === active) return;
    setActive(item);
    setMobileOpen(false);

    triggerTransition(() => {
      const id = item.toLowerCase();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const highlighted = hovered ?? active;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Desktop */}
      <div
        className="hidden md:block rounded-full px-3 py-2"
        style={{
          backgroundColor: "#E8E6DF",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
        onMouseLeave={() => setHovered(null)}
      >
        <ul className="flex items-center gap-0.5">
          {navItems.map((item) => (
            <li key={item} className="relative">
              <button
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(item)}
                className="relative px-5 py-2 text-xs font-body font-medium tracking-widest uppercase transition-colors duration-200"
                style={{ color: "#3A3A37" }}
              >
                {highlighted === item && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#DBD9D2" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  {item === "Home" ? <Home className="w-3.5 h-3.5" strokeWidth={2} /> : item}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full p-3"
          style={{ backgroundColor: "#E8E6DF", color: "#3A3A37", border: "1px solid rgba(0,0,0,0.05)" }}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 rounded-2xl px-4 py-3 min-w-[200px]"
            style={{ backgroundColor: "#E8E6DF", border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleClick(item)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-body font-medium tracking-widest uppercase rounded-full transition-colors duration-200 ${
                      active === item ? "bg-[#DBD9D2]" : ""
                    }`}
                    style={{ color: "#3A3A37" }}
                  >
                    <span className="flex items-center gap-2">
                      {item === "Home" ? <Home className="w-4 h-4" strokeWidth={2} /> : item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
