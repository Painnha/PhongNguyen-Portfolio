import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
  detailsUrl?: string;
  githubBackend?: string;
  imageAspect?: 'video' | 'portrait';
};

export function ProjectsSection() {
  const { t } = useLanguage();
  
  const projects: Project[] = [
    {
      title: t('projects.aiAdmissionTitle'),
      description: t('projects.aiAdmissionDesc'),
      image: '/MajorRecommendationTitleImage.png',
      tags: ['Node.js', 'Express ', 'MongoDB', 'JWT Authentication','Flask', 'TensorFlow/Keras','Scikit-learn','NumPy/Pandas','React', 'Chart.js','Neural Network'],
      category: 'AI',
      github: 'https://github.com/Painnha/TuyenSinhThongMinh-monorepo',
      demo: 'https://drive.google.com/file/d/1ZQFp54YsRSVnVXEBYxTQVkNWGEFUj_lu/view?usp=drive_link',
      // detailsUrl: '/projects/ai-admission-system.html',
    },
    {
      title: t('projects.pcastProTitle'),
      description: t('projects.pcastProDesc'),
      image: '/BanPickTitle.png',
      tags: ['Production', 'Node.js', 'Socket.io', 'OBS', 'HTML/CSS/JS'],
      category: 'Full-Stack',
      github: 'https://github.com/Painnha/PCastPro',
    },
    {
      title: t('projects.recipeFoodTitle'),
      description: t('projects.recipeFoodDesc'),
      image: '/RecipeFoodAppTitle.png',
      tags: ['React Native', 'Mobile'],
      category: 'Mobile',
      github: 'https://github.com/ThanhHiep25/LTTDD-Reactnative',
      imageAspect: 'portrait',
    },
    {
      title: t('projects.polaTitle'),
      description: t('projects.polaDesc'),
      image: '/EmployeeManagerSystem.png',
      tags: ['Java', 'Swing', 'SQL Server', 'Apache POI', 'JasperReports'],
      category: 'Backend',
      github: 'https://github.com/Painnha/employee-attendance-payroll-system',
    },
    {
      title: t('projects.iuhCheckinTitle'),
      description: t('projects.iuhCheckinDesc'),
      image: '/Check-in-app.png',
      tags: ['React', 'Node.js', 'JWT Authentication', 'Socket.io'],
      category: 'Full-Stack',
      github: 'https://github.com/Painnha/CheckIn_IUH_Frontend',
      githubBackend: 'https://github.com/Painnha/CheckIn_IUH_Backend',
      demo: 'https://checkin-iuh.netlify.app/home',
    },
    {
      title: t('projects.iuhEsportsTitle'),
      description: t('projects.iuhEsportsDesc'),
      image: '/Fanpage.png',
      tags: ['Community Management', 'Event Organization', 'Leadership', 'Social Media'],
      category: 'Community',
      demo: 'https://www.facebook.com/lqmiuh',
    }
  ];
  return (
    <section id="projects" className="py-20 px-4 bg-[#121212] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
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
            {t('projects.title')} <span className="text-[#FF6B00]">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-center text-[#B0B0B0] mb-12 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Card className="h-full bg-[#1E1E1E] border-[#2a2a2a] hover:border-[#FF6B00]/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-[#FF6B00]/20 hover:scale-[1.02]">
                {/* Project Image */}
                <div
                  className={`relative overflow-hidden aspect-video ${
                    project.imageAspect === 'portrait' ? 'bg-black' : ''
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full transition-transform duration-500 ${
                      project.imageAspect === 'portrait'
                        ? 'object-contain p-2'
                        : 'object-cover group-hover:scale-110'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent opacity-60" />
                  
                  {/* Overlay Actions - Desktop only */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-wrap px-4">
                    {project.githubBackend ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-[#FF6B00] hover:bg-[#FFA500] text-white"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          {t('projects.frontend')}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#FF6B00] hover:bg-[#FFA500] text-white"
                          onClick={() => window.open(project.githubBackend, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          {t('projects.backend')}
                        </Button>
                      </>
                    ) : (
                      project.github && (
                        <Button
                          size="sm"
                          className="bg-[#FF6B00] hover:bg-[#FFA500] text-white"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          {t('projects.code')}
                        </Button>
                      )
                    )}
                    {project.demo && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-[#121212]"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('projects.demo')}
                      </Button>
                    )}
                    {project.detailsUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                        onClick={() => window.open(project.detailsUrl as string, '_blank')}
                      >
                        {t('projects.details')}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mobile Actions - Below image */}
                <div className="flex md:hidden gap-2 p-3 bg-[#1E1E1E] border-b border-[#2a2a2a] flex-wrap">
                  {project.githubBackend ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-[#FF6B00] hover:bg-[#FFA500] text-white flex-1 min-w-[120px]"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-1" />
                        {t('projects.frontend')}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#FF6B00] hover:bg-[#FFA500] text-white flex-1 min-w-[120px]"
                        onClick={() => window.open(project.githubBackend, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-1" />
                        {t('projects.backend')}
                      </Button>
                    </>
                  ) : (
                    project.github && (
                      <Button
                        size="sm"
                        className="bg-[#FF6B00] hover:bg-[#FFA500] text-white flex-1"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        {t('projects.code')}
                      </Button>
                    )
                  )}
                  {project.demo && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white flex-1"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {t('projects.demo')}
                    </Button>
                  )}
                  {project.detailsUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                      onClick={() => window.open(project.detailsUrl as string, '_blank')}
                    >
                      {t('projects.details')}
                    </Button>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-white group-hover:text-[#FF6B00] transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-[#B0B0B0]">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 hover:bg-[#FF6B00]/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-8 transition-all duration-300"
            onClick={() => window.open('https://github.com/Painnha', '_blank')}
          >
            <Github className="mr-2 h-5 w-5" />
            {t('projects.viewAllGithub')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
