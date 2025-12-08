import React, { useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Clapperboard, Palette, PenTool, Printer, Users, User, Share2, Layers, Zap, XCircle, CheckCircle, Monitor } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, TEAM_MEMBERS } from '../../constants';
import { Language } from '../../types';

interface HomeProps {
  lang: Language;
  navigateTo: (view: any) => void;
  setHoveredProject: (id: string | null) => void;
}

const Home: React.FC<HomeProps> = ({ lang, navigateTo, setHoveredProject }) => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const bgShapeY = useTransform(scrollY, [0, 1000], [0, -300]);

  const featuredProject = PROJECTS.find(p => p.id === 'polinizz');
  const allProjects = PROJECTS.filter(p => p.id !== 'polinizz');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  const getPartnerIcon = (idx: number) => {
     switch(idx) {
        case 1: return <Clapperboard className="w-8 h-8 text-accent mb-4" />;
        case 2: return <Palette className="w-8 h-8 text-accent mb-4" />;
        case 3: return <Printer className="w-8 h-8 text-accent mb-4" />;
        default: return <PenTool className="w-8 h-8 text-accent mb-4" />;
     }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative pt-20 overflow-hidden">
         {/* Decorative background blur - Parallax */}
         <motion.div 
           style={{ y: bgShapeY }}
           className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
         ></motion.div>
          <motion.div 
           style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
           className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
         ></motion.div>

         <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full z-10">
           <motion.div variants={containerVariants} initial="hidden" animate="visible">
             <div className="overflow-hidden mb-2">
               <motion.h1 variants={itemVariants} className="font-display text-[13vw] leading-[0.8] font-bold uppercase tracking-tighter text-ink dark:text-off-white">
                 Product
               </motion.h1>
             </div>
             <div className="overflow-hidden mb-8 md:pl-24">
               <motion.h1 
                  variants={itemVariants} 
                  className="font-display text-[13vw] leading-[0.8] font-bold uppercase tracking-tighter text-ink dark:text-off-white"
               >
                 Builder
               </motion.h1>
             </div>

             <motion.div variants={itemVariants} className="grid md:grid-cols-12 gap-8 mt-12 border-t border-black/10 dark:border-white/10 pt-8">
                <div className="md:col-span-5">
                   <p className="text-lg md:text-xl opacity-70 leading-relaxed font-light text-ink dark:text-off-white">
                      {PERSONAL_INFO.bio[lang]}
                   </p>
                </div>
                <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4 text-ink dark:text-off-white">
                   <div className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
                      {lang === 'fr' ? 'Rôle' : 'Role'}
                   </div>
                   <div className="font-display text-2xl">Lead Tech &<br/>Creative Dev</div>
                </div>
                <div className="md:col-span-3 flex flex-col gap-4 text-ink dark:text-off-white">
                   <div className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
                      {lang === 'fr' ? 'Localisation' : 'Location'}
                   </div>
                   <div className="font-display text-2xl">Avignon,<br/>France</div>
                </div>
             </motion.div>

             <motion.div variants={itemVariants} className="mt-20">
                <button onClick={() => navigateTo('contact')} className="group flex items-center gap-4 text-xl font-display font-bold uppercase hover:text-accent transition-colors text-ink dark:text-off-white">
                   <span className="w-12 h-12 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all">
                      <ArrowDown className="group-hover:translate-y-1 transition-transform" />
                   </span>
                   {lang === 'fr' ? 'Démarrer un projet' : 'Start a Project'}
                </button>
             </motion.div>
           </motion.div>
         </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="py-12 border-y border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 overflow-hidden whitespace-nowrap flex">
         <motion.div 
           animate={{ x: [0, -1000] }} 
           transition={{ ease: "linear", duration: 30, repeat: Infinity }}
           className="flex gap-12 text-6xl md:text-8xl font-display font-bold uppercase text-black/5 dark:text-white/5"
         >
           <span>React</span> <span>Next.js</span> <span>Node.js</span> <span>Design</span> <span>Strategy</span> <span>Architecture</span> <span>Creative</span>
           <span>React</span> <span>Next.js</span> <span>Node.js</span> <span>Design</span> <span>Strategy</span> <span>Architecture</span> <span>Creative</span>
         </motion.div>
      </div>

      {/* POLINIZZ HIGHLIGHT - LIVE PREVIEW VERSION */}
      {featuredProject && (
        <section className="py-32 px-6 md:px-12 relative text-ink dark:text-off-white">
           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex items-end justify-between"
           >
              <div>
                 <div className="text-accent font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                   <span className="w-8 h-[1px] bg-accent"></span> 
                   {lang === 'fr' ? 'Produit Phare' : 'Flagship Product'}
                 </div>
                 <h2 className="font-display text-5xl md:text-7xl font-bold uppercase">Polinizz</h2>
              </div>
              <a href={featuredProject.link} target="_blank" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors">
                 {lang === 'fr' ? 'Visiter le site' : 'Visit Website'} <ArrowUpRight />
              </a>
           </motion.div>

           <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group rounded-xl shadow-2xl border border-white/5 bg-white"
           >
              {/* Browser Header Bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 dark:bg-zinc-800 z-20 flex items-center px-4 gap-2 border-b border-black/5 dark:border-white/5">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 <div className="ml-4 bg-white dark:bg-black/20 px-3 py-1 rounded text-[10px] font-mono opacity-50 flex items-center gap-2">
                    <Monitor size={10} /> polinizz.fr
                 </div>
              </div>

              {/* Live Iframe */}
              {featuredProject.link ? (
                 <div className="w-full h-full pt-8 relative">
                    {/* Overlay for non-clickable effect */}
                    <a href={featuredProject.link} target="_blank" className="absolute inset-0 z-10 bg-transparent cursor-pointer" title="Open Website"></a>
                    <iframe 
                       src={featuredProject.link}
                       loading="lazy"
                       className="w-[200%] h-[200%] border-0 transform scale-50 origin-top-left pointer-events-none select-none bg-white"
                       tabIndex={-1}
                       title="Polinizz Live Preview"
                    />
                 </div>
              ) : (
                 <img 
                    src={featuredProject.image} 
                    alt="Polinizz App Interface" 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                 />
              )}
              
              <div className="absolute bottom-12 left-6 md:left-12 max-w-2xl pointer-events-none z-20">
                 <div className="bg-black/60 dark:bg-black/60 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-6">
                       {featuredProject.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-3">
                       {featuredProject.stack.map(s => (
                          <span key={s} className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white bg-white/5">
                             {s}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>
      )}

      {/* STUDIO MODEL / PROCESS SECTION - REVISED */}
      <section id="studio-model" className="py-24 px-6 md:px-12 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black text-ink dark:text-off-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 gap-16 items-start">
                
                {/* Text Side */}
                <motion.div 
                   initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                >
                   <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
                      <Zap size={14} /> {lang === 'fr' ? 'L\'Approche Hybride' : 'The Hybrid Approach'}
                   </div>
                   <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight">
                      {lang === 'fr' ? 'La puissance d\'une agence,' : 'Agency Power,'} <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                         {lang === 'fr' ? 'L\'agilité freelance.' : 'Freelance Agility.'}
                      </span>
                   </h2>
                   
                   <p className="text-lg opacity-70 leading-relaxed mb-8">
                      {lang === 'fr' 
                         ? "Je ne vends pas de frais de structure. Je vends de l'expertise." 
                         : "I don't sell overhead. I sell expertise."}
                      <br/><br/>
                      {lang === 'fr' 
                         ? "Je suis votre interlocuteur unique, l'architecte et le développeur principal. Si le projet nécessite une excellence visuelle spécifique (vidéo cinéma, branding 3D), j'active mon équipe senior dédiée."
                         : "I am your single point of contact, architect, and lead developer. If the project demands specific visual excellence (cinema-grade video, 3D branding), I plug in my dedicated senior squad."}
                   </p>

                   <div className="flex gap-6 items-center">
                      <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                         <CheckCircle className="text-green-500" size={18} /> {lang === 'fr' ? 'Experts Seniors uniquement' : 'Senior Experts Only'}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                         <CheckCircle className="text-green-500" size={18} /> {lang === 'fr' ? 'Transparence totale' : 'Total Transparency'}
                      </div>
                   </div>
                </motion.div>
                
                {/* Visual Side - Plug & Play Cards */}
                <motion.div 
                   initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                   className="relative"
                >
                   {/* Card 1: The Core */}
                   <div className="bg-ink dark:bg-surface text-white p-8 rounded-2xl shadow-xl relative z-20 border border-white/10">
                      <div className="flex justify-between items-start mb-6">
                         <div className="bg-accent p-3 rounded-lg">
                            <User size={24} className="text-white" />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                            {lang === 'fr' ? 'Le Cœur' : 'The Core'}
                         </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2">Tarik Talhaoui</h3>
                      <p className="text-sm opacity-60 mb-6 uppercase tracking-widest">Lead Tech & Product Builder</p>
                      
                      <ul className="space-y-3">
                         <li className="flex items-center gap-3 text-sm">
                            <Zap size={16} className="text-accent" /> {lang === 'fr' ? 'Architecture & Code' : 'Architecture & Code'}
                         </li>
                         <li className="flex items-center gap-3 text-sm">
                            <Zap size={16} className="text-accent" /> {lang === 'fr' ? 'Stratégie Produit' : 'Product Strategy'}
                         </li>
                         <li className="flex items-center gap-3 text-sm">
                            <Zap size={16} className="text-accent" /> {lang === 'fr' ? 'Qualité & Sécurité' : 'Quality & Security'}
                         </li>
                      </ul>
                   </div>

                   {/* Connection Line */}
                   <div className="h-16 w-1 bg-black/10 dark:bg-white/10 mx-auto -my-2 relative z-10"></div>

                   {/* Card 2: The Network */}
                   <div className="bg-paper dark:bg-white/5 p-8 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 relative z-10 backdrop-blur-sm">
                      <div className="flex justify-between items-start mb-6">
                         <div className="bg-black/10 dark:bg-white/10 p-3 rounded-lg text-ink dark:text-off-white">
                            <Users size={24} />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-widest bg-accent/10 text-accent px-3 py-1 rounded-full">
                            {lang === 'fr' ? 'À la carte' : 'On Demand'}
                         </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2 text-ink dark:text-off-white">
                         {lang === 'fr' ? 'Le Commando' : 'The Squad'}
                      </h3>
                      <p className="text-sm opacity-60 mb-6 uppercase tracking-widest text-ink dark:text-off-white">
                         {lang === 'fr' ? 'Experts Seniors Uniquement' : 'Senior Experts Only'}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/50 dark:bg-black/20 p-3 rounded text-xs font-bold text-center border border-black/5 dark:border-white/5 text-ink dark:text-off-white">
                            Video Cinema
                         </div>
                         <div className="bg-white/50 dark:bg-black/20 p-3 rounded text-xs font-bold text-center border border-black/5 dark:border-white/5 text-ink dark:text-off-white">
                            Branding 3D
                         </div>
                         <div className="bg-white/50 dark:bg-black/20 p-3 rounded text-xs font-bold text-center border border-black/5 dark:border-white/5 text-ink dark:text-off-white">
                            Motion Design
                         </div>
                         <div className="bg-white/50 dark:bg-black/20 p-3 rounded text-xs font-bold text-center border border-black/5 dark:border-white/5 text-ink dark:text-off-white">
                            Print / PAO
                         </div>
                      </div>
                   </div>

                </motion.div>

             </div>
          </div>
      </section>

      {/* NETWORK / PARTNERS */}
      <section className="py-32 px-6 md:px-12 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-ink dark:text-off-white">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mb-16"
          >
             <div className="text-accent font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent"></span> {lang === 'fr' ? 'Mon Équipe Satellite' : 'Satellite Team'}
             </div>
             <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-6">
                {lang === 'fr' ? 'Le Collectif' : 'The Collective'}
             </h2>
             <p className="text-lg opacity-60 max-w-2xl">
                {lang === 'fr' 
                  ? "Pour garantir un résultat d'exception, je m'entoure des meilleurs artisans numériques de la région." 
                  : "To guarantee exceptional results, I surround myself with the region's best digital craftsmen."}
             </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {TEAM_MEMBERS.map((member, idx) => (
                <motion.article 
                   key={idx} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 p-8 rounded-xl hover:border-accent transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-default relative overflow-hidden"
                >
                   {idx === 0 && <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div></div>}
                   {getPartnerIcon(idx)}
                   <h3 className="font-display text-xl font-bold uppercase mb-2 group-hover:text-accent transition-colors">{member.role[lang]}</h3>
                   <div className="w-8 h-[1px] bg-black/10 dark:bg-white/10 my-4 group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
                   <p className="text-sm opacity-60 leading-relaxed mb-4">
                      {member.description[lang]}
                   </p>
                   {member.name && <span className="text-xs font-bold uppercase tracking-widest opacity-40">{member.name}</span>}
                </motion.article>
             ))}
          </div>
      </section>

      {/* PROJECT LIST */}
      <section className="py-32 px-6 md:px-12 text-ink dark:text-off-white">
         <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-end justify-between mb-20 border-b border-black/10 dark:border-white/10 pb-8"
         >
            <h2 className="font-display text-4xl font-bold uppercase">{lang === 'fr' ? 'Sélection de travaux' : 'Selected Works'}</h2>
            <button onClick={() => navigateTo('projects')} className="text-sm uppercase tracking-widest hover:text-accent transition-colors">
               {lang === 'fr' ? 'Voir tout' : 'View All'} ({PROJECTS.length})
            </button>
         </motion.div>

         <div className="flex flex-col">
            {allProjects.slice(0, 5).map((project, idx) => (
               <motion.article 
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative border-b border-black/5 dark:border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between transition-colors hover:border-accent/50 cursor-pointer"
                  onClick={() => project.link && window.open(project.link, '_blank')}
               >
                  <div className="md:w-1/2">
                     <div className="text-xs opacity-40 mb-2 font-mono">0{idx + 1} / {project.category}</div>
                     <h3 className="font-display text-4xl md:text-6xl font-bold uppercase opacity-80 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300">
                        {project.title[lang]}
                     </h3>
                  </div>
                  <div className="md:w-1/3 mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col items-end">
                     <p className="text-sm text-right opacity-60 mb-4 max-w-xs">{project.description[lang]}</p>
                     <div className="flex gap-2">
                        {project.stack.slice(0, 2).map(s => (
                           <span key={s} className="text-[10px] uppercase border border-black/10 dark:border-white/10 px-2 py-1 rounded opacity-50">{s}</span>
                        ))}
                     </div>
                  </div>
               </motion.article>
            ))}
         </div>
      </section>
    </>
  );
};

export default Home;