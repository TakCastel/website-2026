import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Calendar, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { Language } from '../../types';
import { useLocation, Link } from 'react-router-dom';

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

  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

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
    setStatus('sending');

    // Build mailto link
    const subject = `Projet Portfolio: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:contact@tariktalhaoui.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Simulate network delay for better UX, then open mailto and show success
    setTimeout(() => {
        window.location.href = mailtoLink;
        setStatus('success');
    }, 1500);
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
           
           <div className="w-full min-h-[400px]">
             <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-8 flex flex-col items-center text-center h-full justify-center"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/20">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="font-display text-3xl font-bold uppercase mb-4">
                            {lang === 'fr' ? "Message Envoyé !" : "Message Sent!"}
                        </h3>
                        <p className="opacity-70 text-lg mb-8 max-w-sm">
                            {lang === 'fr' 
                                ? "Tarik a bien reçu votre demande via votre client mail. Il reviendra vers vous sous 24h."
                                : "Tarik has received your request via your email client. He will get back to you within 24h."
                            }
                        </p>
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
                        >
                            {lang === 'fr' ? "Retour à l'accueil" : "Back Home"} <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0, x: 30 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -30 }}
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
                                disabled={status === 'sending'}
                                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display text-ink dark:text-off-white disabled:opacity-50" 
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
                                disabled={status === 'sending'}
                                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display text-ink dark:text-off-white disabled:opacity-50" 
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
                                disabled={status === 'sending'}
                                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-xl focus:border-accent focus:outline-none transition-colors font-display resize-none text-ink dark:text-off-white disabled:opacity-50" 
                                placeholder="Tell me about your vision..." 
                                required
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={status === 'sending'}
                            className="px-12 py-5 bg-ink text-white dark:bg-off-white dark:text-black font-display font-bold uppercase text-lg hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-colors w-full md:w-auto shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></span>
                                </span>
                            ) : (
                                <>{lang === 'fr' ? 'Envoyer' : 'Send'} <Send size={18} /></>
                            )}
                        </button>
                    </motion.form>
                )}
             </AnimatePresence>
           </div>
        </div>
     </div>
  );
};

export default Contact;