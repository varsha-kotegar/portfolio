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
import SectionTransition from "@/components/SectionTransition";
import { PageTransitionProvider } from "@/components/PageTransition";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loopTriggered = false;

    const handleScroll = () => {
      if (loopTriggered) return;
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;

      if (scrollTop >= scrollHeight - 50) {
        loopTriggered = true;
        // Don't reverse — just instantly reset to top so next scroll continues forward
        window.scrollTo({ top: 1 }); // 1px to avoid re-triggering
        requestAnimationFrame(() => {
          loopTriggered = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PageTransitionProvider>
      <div ref={containerRef} className="min-h-screen bg-background">
        <CustomCursor />
        <Navbar />
        <HeroSection />

        <SectionTransition>
          <div className="editorial-divider max-w-7xl mx-auto" />
        </SectionTransition>

        <ProjectsSection />

        <SectionTransition>
          <div className="editorial-divider max-w-7xl mx-auto" />
          <AboutSection />
        </SectionTransition>

        <SectionTransition>
          <SkillsSection />
        </SectionTransition>

        <SectionTransition>
          <div className="editorial-divider max-w-7xl mx-auto" />
          <AchievementsSection />
        </SectionTransition>

        <SectionTransition>
          <ContactSection />
        </SectionTransition>

        <Footer />
        <HeroPreview />
      </div>
    </PageTransitionProvider>
  );
};

export default Index;
