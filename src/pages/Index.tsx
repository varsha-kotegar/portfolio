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
    let loopTriggered = false;

    const handleScroll = () => {
      if (loopTriggered) return;
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;

      if (scrollTop >= scrollHeight - 2) {
        loopTriggered = true;

        // Wait 1.5s so user sees the footer, then fade and loop
        setTimeout(() => {
          document.body.style.transition = "opacity 0.5s ease";
          document.body.style.opacity = "0";

          setTimeout(() => {
            window.scrollTo({ top: 0 });
            requestAnimationFrame(() => {
              document.body.style.opacity = "1";
              loopTriggered = false;
            });
          }, 500);
        }, 1500);
      }
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
