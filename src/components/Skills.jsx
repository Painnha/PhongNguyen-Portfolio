import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

/* Map category keys to display labels and emoji icons */
const categoryMeta = {
  en: {
    itSupport: { label: 'IT Support',          icon: '🛠️' },
    system:    { label: 'System & Network',    icon: '🌐' },
    av:        { label: 'AV & Broadcast',      icon: '📡' },
    software:  { label: 'Software Development',icon: '💻' },
    tools:     { label: 'Tools & Platforms',   icon: '🧰' },
  },
  vi: {
    itSupport: { label: 'Hỗ trợ IT',           icon: '🛠️' },
    system:    { label: 'Hệ thống & Mạng',     icon: '🌐' },
    av:        { label: 'AV & Phát sóng',      icon: '📡' },
    software:  { label: 'Phát triển Phần mềm',  icon: '💻' },
    tools:     { label: 'Công cụ & Nền tảng',   icon: '🧰' },
  }
};

export default function Skills() {
  const { language } = useLanguage();
  const data = portfolioData[language];
  const { skills } = data;
  const categories = Object.keys(skills);

  return (
    <section id="skills" className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-3 text-center">
            {language === 'en' ? 'Skills' : 'Kỹ năng'}
          </h2>
          <div className="flex items-center gap-2 select-none pointer-events-none">
            <span className="h-0.5 w-8 bg-gradient-to-r from-transparent to-accent"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse"></span>
            <span className="h-0.5 w-8 bg-gradient-to-l from-transparent to-accent"></span>
          </div>
        </motion.div>

        {/* ── Category Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const meta = categoryMeta[language]?.[cat] || { label: cat, icon: '📦' };
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-border-accent"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{meta.icon}</span>
                  <h3 className="text-lg font-bold text-text-primary">
                    {meta.label}
                  </h3>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {skills[cat].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-bg-primary/80 text-text-secondary border border-border transition-all duration-200 hover:text-accent hover:border-accent/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
