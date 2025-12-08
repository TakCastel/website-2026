import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Calendar, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { Language } from '../../types';
import { useLocation } from 'react-router-dom';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Check for prefilled message from configurator
  useEffect(() => {
    if (location.state && location.state.prefilledMessage) {
        setFormData(prev => ({ ...prev, message: location.state.prefilledMessage }));
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link
    const subject = `Projet Portfolio: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    // Trigger default mail client
    window.location.href = `mailto:contact@tariktalhaoui.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openCalendly = () => {
    // Check if Calendly script is already loaded
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/tariktalhaoui84/30min' });
    } else {
      // Lazy load the script only when requested
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
         // @ts-ignore
         window.Calendly.initPopupWidget({ url: 'https://calendly.com/tariktalhaoui84/30min' });
      };
      document.body.appendChild(script);
      
      const link = document.createElement('link');
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
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
                    aria-label={lang === 'fr' ? "Réserver un Audit (30min)" : "Book an Audit (30min)"}
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
                    <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 border border-black/20 dark:border-white/20 rounded-full hover:bg-accent hover:border-accent hover:text-white transition-all" aria-label="LinkedIn Profile">
                       <Linkedin size={24} />
                    </a>
                    <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="p-4 border border-black/20 dark:border-white/20 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all" aria-label="GitHub Profile">
                       <Github size={24} />
                    </a>
                 </div>
              </div>
           </motion.div>
           
           <motion.form 
              initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="space-y-8 w-full" 
              onSubmit={handleSubmit}
           >
              <div className="space-y-2">
                 <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest opacity-50">Name</label>
                 <input 
                    id="name" 
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display text-ink dark:text-off-white" 
                    placeholder="John Doe" 
                    required 
                 />
              </div>
              <div className="space-y-2">
                 <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
                 <input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display text-ink dark:text-off-white" 
                    placeholder="john@example.com" 
                    required 
                 />
              </div>
              <div className="space-y-2">
                 <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest opacity-50">Project Info</label>
                 <textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display resize-none text-ink dark:text-off-white" 
                    placeholder="Tell me about your vision..." 
                    required
                 ></textarea>
              </div>
              <button type="submit" className="px-12 py-5 bg-ink text-white dark:bg-off-white dark:text-black font-display font-bold uppercase text-lg hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-colors w-full md:w-auto shadow-lg flex items-center justify-center gap-2">
                 {lang === 'fr' ? 'Envoyer' : 'Send'} <Send size={18} />
              </button>
           </motion.form>
        </div>
     </div>
  );
};

export default Contact;