import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { Language } from '../../types';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  return (
    <div className="pt-32 px-6 md:px-12 pb-20 text-ink dark:text-off-white">
      <motion.h2 
         initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
         className="font-display text-6xl md:text-9xl font-bold uppercase mb-24 leading-none"
      >
         {lang === 'fr' 
           ? <><span className="block">Tous les</span>Projets<span className="text-accent">.</span></>
           : <><span className="block">All</span>Projects<span className="text-accent">.</span></>
         }
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
         {PROJECTS.map((project, idx) => (
            <motion.article 
               key={project.id} 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className={`group ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
               <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 overflow-hidden relative mb-8 rounded-lg shadow-lg">
                  <img 
                     src={project.image} 
                     alt={project.title[lang]} 
                     loading="lazy"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-md">
                     {project.category}
                  </div>
               </div>
               <div>
                  <h3 className="font-display text-3xl font-bold uppercase mb-3 text-ink dark:text-off-white">{project.title[lang]}</h3>
                  <p className="opacity-60 mb-6 text-sm leading-relaxed max-w-md text-ink dark:text-off-white">{project.description[lang]}</p>
                  {project.link && (
                     <a href={project.link} target="_blank" className="text-xs font-bold uppercase tracking-widest border-b border-black/20 dark:border-white/20 pb-1 hover:border-accent hover:text-accent transition-colors text-ink dark:text-off-white">
                        {lang === 'fr' ? 'Voir le projet' : 'View Project'}
                     </a>
                  )}
               </div>
            </motion.article>
         ))}
      </div>
    </div>
  );
};

export default Projects;