import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Workflow, CheckCircle } from 'lucide-react';
import { SKILLS_DATA, SERVICES, PROCESS_STEPS, CAREER_STORY, TECH_DEFINITIONS } from '../../constants';
import { Language } from '../../types';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="pt-32 px-6 md:px-12 pb-20 min-h-screen text-ink dark:text-off-white">
       
       {/* TECH STACK */}
       <motion.h2 
          initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          className="font-display text-6xl md:text-8xl font-bold uppercase mb-24"
       >
          {lang === 'fr' 
            ? <><span className="block">Stack</span>Technique<span className="text-accent">.</span></>
            : <><span className="block">Tech</span>Stack<span className="text-accent">.</span></>
          }
       </motion.h2>
       
       <div className="grid gap-12 mb-20">
          {SKILLS_DATA.map((cat, idx) => (
             <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/50 dark:bg-surface/50 p-8 md:p-12 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm backdrop-blur-sm"
             >
                <div className="flex items-center gap-3 mb-8">
                   <Terminal className="text-accent w-6 h-6" />
                   <h3 className="font-display text-2xl font-bold uppercase opacity-70">{cat.name[lang]}</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                   {cat.skills.map((skill, sIdx) => (
                      <div 
                         key={sIdx} 
                         className="relative group"
                         onMouseEnter={() => setHoveredSkill(skill)}
                         onMouseLeave={() => setHoveredSkill(null)}
                      >
                         <span 
                           className="block text-3xl md:text-5xl font-display font-bold text-ink/80 dark:text-off-white/80 transition-all duration-300 cursor-default hover:text-accent hover:scale-[1.02]"
                         >
                            {skill}
                         </span>
                         
                         {/* TOOLTIP */}
                         <AnimatePresence>
                           {hoveredSkill === skill && TECH_DEFINITIONS[skill] && (
                              <motion.div
                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                 animate={{ opacity: 1, y: 0, scale: 1 }}
                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                 transition={{ duration: 0.2 }}
                                 className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-ink dark:bg-white text-white dark:text-black p-3 rounded-lg text-xs font-sans shadow-xl z-20 pointer-events-none text-center"
                              >
                                 {TECH_DEFINITIONS[skill][lang]}
                                 <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-ink dark:border-t-white"></div>
                              </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                   ))}
                </div>
             </motion.div>
          ))}
       </div>

       {/* DISCREET PHILOSOPHY SECTION */}
       <section className="mb-32 max-w-4xl mx-auto py-12 border-y border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-xl px-8 md:px-12 mt-12">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center"
          >
             <h3 className="font-display text-lg font-bold uppercase mb-4 tracking-widest text-accent">
                {CAREER_STORY.title[lang]}
             </h3>
             <p className="text-lg md:text-xl leading-relaxed opacity-80 italic">
                "{CAREER_STORY.content[lang]}"
             </p>
          </motion.div>
       </section>

       {/* DETAILED PROCESS SECTION */}
       <div className="pt-10">
          <motion.div 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
             className="text-center mb-20"
          >
             <div className="inline-block p-3 rounded-full bg-accent/10 text-accent mb-4">
               <Workflow size={32} />
             </div>
             <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">
                 {lang === 'fr' ? 'Méthodologie' : 'Methodology'}
             </h2>
             <p className="opacity-60 max-w-2xl mx-auto text-lg">
                {lang === 'fr' 
                  ? "Une approche rigoureuse pour des résultats prévisibles et performants." 
                  : "A rigorous approach for predictable and high-performance results."}
             </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
             {PROCESS_STEPS.map((step, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="relative p-6 border border-black/10 dark:border-white/10 rounded-xl hover:border-accent transition-colors bg-white/40 dark:bg-surface/40 backdrop-blur"
                >
                   <div className="text-6xl font-display font-bold text-black/5 dark:text-white/5 absolute top-4 right-4 pointer-events-none">
                      {step.number}
                   </div>
                   <div className="mb-4 text-accent">
                      {idx === 0 && <CheckCircle size={24} />}
                      {idx === 1 && <Workflow size={24} />}
                      {idx === 2 && <Shield size={24} />}
                      {idx === 3 && <Terminal size={24} />}
                   </div>
                   <h3 className="font-display text-xl font-bold uppercase mb-4">{step.title[lang]}</h3>
                   <p className="text-sm opacity-70 leading-relaxed">
                      {step.description[lang]}
                   </p>
                </motion.div>
             ))}
          </div>

          {/* SERVICES GRID */}
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-16 text-center">
              {lang === 'fr' ? 'Services' : 'Services'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => (
                 <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-t border-black/20 dark:border-white/20 pt-8 hover:border-accent transition-colors duration-500 group"
                 >
                    <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity font-mono text-accent">0{idx + 1}</div>
                    <h3 className="font-display text-2xl font-bold uppercase mb-6 group-hover:text-accent transition-colors">{service.title[lang]}</h3>
                    <p className="opacity-60 mb-8 leading-relaxed h-20">
                       {service.description[lang]}
                    </p>
                    <ul className="space-y-2">
                       {service.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm opacity-80">
                             <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                             {typeof f === 'string' ? f : f[lang]}
                          </li>
                       ))}
                    </ul>
                 </motion.div>
              ))}
           </div>
       </div>
    </div>
  );
};

export default Services;