import { useEffect, useRef } from "react";
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
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;

      // When user reaches the bottom, smoothly scroll to top
      if (scrollTop >= scrollHeight - 5) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
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
