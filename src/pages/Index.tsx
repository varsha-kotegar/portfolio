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
import HeroPreview from "@/components/HeroPreview";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loopTriggered = false;

    const handleScroll = () => {
      if (loopTriggered) return;
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;

      // Trigger when user is near the bottom of the hero preview
      if (scrollTop >= scrollHeight - 100) {
        loopTriggered = true;

        setTimeout(() => {
          window.scrollTo({ top: 0 });
          loopTriggered = false;
        }, 200);
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
      {/* Duplicate hero preview for circular scroll illusion */}
      <HeroPreview />
    </div>
  );
};

export default Index;
