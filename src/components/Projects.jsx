import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

/**
 * Extract YouTube video ID or return raw URL if not YouTube
 */
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/
  );
  return match ? match[1] : null;
}

export default function Projects() {
  const { language } = useLanguage();
  const data = portfolioData[language];
  const { featuredProject, otherProjects } = data;

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  // ── Infinite Slider State ──
  const len = otherProjects.length;
  // Duplicate array 3 times: [cloned, original, cloned]
  const extendedProjects = [...otherProjects, ...otherProjects, ...otherProjects];
  
  const [currentIndex, setCurrentIndex] = useState(len); // Start at the beginning of the middle set
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor window size to adjust transition slide calculations
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync index when projects list length changes
  useEffect(() => {
    setCurrentIndex(len);
    setIsTransitioning(true);
  }, [len]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVideoOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = (e) => {
    // Ignore transition events bubbled from child elements (e.g. card/button hovers)
    if (e.target !== e.currentTarget) return;

    if (currentIndex >= 2 * len) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - len);
    } else if (currentIndex < len) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + len);
    }
  };

  // Reset transitioning state back to true on the next tick after an instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleOpenVideo = (videoUrl) => {
    if (!videoUrl) return;
    const yId = getYouTubeId(videoUrl);
    if (yId) {
      setActiveVideoUrl(`https://www.youtube.com/embed/${yId}?autoplay=1&rel=0`);
      setIsVideoOpen(true);
    } else {
      window.open(videoUrl, '_blank');
    }
  };

  const renderProjectButtons = (project) => {
    const buttons = [
      {
        key: 'live',
        label: 'Live Demo',
        icon: <ExternalLinkIcon />,
        url: project.liveUrl || project.demo || '',
      },
      {
        key: 'video',
        label: 'Video Demo',
        icon: <PlayIcon small />,
        url: project.videoUrl || '',
        onClick: (e) => {
          if (project.videoUrl) {
            e.preventDefault();
            handleOpenVideo(project.videoUrl);
          }
        }
      },
      {
        key: 'github',
        label: 'GitHub',
        icon: <GitHubIcon />,
        url: project.githubUrl || project.github || '',
      }
    ];

    return (
      <div className="grid grid-cols-3 gap-2 mt-4">
        {buttons.map((btn) => {
          if (btn.url) {
            if (btn.onClick) {
              return (
                <button
                  key={btn.key}
                  onClick={btn.onClick}
                  className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold rounded-lg border border-accent/40 text-accent bg-accent/5 hover:bg-accent hover:text-bg-primary transition-all duration-300 shadow-md cursor-pointer select-none"
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </button>
              );
            }
            return (
              <a
                key={btn.key}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold rounded-lg border border-accent/40 text-accent bg-accent/5 hover:bg-accent hover:text-bg-primary transition-all duration-300 shadow-md select-none text-center"
              >
                {btn.icon}
                <span>{btn.label}</span>
              </a>
            );
          }
          return (
            <button
              key={btn.key}
              disabled
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold rounded-lg border border-border/40 text-text-muted/40 cursor-not-allowed opacity-40 bg-transparent select-none"
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const fpVideoId = getYouTubeId(featuredProject.videoUrl);
  const fpHasVideo = !!fpVideoId;
  const fpThumbnailUrl = featuredProject.thumbnailUrl || (fpHasVideo
    ? `https://img.youtube.com/vi/${fpVideoId}/maxresdefault.jpg`
    : data.personal.avatar);

  // Translation calculation:
  // Mobile translates 100% + gap (24px) per project
  // Desktop translates 33.333% + gap/3 (8px) per project
  const translateValue = isMobile
    ? `translateX(calc(-${currentIndex} * (100% + 24px)))`
    : `translateX(calc(-${currentIndex} * (100% / 3 + 8px)))`;

  return (
    <>
      <section id="projects" className="px-6 py-20 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* ── Section Title ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-3 text-center">
              {language === 'en' ? 'Projects' : 'Dự án'}
            </h2>
            <div className="flex items-center gap-2 select-none pointer-events-none">
              <span className="h-0.5 w-8 bg-gradient-to-r from-transparent to-accent"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse"></span>
              <span className="h-0.5 w-8 bg-gradient-to-l from-transparent to-accent"></span>
            </div>
          </motion.div>

          {/* ── Featured Project ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px bg-accent-warm/40 flex-1"></span>
              <span className="text-sm font-extrabold uppercase text-accent-warm tracking-wider flex items-center gap-1 shrink-0">
                ⭐ {language === 'en' ? 'Featured Project' : 'Dự án nổi bật'}
              </span>
              <span className="h-px bg-accent-warm/40 flex-1"></span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left — Clickable Thumbnail */}
              <div
                className="group relative rounded-2xl overflow-hidden border border-border bg-bg-card shadow-lg cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-[0_0_40px_var(--th-accent-glow)]"
                onClick={() => fpHasVideo && handleOpenVideo(featuredProject.videoUrl)}
                role={fpHasVideo ? 'button' : undefined}
                tabIndex={fpHasVideo ? 0 : undefined}
                onKeyDown={(e) => {
                  if (fpHasVideo && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleOpenVideo(featuredProject.videoUrl);
                  }
                }}
              >
                <div className="aspect-video w-full relative">
                  {fpThumbnailUrl ? (
                    <>
                      <img
                        src={fpThumbnailUrl}
                        alt={`${featuredProject.name} demo`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      {/* Play button */}
                      {fpHasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_30px_var(--th-accent-glow)] group-hover:shadow-[0_0_50px_var(--th-accent-glow)] group-hover:scale-110 transition-all duration-300">
                            <PlayIcon />
                          </div>
                        </div>
                      )}
                      {/* Label */}
                      <span className="absolute bottom-4 left-4 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-white/90 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10">
                        ▶ {language === 'en' ? 'Watch Demo' : 'Xem Demo'}
                      </span>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-card text-text-muted">
                      <VideoPlaceholderIcon />
                      <span className="text-sm font-medium">{language === 'en' ? 'Demo video coming soon' : 'Video demo sắp ra mắt'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right — Details */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {featuredProject.type && (
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-accent to-accent-dim text-bg-primary px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-accent/20 border border-accent/30">
                      <RocketIcon />
                      {featuredProject.type}
                    </span>
                  )}
                  {featuredProject.revenue && (
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/20 border border-green-400/30">
                      <CurrencyIcon />
                      {featuredProject.revenue}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                  {featuredProject.name}
                </h3>

                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  {featuredProject.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent border border-accent/25"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <ul className="space-y-2">
                  {featuredProject.metrics.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                      <CheckIcon />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                {renderProjectButtons(featuredProject)}
              </div>
            </div>
          </motion.div>

          {/* ── Other Projects ── */}
          {len > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="mb-10 flex items-center gap-3">
                <span className="h-px bg-border/40 flex-1"></span>
                <span className="text-sm font-extrabold uppercase text-text-secondary tracking-wider shrink-0">
                  🚀 {language === 'en' ? 'Other Projects' : 'Các dự án khác'}
                </span>
                <span className="h-px bg-border/40 flex-1"></span>
              </div>

              {/* Slider Container with side padding for non-overlapping buttons */}
              <div className="relative px-12 md:px-16">
                
                {/* Left navigation button (inside padding, doesn't overlap) */}
                {len > 3 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-card/90 border border-border text-text-secondary hover:text-accent hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_var(--th-accent-glow)] select-none"
                    aria-label="Previous project"
                  >
                    <ChevronLeftIcon />
                  </button>
                )}

                {/* Carousel sliding viewport */}
                <div className="w-full overflow-hidden py-4">
                  <div
                    className="flex gap-6"
                    style={{
                      transform: translateValue,
                      transition: isTransitioning ? 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {extendedProjects.map((project, idx) => {
                      const isRealProject = idx >= len && idx < 2 * len;
                      return (
                        <article
                          key={`${project.name}-${idx}`}
                          className={`w-full md:w-[calc(33.333%-16px)] shrink-0 flex flex-col rounded-2xl border bg-bg-card/65 backdrop-blur-md transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_var(--th-accent-glow)] overflow-hidden ${
                            isRealProject ? 'border-border' : 'border-border/40 opacity-70'
                          }`}
                        >
                          {/* Image block */}
                          <div className="aspect-video w-full relative overflow-hidden bg-black/30 border-b border-border/60 group">
                            <ProjectImageSlider 
                              images={project.images || (project.image ? [project.image] : [])} 
                              name={project.name} 
                            />
                          </div>

                          {/* Content Block */}
                          <div className="flex flex-col flex-1 p-5">
                            <h4 className="text-base font-extrabold text-text-primary mb-2 line-clamp-2 min-h-[48px]">
                              {project.name}
                            </h4>
                            <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                              {project.description}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-bg-primary text-text-muted border border-border/60"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* Standard 3-buttons block */}
                            <div className="mt-auto pt-3 border-t border-border/30">
                              {renderProjectButtons(project)}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* Right navigation button (inside padding, doesn't overlap) */}
                {len > 3 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-card/90 border border-border text-text-secondary hover:text-accent hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_var(--th-accent-glow)] select-none"
                    aria-label="Next project"
                  >
                    <ChevronRightIcon />
                  </button>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* ── Video Modal for Video Demos ── */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsVideoOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-5xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 sm:-top-14 sm:-right-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <CloseIcon />
              </button>

              {/* Video iframe */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-black">
                <div className="aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={activeVideoUrl}
                    title="Video Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectImageSlider({ images, name }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-bg-primary text-text-muted opacity-60">
        <FolderIcon />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {images.map((img, i) => (
        <img
          key={`${img}-${i}`}
          src={img}
          alt={`${name} preview ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 500ms ease' }}
          loading="lazy"
        />
      ))}
    </div>
  );
}

/* ── Inline SVG Icons ── */

function PlayIcon({ small }) {
  return (
    <svg className={small ? "w-3.5 h-3.5 text-current shrink-0" : "w-8 h-8 text-white ml-1"} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function VideoPlaceholderIcon() {
  return (
    <svg className="w-16 h-16 text-text-muted/50" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887a.375.375 0 01.557-.328l5.603 3.113z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

function CurrencyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-current shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-current shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 00-3.8 23.38c.6.12.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.08-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.33 3.3 1.23a11.38 11.38 0 016 0c2.3-1.56 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.24 3.22c0 4.61-2.8 5.63-5.48 5.92a2.86 2.86 0 01.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 .3z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.06-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );
}
