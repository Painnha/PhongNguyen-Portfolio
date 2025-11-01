import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.achievements'), href: '#achievements' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121212]/95 backdrop-blur-lg shadow-lg border-b border-[#2a2a2a]'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#FFA500] rounded-lg flex items-center justify-center transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-300">
                <span className="text-white transform -rotate-45 group-hover:-rotate-[225deg] transition-transform duration-300" style={{ fontSize: '20px' }}>
                  P
                </span>
              </div>
              <span className="hidden md:block text-white" style={{ fontSize: '18px' }}>
                PhongNguyen
              </span>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative text-[#B0B0B0] hover:text-white transition-colors ${
                    activeSection === item.href.substring(1) ? 'text-[#FF6B00]' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF6B00]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                className="flex items-center gap-2 px-3 py-2 bg-[#1E1E1E] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FF6B00] rounded-lg transition-all duration-300 group"
              >
                <Globe className="w-4 h-4 text-[#B0B0B0] group-hover:text-[#FF6B00] transition-colors" />
                <span className="text-[#B0B0B0] group-hover:text-white transition-colors text-sm font-medium">
                  {language === 'en' ? 'EN' : 'VI'}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button & Language Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                className="flex items-center gap-1 px-2 py-1 bg-[#1E1E1E] border border-[#2a2a2a] rounded-lg"
              >
                <Globe className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-[#FF6B00] text-xs font-medium">
                  {language === 'en' ? 'EN' : 'VI'}
                </span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-[#FF6B00] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : '100%',
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 bottom-0 w-64 bg-[#1E1E1E] z-40 md:hidden shadow-2xl border-l border-[#2a2a2a]"
      >
        <div className="flex flex-col gap-2 p-6 mt-20">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg hover:bg-[#2a2a2a] transition-colors ${
                activeSection === item.href.substring(1)
                  ? 'bg-[#FF6B00]/10 text-[#FF6B00] border-l-4 border-[#FF6B00]'
                  : 'text-[#B0B0B0]'
              }`}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
