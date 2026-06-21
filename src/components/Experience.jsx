import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { language } = useLanguage();
  const data = portfolioData[language];
  const { experience, achievements } = data;

  const [selectedImage, setSelectedImage] = useState(null);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage]);

  return (
    <>
      <section id="experience" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* ── Section Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-3 text-center">
              {language === 'en' ? 'Experience' : 'Kinh nghiệm'}
            </h2>
            <div className="flex items-center gap-2 select-none pointer-events-none">
              <span className="h-0.5 w-8 bg-gradient-to-r from-transparent to-accent"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse"></span>
              <span className="h-0.5 w-8 bg-gradient-to-l from-transparent to-accent"></span>
            </div>
          </motion.div>

          {/* ── Timeline ── */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-border to-transparent" />

            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative pl-12 sm:pl-16 group"
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-bg-primary transition-shadow duration-300 group-hover:ring-accent/20 group-hover:shadow-[0_0_12px_var(--th-accent-glow)]" />

                  {/* Card */}
                  <div className="p-6 rounded-2xl border border-border bg-bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-border-accent hover:bg-bg-card">
                    {/* Duration chip */}
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-text-muted border border-border rounded-md mb-3">
                      {exp.duration}
                    </span>

                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-accent font-medium mb-4">{exp.company}</p>

                    <ul className="space-y-2">
                      {exp.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2.5 text-text-secondary text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Achievements (compact subsection) ── */}
          {achievements && achievements.length > 0 && (
            <div className="mt-20">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-accent-warm border border-accent-warm/30 rounded-full bg-accent-warm-glow mb-4">
                  🏆 {language === 'en' ? 'Awards & Achievements' : 'Giải thưởng & Thành tích'}
                </span>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group p-5 rounded-2xl border border-border bg-bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-accent-warm/40 hover:bg-bg-card/75 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview (Achievements cover image) */}
                      {item.image && (
                        <div
                          className="relative w-full h-36 bg-bg-primary rounded-xl overflow-hidden cursor-pointer hover:opacity-85 transition-all duration-300 flex items-center justify-center mb-4 border border-border/40 hover:border-accent-warm/35 group-hover:shadow-md"
                          onClick={() => setSelectedImage(item.image)}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          {/* Search / Zoom Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <span className="text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                              🔍 {language === 'en' ? 'View Document' : 'Xem tài liệu'}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <span className="text-xl shrink-0 mt-0.5">
                          {item.image ? '📜' : item.link ? '🏅' : '🏆'}
                        </span>
                        <div className="min-w-0">
                          <h4
                            className={`text-sm font-bold text-text-primary mb-1 transition-colors ${
                              item.image ? 'cursor-pointer hover:text-accent-warm hover:underline' : 'group-hover:text-accent-warm'
                            }`}
                            onClick={() => item.image && setSelectedImage(item.image)}
                          >
                            {item.title}
                          </h4>
                          <p className="text-xs text-text-secondary leading-relaxed mb-3">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/30">
                      <span className="text-xs text-text-muted font-mono">{item.year}</span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-accent-warm hover:underline underline-offset-2 font-medium"
                        >
                          <ExternalLinkIcon />
                          {language === 'en' ? 'View Post' : 'Xem bài viết'}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Image Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-50"
              aria-label="Close image viewer"
            >
              <CloseIcon />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Achievement Document"
                className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Icons ── */

function ExternalLinkIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
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
