import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

// Custom inline SVG definitions to avoid external dependencies
function Mail(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowUp(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function Send(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function Linkedin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/phongnguyentri', color: '#0077B5' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Painnha', color: '#FFFFFF' },
];

export default function Contact() {
  const { language } = useLanguage();
  const data = portfolioData[language];
  const t = data.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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
          access_key: '43607c7b-cafb-40cf-ba92-2a733a3e7b54',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission from Portfolio',
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        toast.success(t.messageSent);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error(t.messageFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-bg-primary relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-warm/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-3 text-center">
            {language === 'en' ? 'Contact' : 'Liên hệ'}
          </h2>
          <div className="flex items-center gap-2 select-none pointer-events-none mb-6">
            <span className="h-0.5 w-8 bg-gradient-to-r from-transparent to-accent"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse"></span>
            <span className="h-0.5 w-8 bg-gradient-to-l from-transparent to-accent"></span>
          </div>
          <p className="text-center text-text-secondary max-w-2xl mx-auto">
            {t.subtitle}
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
                <label htmlFor="name" className="block text-text-secondary font-medium mb-2">
                  {t.name}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-card/50 border border-border rounded-xl text-text-primary focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 focus:outline-none transition-all placeholder:text-text-muted"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-text-secondary font-medium mb-2">
                  {t.email}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-card/50 border border-border rounded-xl text-text-primary focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 focus:outline-none transition-all placeholder:text-text-muted"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-text-secondary font-medium mb-2">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-card/50 border border-border rounded-xl text-text-primary focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 focus:outline-none transition-all min-h-[150px] resize-none placeholder:text-text-muted"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-accent-warm hover:bg-accent-warm-dim text-white font-bold tracking-wide shadow-lg shadow-accent-warm/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_var(--th-accent-warm-glow)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? t.sending : t.send}
              </button>
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
            <div className="p-8 bg-bg-card/30 border border-border rounded-3xl backdrop-blur-md">
              <h3 className="mb-6 text-text-primary font-bold" style={{ fontSize: '24px' }}>
                {t.getInTouch}
              </h3>
              <p className="text-text-secondary mb-8">
                {t.getInTouchDesc}
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
                    className="flex items-center gap-4 p-3 rounded-xl bg-bg-primary/50 border border-border hover:bg-bg-card hover:border-accent-warm/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-accent-warm/10 rounded-lg group-hover:bg-accent-warm/20 transition-colors">
                      <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    </div>
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors">
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
                  className="flex items-center gap-4 p-3 rounded-xl bg-bg-primary/50 border border-border"
                >
                  <div className="p-2 bg-accent-warm/10 rounded-lg">
                    <Mail className="w-5 h-5" style={{ color: 'var(--th-accent-warm)' }} />
                  </div>
                  <span className="text-text-secondary font-medium">work@nguyentriphong.id.vn</span>
                </motion.div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-text-secondary" style={{ fontSize: '14px' }}>
                  {t.location}
                </p>
                <p className="text-text-secondary mt-2" style={{ fontSize: '14px' }}>
                  {t.available}
                </p>
              </div>
            </div>
          </motion.div>
        </div>


      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 p-4 bg-accent-warm hover:bg-accent-warm-dim text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-accent-warm/50 transition-all duration-300 z-50 hover:scale-110 cursor-pointer"
        whileHover={{ y: -5 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
