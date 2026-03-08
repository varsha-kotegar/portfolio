import { useEffect, useRef, useState, useCallback } from "react";
import CustomCursor from "@/components/CustomCursor";
import XPProgressBar from "@/components/XPProgressBar";
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
import { GamificationProvider } from "@/context/GamificationContext";
import ScrollQuest from "@/components/ScrollQuest";
import AchievementPopup from "@/components/AchievementPopup";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [looping, setLooping] = useState(false);
  const loopLock = useRef(false);

  const triggerLoop = useCallback(() => {
    if (loopLock.current) return;
    loopLock.current = true;
    setLooping(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      requestAnimationFrame(() => {
        setTimeout(() => {
          setLooping(false);
          loopLock.current = false;
        }, 100);
      });
    }, 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loopLock.current) return;
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollTop >= scrollHeight - 30) {
        triggerLoop();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerLoop]);

  return (
    <GamificationProvider>
      <PageTransitionProvider>
        <div ref={containerRef} className="min-h-screen bg-background">
          <CustomCursor />
          <XPProgressBar />
          <Navbar />
          <ScrollQuest />
          <AchievementPopup />
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

          {/* Circular scroll fade overlay */}
          <div
            className="fixed inset-0 z-[9999] pointer-events-none bg-background"
            style={{
              opacity: looping ? 1 : 0,
              transition: "opacity 0.45s ease-in-out",
            }}
          />
        </div>
      </PageTransitionProvider>
    </GamificationProvider>
  );
};

export default Index;
