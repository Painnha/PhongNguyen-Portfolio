import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, FileText, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

type Achievement = {
  icon: React.ElementType;
  title: string;
  description: string;
  year: string;
  image?: string;
  links?: Array<{ url: string; label: string }>;
  type: 'image' | 'link' | 'multiple-links' | 'icon';
};

export function AchievementsSection() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const achievements: Achievement[] = [
    {
      icon: FileText,
      title: t('achievements.paperTitle'),
      description: t('achievements.paperDesc'),
      year: '2025',
      links: [{ url: 'https://vipro.dev/paper/conf/article/view/64', label: t('achievements.viewPaper') }],
      type: 'link',
    },
    {
      icon: Award,
      title: t('achievements.certTitle'),
      description: t('achievements.certDesc'),
      year: '2025',
      image: '/bangkhen.png',
      type: 'image',
    },
    {
      icon: Trophy,
      title: t('achievements.leaderWinterTitle'),
      description: t('achievements.leaderWinterDesc'),
      year: '2025',
      links: [{ url: 'https://www.facebook.com/share/p/182FchYLqv/', label: t('achievements.viewPost') }],
      type: 'link',
    },
    {
      icon: Trophy,
      title: t('achievements.leaderSpringTitle'),
      description: t('achievements.leaderSpringDesc'),
      year: '2025',
      links: [{ url: 'https://www.facebook.com/share/p/1Bqa9gb1Xc/', label: t('achievements.viewPost') }],
      type: 'link',
    },
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section id="achievements" className="py-20 px-4 bg-[#1E1E1E] text-white">
      <div className="container mx-auto max-w-6xl">
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
            {t('achievements.title')} <span className="text-[#FF6B00]">{t('achievements.titleHighlight')}</span>
          </h2>
          <p className="text-center text-[#B0B0B0] mb-12 max-w-2xl mx-auto">
            {t('achievements.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-[#121212] border-[#2a2a2a] overflow-hidden transition-all duration-300 hover:border-[#FF6B00]/50 hover:shadow-lg hover:shadow-[#FF6B00]/10">
                {/* Image for Certificate of Merit */}
                {achievement.type === 'image' && achievement.image && (
                  <div 
                    className="relative w-full bg-[#1E1E1E] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                    style={{ height: '120px' }}
                    onClick={() => setSelectedImage(achievement.image || null)}
                  >
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </div>
                )}

                <div className="p-6 text-center">
                  <CardHeader className="flex flex-col items-center p-0 mb-4">
                    {/* Show icon only if no image */}
                    {achievement.type !== 'image' && (
                      <div className="p-4 bg-[#FF6B00]/10 rounded-full mb-4">
                        <achievement.icon className="w-8 h-8 text-[#FF6B00]" />
                      </div>
                    )}
                    <CardTitle className="text-xl font-semibold text-white">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#B0B0B0] mb-4">{achievement.description}</p>
                    <p className="text-sm text-[#FF6B00] mb-4 font-mono">{achievement.year}</p>
                    
                    {/* Links */}
                    {achievement.links && achievement.links.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {achievement.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            size="sm"
                            variant="outline"
                            className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                            onClick={() => window.open(link.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {link.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[9998]"
              onClick={() => setSelectedImage(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div 
                className="relative max-w-4xl w-full max-h-[90vh] bg-[#121212] border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-[#121212]/80 backdrop-blur-sm rounded-full text-white hover:text-[#FF6B00] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Image */}
                <div className="relative w-full max-h-[90vh] overflow-auto bg-[#1E1E1E]">
                  <img
                    src={selectedImage}
                    alt="Certificate"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
