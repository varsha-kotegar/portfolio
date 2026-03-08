import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePageTransition } from "@/components/PageTransition";

const navItems = ["Home", "Projects", "About", "Achievements", "Contact", "Blog"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const { triggerTransition } = usePageTransition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: string) => {
    if (item === active && item !== "Home") return;
    setActive(item);
    setMobileOpen(false);

    if (item === "Blog") {
      navigate("/blog");
      return;
    }

    if (item === "Home") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // If we're not on the homepage, go there first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const id = item.toLowerCase();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

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
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24"
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between py-4 border-b transition-all duration-300 ${
          scrolled
            ? "border-border/40 bg-background/85 backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-none"
        }`}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleClick("Home"); }}
          className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors duration-300"
          data-cursor="Home"
        >
          Varsha Kotegar
        </a>

        {/* Desktop nav */}
        <div
          className="hidden md:block rounded-full px-3 py-2"
          style={{
            backgroundColor: "hsl(var(--muted))",
            border: "1px solid hsl(var(--border))",
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <ul className="flex items-center gap-0.5">
            {navItems.filter(i => i !== "Home").map((item) => (
              <li key={item} className="relative">
                <button
                  onClick={() => handleClick(item)}
                  onMouseEnter={() => setHovered(item)}
                  className="relative px-5 py-2 text-xs font-body font-medium tracking-widest uppercase text-foreground transition-colors duration-200"
                >
                  {highlighted === item && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full bg-background"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: theme toggle + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => {
              const next = !dark;
              setDark(next);
              document.documentElement.classList.toggle("dark", next);
              localStorage.setItem("theme", next ? "dark" : "light");
            }}
            className="rounded-full p-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
            data-cursor="Toggle"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-3 bg-muted border border-border text-foreground"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-16 right-0 rounded-2xl px-4 py-3 min-w-[200px] bg-card/95 backdrop-blur-md border border-border shadow-lg"
              >
                <ul className="flex flex-col gap-1">
                  {navItems.filter(i => i !== "Home").map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => handleClick(item)}
                        className={`w-full text-left px-4 py-2.5 text-sm font-body font-medium tracking-widest uppercase rounded-full text-foreground transition-colors duration-200 ${
                          active === item ? "bg-muted" : ""
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
