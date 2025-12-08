import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Calendar } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { Language } from '../../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/tariktalhaoui84/30min' });
    } else {
      window.open('https://calendly.com/tariktalhaoui84/30min', '_blank');
    }
  };

  return (
     <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 text-ink dark:text-off-white">
        <motion.h2 
           initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
           className="font-display text-[12vw] leading-[0.8] font-bold uppercase text-center mb-12"
        >
           Let's<br/><span className="text-accent">Build.</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-20 items-start max-w-6xl mx-auto w-full">
           <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-xl opacity-60 mb-12 leading-relaxed">
                 {lang === 'fr' 
                  ? "Vous avez un projet ambitieux ? Une refonte complexe ? Discutons de la structure technique et de l'expérience utilisateur."
                  : "Have an ambitious project? A complex redesign? Let's discuss technical structure and user experience."}
              </p>
              <div className="flex flex-col gap-6">
                 {/* Calendly Button */}
                 <button 
                    onClick={openCalendly}
                    className="flex items-center gap-4 bg-accent text-white px-6 py-4 rounded-lg hover:bg-accent-hover transition-colors shadow-lg group w-fit"
                 >
                    <Calendar className="group-hover:rotate-12 transition-transform" />
                    <span className="font-display font-bold uppercase tracking-widest text-sm">
                       {lang === 'fr' ? "Réserver un Audit (30min)" : "Book an Audit (30min)"}
                    </span>
                 </button>

                 <a href={`mailto:${PERSONAL_INFO.email}`} className="text-2xl font-display font-bold hover:text-accent transition-colors flex items-center gap-4 mt-4">
                    <Mail /> {PERSONAL_INFO.email}
                 </a>
                 <div className="flex gap-6 mt-4">
                    <a href={PERSONAL_INFO.socials.linkedin} target="_blank" className="p-4 border border-black/20 dark:border-white/20 rounded-full hover:bg-accent hover:border-accent hover:text-white transition-all">
                       <Linkedin size={24} />
                    </a>
                    <a href={PERSONAL_INFO.socials.github} target="_blank" className="p-4 border border-black/20 dark:border-white/20 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                       <Github size={24} />
                    </a>
                 </div>
              </div>
           </motion.div>
           
           <motion.form 
              initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="space-y-8 w-full" 
              onSubmit={(e) => e.preventDefault()}
           >
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest opacity-50">Name</label>
                 <input type="text" className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display text-ink dark:text-off-white" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
                 <input type="email" className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display text-ink dark:text-off-white" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest opacity-50">Project Info</label>
                 <textarea rows={4} className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display resize-none text-ink dark:text-off-white" placeholder="Tell me about your vision..."></textarea>
              </div>
              <button className="px-12 py-5 bg-ink text-white dark:bg-off-white dark:text-black font-display font-bold uppercase text-lg hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-colors w-full md:w-auto shadow-lg">
                 {lang === 'fr' ? 'Envoyer' : 'Send'}
              </button>
           </motion.form>
        </div>
     </div>
  );
};

export default Contact;