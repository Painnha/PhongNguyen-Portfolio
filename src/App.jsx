import { Toaster } from 'sonner';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import WorldCupCursor from './components/WorldCupCursor';
import { useLanguage } from './context/LanguageContext';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const { language } = useLanguage();
  const nav = portfolioData[language].navigation;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Global Interactive Cursor */}
      <WorldCupCursor />

      {/* Sonner toast alerts */}
      <Toaster richColors theme="dark" position="bottom-right" />

      {/* ── Navigation ── */}
      <Navigation />

      {/* ── Page Sections ── */}
      <main>
        <Hero />

        <Divider />
        <Projects />

        <Divider />
        <Experience />

        <Divider />
        <Skills />

        <Divider />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <footer className="text-center py-12 px-6 border-t border-border/50">
        <p className="text-text-muted text-sm">
          {nav.builtWith} <span className="text-accent">React</span> + <span className="text-accent">Vite</span> + <span className="text-accent">Tailwind CSS</span>
        </p>
        <p className="text-text-muted/60 text-xs mt-2">
          &copy; {new Date().getFullYear()} Nguyễn Trí Phong. {nav.rightsReserved}
        </p>
      </footer>
    </div>
  );
}

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <hr className="border-t border-border/40" />
    </div>
  );
}
