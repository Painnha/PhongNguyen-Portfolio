import { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { language } = useLanguage();
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const data = portfolioData[language];
  const { personal, cvLinks } = data;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCvMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />

      {/* Two-column layout: text left, avatar right on desktop */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left Column: Text Content ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* Greeting chip */}
          <span className="inline-block mb-6 px-4 py-1.5 text-sm font-medium tracking-wide text-accent border border-border-accent rounded-full bg-accent-glow backdrop-blur-sm animate-fade-in">
            {language === 'en' ? '👋 Welcome to my portfolio' : '👋 Chào mừng đến với portfolio của tôi'}
          </span>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-tight mb-4 animate-slide-up">
            {personal.name}
          </h1>

          {/* Title — orange accent */}
          <p className="text-xl sm:text-2xl font-semibold text-accent-warm mb-6 animate-slide-up [animation-delay:100ms]">
            {personal.title}
          </p>

          {/* Bio */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 animate-slide-up [animation-delay:200ms]">
            {personal.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-slide-up [animation-delay:300ms]">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-accent text-bg-primary font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:-translate-y-0.5"
            >
              <GitHubIcon />
              GitHub
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border-accent text-accent font-semibold transition-all duration-300 hover:bg-accent-glow hover:-translate-y-0.5"
            >
              <LinkedInIcon />
              LinkedIn
            </a>



            {/* Download CV Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCvMenuOpen((prev) => !prev)}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-accent-warm/40 text-accent-warm font-semibold transition-all duration-300 hover:border-accent-warm hover:bg-accent-warm/10 hover:-translate-y-0.5 cursor-pointer"
              >
                <DownloadIcon />
                {language === 'en' ? 'Download CV' : 'Tải xuống CV'}
                <ChevronDownIcon open={cvMenuOpen} />
              </button>

              {cvMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl border border-border bg-bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-in z-50">
                  <a
                    href={cvLinks.en}
                    download="CV_WebDev_NguyenTriPhong.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-bg-card-hover hover:text-accent-warm transition-colors"
                  >
                    <FileIcon />
                    {language === 'en' ? 'Web Developer CV English' : 'Web Developer CV Tiếng Anh'}
                  </a>
                  <a
                    href={cvLinks.vi}
                    download="CV_WebDev_NguyenTriPhong_Vi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-bg-card-hover hover:text-accent-warm transition-colors border-t border-border/40"
                  >
                    <FileIcon />
                    {language === 'en' ? 'Web Developer CV Vietnamese' : 'Web Developer CV Tiếng Việt'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column: Avatar ── */}
        <div className="relative flex-shrink-0 animate-slide-up [animation-delay:150ms]">
          {/* Orange glow behind avatar */}
          <div className="absolute inset-0 m-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-accent-warm/30 blur-[80px]" />
          <img
            src={personal.avatar}
            alt={personal.name}
            className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full object-cover ring-4 ring-accent-warm/30 shadow-2xl shadow-accent-warm/20"
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out both;
        }
      `}</style>
    </section>
  );
}

/* ── Inline SVG Icons ── */

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 00-3.8 23.38c.6.12.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.08-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.33 3.3 1.23a11.38 11.38 0 016 0c2.3-1.56 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.24 3.22c0 4.61-2.8 5.63-5.48 5.92a2.86 2.86 0 01.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 .3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11-.01-4.13 2.07 2.07 0 01.01 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 000 1.73v20.54A1.75 1.75 0 001.77 24h20.46A1.75 1.75 0 0024 22.27V1.73A1.75 1.75 0 0022.23 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function ChevronDownIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-accent-warm/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

