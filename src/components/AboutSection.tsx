import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Trophy, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: GraduationCap,
      text: t('about.highlight1'),
    },
    {
      icon: Code,
      text: t('about.highlight2'),
    },
    {
      icon: Trophy,
      text: t('about.highlight3'),
    },
    {
      icon: Users,
      text: t('about.highlight4'),
    },
  ];
  return (
    <section id="about" className="py-20 px-4 bg-[#121212] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="mb-4 text-center"
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            {t('about.title')} <span className="text-[#FF6B00]">{t('about.titleHighlight')}</span>
          </h2>
          <p className="text-center text-[#B0B0B0] mb-16 max-w-2xl mx-auto text-sm md:text-lg">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Code Visual (kept compact) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00] to-[#FFA500] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative p-4 md:p-6 bg-[#1E1E1E] rounded-lg overflow-x-auto border-2 border-[#FF6B00]/20">
                <pre className="text-xs md:text-sm overflow-x-auto whitespace-pre">
                  <code className="language-js block">
{`function integrateAITools(workflow) {
  const cursor = require('cursor-ai');
  const chatGPT = require('chatgpt-api');
  const grok = require('grok-assistant');

  if (workflow.needsOptimization) {
    cursor.generateCode('React component');
    chatGPT.debug('SQL query');
    grok.research('TensorFlow');
  }

  return 'Workflow accelerated';
}

// Use in project
integrateAITools({ project: '${t('about.codeComment')}' });`}
                  </code>
                </pre>
                <div className="mt-4 flex gap-2 text-xs text-[#B0B0B0]">
                  <span className="px-2 py-1 bg-[#FF6B00]/10 rounded">OUTPUT</span>
                  <span className="px-2 py-1 bg-[#FF6B00]/10 rounded">DEBUG CONSOLE</span>
                  <span className="px-2 py-1 bg-[#FF6B00]/10 rounded">TERMINAL</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text Content (shortened version) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <h3 className="mb-4 md:mb-6 text-[#FF6B00] text-xl md:text-3xl font-bold">
              {t('about.myJourney')}
            </h3>
            <p className="mb-4 md:mb-6 text-[#B0B0B0] leading-relaxed text-sm md:text-xl">
              {t('about.para1')}
            </p>
            <p className="mb-4 md:mb-6 text-[#B0B0B0] leading-relaxed text-sm md:text-xl">
              {t('about.para2')}
            </p>
            <p className="mb-6 md:mb-8 text-[#B0B0B0] leading-relaxed text-sm md:text-xl">
              {t('about.para3')}
            </p>

            {/* Key Highlights (kept for visual balance) */}
            <div className="space-y-4 md:space-y-5">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 md:gap-5 group w-full"
                >
                  <div className="mt-1 p-2 md:p-3 bg-[#FF6B00]/10 rounded-lg group-hover:bg-[#FF6B00]/20 transition-colors flex-shrink-0">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B00]" />
                  </div>
                  <p className="text-[#B0B0B0] flex-1 text-sm md:text-xl break-words">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 md:mt-12 p-3 md:p-4 bg-[#1E1E1E] border border-[#FF6B00]/20 rounded-lg w-full"
            >
              <p className="text-[#FF6B00] text-sm md:text-xl">
                {t('about.openToRoles')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}