import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';

const NAV_ITEMS_EN = [
  { key: 'about', href: '#hero' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' },
];

export default function Navigation() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const nav = portfolioData[language].navigation;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Track scroll for backdrop + active section
  useEffect(() => {
    const sections = NAV_ITEMS_EN.map((item) => item.href.substring(1));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLabels = {
    about: nav.about,
    projects: nav.projects,
    experience: nav.experience,
    skills: nav.skills,
    contact: nav.contact,
  };

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-lg bg-bg-primary/80 border-b border-border/50 shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="text-lg font-bold text-accent tracking-tight hover:opacity-80 transition-opacity"
          >
            NTP<span className="text-text-muted">.</span>
          </a>

          {/* Desktop Links */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-text-secondary">
              {NAV_ITEMS_EN.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`relative transition-colors pb-1 ${
                      isActive ? 'text-accent' : 'hover:text-accent'
                    }`}
                  >
                    {navLabels[item.key]}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>


            {/* Language Toggle */}
            <div className="flex items-center gap-1 border border-border/80 bg-bg-card/50 p-1 rounded-full text-xs font-semibold select-none">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  language === 'en'
                    ? 'bg-accent text-bg-primary shadow-[0_0_12px_var(--th-accent-glow)]'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => language !== 'vi' && toggleLanguage()}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  language === 'vi'
                    ? 'bg-accent text-bg-primary shadow-[0_0_12px_var(--th-accent-glow)]'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                VI
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-text-secondary hover:text-accent transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 w-64 bg-bg-card z-50 sm:hidden shadow-2xl border-l border-border transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-2 p-6 mt-16">
          {NAV_ITEMS_EN.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`p-4 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-accent/10 text-accent border-l-4 border-accent'
                    : 'text-text-secondary hover:bg-bg-card-hover hover:text-text-primary'
                }`}
              >
                {navLabels[item.key]}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ── Inline SVG Icons ── */

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
