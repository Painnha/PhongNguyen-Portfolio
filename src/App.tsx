import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ContactSection } from "./components/ContactSection";
import { LanguageProvider } from "./contexts/LanguageContext";
import React from 'react';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1E1E1E",
              color: "#FFFFFF",
              border: "1px solid #FF6B00",
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}