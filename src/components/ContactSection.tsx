import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUp, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/phongnguyentri', color: '#0077B5' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Painnha', color: '#FFFFFF' },
];

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '43607c7b-cafb-40cf-ba92-2a733a3e7b54', // Replace with your access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission from Portfolio',
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t('contact.messageSent'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error(t('contact.messageFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-[#1E1E1E] to-[#121212] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
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
            {t('contact.title')} <span className="text-[#FF6B00]">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-center text-[#B0B0B0] mb-12 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  {t('contact.name')}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#1E1E1E] border-[#2a2a2a] text-white focus:border-[#FF6B00] focus:ring-[#FF6B00]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  {t('contact.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#1E1E1E] border-[#2a2a2a] text-white focus:border-[#FF6B00] focus:ring-[#FF6B00]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#1E1E1E] border-[#2a2a2a] text-white focus:border-[#FF6B00] focus:ring-[#FF6B00] min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6B00] hover:bg-[#FFA500] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6B00]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="p-8 bg-[#1E1E1E] border border-[#2a2a2a] rounded-lg">
              <h3 className="mb-6 text-white" style={{ fontSize: '24px' }}>
                {t('contact.getInTouch')}
              </h3>
              <p className="text-[#B0B0B0] mb-8">
                {t('contact.getInTouchDesc')}
              </p>

              {/* Social Icons */}
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[#121212] hover:bg-[#2a2a2a] transition-all duration-300 group"
                  >
                    <div className="p-2 bg-[#FF6B00]/10 rounded-lg group-hover:bg-[#FF6B00]/20 transition-colors">
                      <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    </div>
                    <span className="text-[#B0B0B0] group-hover:text-white transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
                
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: socialLinks.length * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-[#121212]"
                >
                  <div className="p-2 bg-[#FF6B00]/10 rounded-lg">
                    <Mail className="w-5 h-5" style={{ color: '#FF6B00' }} />
                  </div>
                  <span className="text-[#B0B0B0]">work@nguyentriphong.id.vn</span>
                </motion.div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                <p className="text-[#B0B0B0]" style={{ fontSize: '14px' }}>
                  {t('contact.location')}
                </p>
                <p className="text-[#B0B0B0] mt-2" style={{ fontSize: '14px' }}>
                  {t('contact.available')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center pt-8 border-t border-[#2a2a2a]"
        >
          <p className="text-[#B0B0B0] mb-4">
            {t('contact.footer')}
          </p>
          <p className="text-[#B0B0B0]/60" style={{ fontSize: '14px' }}>
            {t('contact.footerSub')}
          </p>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 p-4 bg-[#FF6B00] hover:bg-[#FFA500] text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[#FF6B00]/50 transition-all duration-300 z-50 hover:scale-110"
        whileHover={{ y: -5 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
