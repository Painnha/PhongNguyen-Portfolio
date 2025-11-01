import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  GitBranch, 
  Smartphone,
  Cloud,
  Brain,
  Users,
  Trophy,
  Target,
  MessageSquare,
  Wrench,
  Lock,
  Tv
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useLanguage } from '../contexts/LanguageContext';

export function SkillsSection() {
  const { t } = useLanguage();
  
  // Grouped skills for clear division
  const skillGroups = {
  frontend: {
    title: t('skills.frontend'),
    skills: [
      {
        name: t('skills.react'),
        icon: Code2,
        description: t('skills.reactDesc'),
        color: '#61DAFB',
        proficiency: 'high',
      },
      {
        name: t('skills.reactNative'),
        icon: Smartphone,
        description: t('skills.reactNativeDesc'),
        color: '#61DAFB',
        proficiency: 'high',
      },
      {
        name: t('skills.htmlCssJs'),
        icon: Code2,
        description: t('skills.htmlCssJsDesc'),
        color: '#E44D26',
        proficiency: 'high',
      },
    ]
  },
  backend: {
    title: t('skills.backend'),
    skills: [
      {
        name: t('skills.nodejs'),
        icon: Code2,
        description: t('skills.nodejsDesc'),
        color: '#339933',
        proficiency: 'high',
      },
      {
        name: t('skills.java'),
        icon: Code2,
        description: t('skills.javaDesc'),
        color: '#ED8B00',
        proficiency: 'high',
      },
      {
        name: t('skills.python'),
        icon: Code2,
        description: t('skills.pythonDesc'),
        color: '#3776AB',
        proficiency: 'high',
      },
      {
        name: t('skills.databases'),
        icon: Database,
        description: t('skills.databasesDesc'),
        color: '#4479A1',
        proficiency: 'high',
      },
      {
        name: t('skills.jwtAuth'),
        icon: Lock,
        description: t('skills.jwtAuthDesc'),
        color: '#FF6B00',
        proficiency: 'high',
      },
    ]
  },
  aiml: {
    title: t('skills.aiml'),
    skills: [
      {
        name: t('skills.tensorflow'),
        icon: Brain,
        description: t('skills.tensorflowDesc'),
        color: '#FF6F00',
        proficiency: 'high',
      },
      {
        name: t('skills.sklearn'),
        icon: Brain,
        description: t('skills.sklearnDesc'),
        color: '#F7931E',
        proficiency: 'high',
      },
      {
        name: t('skills.numpy'),
        icon: Database,
        description: t('skills.numpyDesc'),
        color: '#150458',
        proficiency: 'high',
      },
    ]
  },
  tools: {
    title: t('skills.tools'),
    skills: [
      {
        name: t('skills.git'),
        icon: GitBranch,
        description: t('skills.gitDesc'),
        color: '#F05032',
        proficiency: 'high',
      },
      {
        name: t('skills.aiAssisted'),
        icon: Brain,
        description: t('skills.aiAssistedDesc'),
        color: '#FF6B00',
        proficiency: 'high',
      },
      {
        name: t('skills.azure'),
        icon: Cloud,
        description: t('skills.azureDesc'),
        color: '#0078D4',
        proficiency: 'high',
      },
      {
        name: t('skills.obs'),
        icon: Tv,
        description: t('skills.obsDesc'),
        color: '#302E31',
        proficiency: 'medium',
      },
    ]
  },
};

  // Soft skills
  const softSkills = [
    {
      name: t('skills.leadership'),
      icon: Trophy,
      description: t('skills.leadershipDesc'),
      color: '#FF6B00',
    },
    {
      name: t('skills.eventManagement'),
      icon: Target,
      description: t('skills.eventManagementDesc'),
      color: '#FFA500',
    },
    {
      name: t('skills.teamwork'),
      icon: Users,
      description: t('skills.teamworkDesc'),
      color: '#FF6B00',
    },
    {
      name: t('skills.communication'),
      icon: MessageSquare,
      description: t('skills.communicationDesc'),
      color: '#FFA500',
    },
  ];
  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-[#121212] to-[#1E1E1E] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FFA500]/5 rounded-full blur-3xl" />
      
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
            {t('skills.title')} <span className="text-[#FF6B00]">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-center text-[#B0B0B0] mb-16 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Technical Skills Groups */}
        <TooltipProvider delayDuration={100}>
          {/* Main 3 columns: Frontend, Backend, AI/ML */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {(['frontend', 'backend', 'aiml'] as const).map((groupKey) => {
              const group = skillGroups[groupKey];
              return (
                <motion.div
                  key={groupKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col"
                >
                  <h3 className="text-[#FF6B00] mb-6 text-center text-xl">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-6">
                    {group.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03, duration: 0.3 }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ 
                                scale: 1.1,
                                y: -5,
                              }}
                              className={`
                                ${skill.proficiency === 'high' ? 'w-20 h-20' : 'w-16 h-16'}
                                bg-[#1E1E1E] border-2 border-[#2a2a2a] rounded-xl 
                                flex flex-col items-center justify-center gap-1 
                                cursor-pointer transition-all duration-300
                                hover:border-[#FF6B00] hover:shadow-lg hover:shadow-[#FF6B00]/20
                                group relative overflow-hidden
                              `}
                            >
                              <div 
                                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity"
                                style={{ 
                                  backgroundImage: `linear-gradient(135deg, ${skill.color || '#FF6B00'}, transparent)` 
                                }}
                              />
                              
                              <skill.icon 
                                className="transition-colors duration-300 group-hover:drop-shadow-lg"
                                style={{ 
                                  width: skill.proficiency === 'high' ? '32px' : '24px',
                                  height: skill.proficiency === 'high' ? '32px' : '24px',
                                  color: skill.color || '#FF6B00',
                                }} 
                              />
                              <span 
                                className="text-[#B0B0B0] group-hover:text-white transition-colors text-center"
                                style={{ fontSize: skill.proficiency === 'high' ? '10px' : '9px' }}
                              >
                                {skill.name}
                              </span>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent 
                            className="bg-[#1E1E1E] border-[#FF6B00] text-white max-w-xs"
                            side="top"
                          >
                            <p className="font-medium mb-1">{skill.name}</p>
                            <p className="text-[#B0B0B0]" style={{ fontSize: '14px' }}>
                              {skill.description || 'Key tool in my workflow'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Secondary groups below */}
          {(['tools'] as const).map((groupKey) => {
            const group = skillGroups[groupKey];
            return (
              <motion.div
                key={groupKey}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h3 className="text-[#FF6B00] mb-6 text-center text-xl">
                  {group.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {group.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ 
                              scale: 1.1,
                              y: -5,
                            }}
                            className={`
                              ${skill.proficiency === 'high' ? 'w-20 h-20' : 'w-16 h-16'}
                              bg-[#1E1E1E] border-2 border-[#2a2a2a] rounded-xl 
                              flex flex-col items-center justify-center gap-1 
                              cursor-pointer transition-all duration-300
                              hover:border-[#FF6B00] hover:shadow-lg hover:shadow-[#FF6B00]/20
                              group relative overflow-hidden
                            `}
                          >
                            <div 
                              className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity"
                              style={{ 
                                backgroundImage: `linear-gradient(135deg, ${skill.color || '#FF6B00'}, transparent)` 
                              }}
                            />
                            
                            <skill.icon 
                              className="transition-colors duration-300 group-hover:drop-shadow-lg"
                              style={{ 
                                width: skill.proficiency === 'high' ? '32px' : '24px',
                                height: skill.proficiency === 'high' ? '32px' : '24px',
                                color: skill.color || '#FF6B00',
                              }} 
                            />
                            <span 
                              className="text-[#B0B0B0] group-hover:text-white transition-colors text-center"
                              style={{ fontSize: skill.proficiency === 'high' ? '10px' : '9px' }}
                            >
                              {skill.name}
                            </span>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="bg-[#1E1E1E] border-[#FF6B00] text-white max-w-xs"
                          side="top"
                        >
                          <p className="font-medium mb-1">{skill.name}</p>
                          <p className="text-[#B0B0B0]" style={{ fontSize: '14px' }}>
                            {skill.description || 'Key tool in my workflow'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </TooltipProvider>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-[#FF6B00] mb-6 text-center text-xl">
            {t('skills.softSkills')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-4 bg-[#1E1E1E] border border-[#2a2a2a] rounded-lg 
                        hover:border-[#FF6B00] transition-all duration-300 cursor-pointer
                        hover:shadow-lg hover:shadow-[#FF6B00]/10 group flex items-center gap-3"
                    >
                      <div className="p-2 bg-[#FF6B00]/10 rounded-lg group-hover:bg-[#FF6B00]/20 transition-colors">
                        <skill.icon 
                          className="w-5 h-5" 
                          style={{ color: skill.color }}
                        />
                      </div>
                      <span className="text-[#B0B0B0] group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent 
                    className="bg-[#1E1E1E] border-[#FF6B00] text-white max-w-xs"
                    side="top"
                  >
                    <p className="font-medium mb-1">{skill.name}</p>
                    <p className="text-[#B0B0B0]" style={{ fontSize: '14px' }}>
                      {skill.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1E1E] border border-[#FF6B00]/30 rounded-full">
            <Wrench className="w-4 h-4 text-[#FF6B00]" />
            <p className="text-[#B0B0B0]">
              {t('skills.alwaysLearning')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}