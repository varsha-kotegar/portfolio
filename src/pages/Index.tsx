import { useEffect, useRef } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = document.documentElement;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight - el.clientHeight;

        if (scrollTop >= scrollHeight - 2) {
          // Fade out briefly then jump to top
          document.body.style.opacity = "0";
          document.body.style.transition = "opacity 0.3s ease";
          setTimeout(() => {
            window.scrollTo({ top: 0 });
            requestAnimationFrame(() => {
              document.body.style.opacity = "1";
            });
          }, 300);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <div className="editorial-divider max-w-7xl mx-auto" />
      <ProjectsSection />
      <div className="editorial-divider max-w-7xl mx-auto" />
      <AboutSection />
      <SkillsSection />
      <div className="editorial-divider max-w-7xl mx-auto" />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
