import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { Language } from '../../types';
import { ArrowUpRight, Monitor } from 'lucide-react';

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
               className={`group flex flex-col h-full ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
               {/* Project Preview Container - Iframe / Live Embed */}
               <div 
                  className="aspect-[4/3] bg-gray-100 dark:bg-zinc-900 overflow-hidden relative mb-8 rounded-xl shadow-2xl border border-black/5 dark:border-white/10 group-hover:border-accent/50 transition-colors cursor-pointer"
                  onClick={() => project.link && window.open(project.link, '_blank')}
               >
                  {/* Header Bar simulation for browser look */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 dark:bg-zinc-800 z-20 flex items-center px-3 gap-1.5 border-b border-black/5 dark:border-white/5">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <div className="ml-auto flex items-center gap-1 opacity-50 text-[10px] font-mono uppercase">
                          <Monitor size={10} /> Live Preview
                      </div>
                  </div>

                  {project.link ? (
                    <div className="w-full h-full pt-6 relative bg-white">
                        {/* Overlay to prevent interaction inside iframe but allow clicking the card */}
                        <div className="absolute inset-0 z-10 bg-transparent"></div>
                        
                        {/* Iframe with Scale Transform to show Desktop View instead of Mobile */}
                        <iframe 
                            src={project.link}
                            title={project.title[lang]}
                            loading="lazy"
                            className="w-[200%] h-[200%] border-0 transform scale-50 origin-top-left pointer-events-none select-none"
                            tabIndex={-1}
                        />
                    </div>
                  ) : (
                    /* Fallback to image if no link provided */
                    <img 
                       src={project.image} 
                       alt={project.title[lang]} 
                       loading="lazy"
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}

                  <div className="absolute top-10 left-4 bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-md z-30">
                     {project.category}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-20 pointer-events-none"></div>
               </div>

               {/* Content Info */}
               <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-3xl font-bold uppercase text-ink dark:text-off-white group-hover:text-accent transition-colors">
                        {project.title[lang]}
                    </h3>
                    {project.link && (
                        <a href={project.link} target="_blank" className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                            <ArrowUpRight size={20} />
                        </a>
                    )}
                  </div>
                  
                  <p className="opacity-60 mb-6 text-sm leading-relaxed max-w-md text-ink dark:text-off-white flex-1">
                      {project.description[lang]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech) => (
                          <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-ink/60 dark:text-off-white/60">
                              {tech}
                          </span>
                      ))}
                  </div>
               </div>
            </motion.article>
         ))}
      </div>
    </div>
  );
};

export default Projects;