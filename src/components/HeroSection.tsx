import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-transparent pt-32 md:pt-40 pb-20 md:pb-28 mb-24 md:mb-32">
      {/* Accent background */}
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-[#FF6B00]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-[#FFA500]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center w-full">
          {/* Avatar - Left on desktop, top on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start order-1"
          >
            <div className="relative">
              {/* Glow ring behind avatar - perfectly circular and higher contrast */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div
                  className="rounded-full"
                  style={{
                    width: '115%',
                    height: '115%',
                    background: 'radial-gradient(closest-side, rgba(255,107,0,0.35), rgba(255,107,0,0.18) 60%, rgba(255,107,0,0.0) 70%)',
                    filter: 'drop-shadow(0 0 24px rgba(255,107,0,0.45))',
                  }}
                />
              </div>
            <div 
              className="relative rounded-full overflow-hidden border-[3px] md:border-4 border-[#2a2a2a] ring-2 ring-[#FF6B00]/30 shadow-2xl"
              style={{
                width: isDesktop ? '675px' : '192px',
                height: isDesktop ? '675px' : '192px'
              }}
            >
                <img
                  src="/avatar.png"
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text - Right on desktop, below avatar on mobile */}
          <div className="order-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-2 text-white font-bold"
              style={{ 
                fontSize: isDesktop ? '48px' : '24px',
                lineHeight: isDesktop ? '1.1' : '1.2'
              }}
            >
              {t('hero.greeting')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="text-[#FF6B00] italic"
              style={{ 
                fontSize: isDesktop ? '24px' : '14px',
                marginBottom: isDesktop ? '24px' : '16px'
              }}
            >
              {t('hero.role')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[#B0B0B0] max-w-2xl"
              style={{ 
                fontSize: isDesktop ? '16px' : '12px',
                marginBottom: isDesktop ? '32px' : '24px'
              }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: isDesktop ? '16px' : '12px' }}>
                <Button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#FF6B00] hover:bg-[#FFA500] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B00]/40"
                  style={{
                    padding: isDesktop ? '24px 32px' : '16px 20px',
                    fontSize: isDesktop ? '16px' : '14px'
                  }}
                >
                  <Eye style={{ marginRight: '8px', width: isDesktop ? '20px' : '16px', height: isDesktop ? '20px' : '16px' }} />
                  {t('hero.viewProjects')}
                </Button>
                <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/CV - Nguyen Tri Phong.pdf';
                  link.download = 'CV - Nguyen Tri Phong.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                variant="outline"
                className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-all duration-300"
                style={{
                  padding: isDesktop ? '24px 32px' : '16px 20px',
                  fontSize: isDesktop ? '16px' : '14px'
                }}
              >
                <Download style={{ marginRight: '8px', width: isDesktop ? '20px' : '16px', height: isDesktop ? '20px' : '16px' }} />
                {t('hero.downloadResume')}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <motion.div
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-[#FF6B00]" />
      </motion.div>
    </section>
  );
}
