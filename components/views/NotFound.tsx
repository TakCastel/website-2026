import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';

interface NotFoundProps {
  lang: Language;
  onReturn: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ lang, onReturn }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center text-ink dark:text-off-white">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-display text-9xl font-bold text-accent mb-4"
      >
        404
      </motion.h1>
      <h2 className="text-2xl uppercase tracking-widest font-bold mb-8">
        {lang === 'fr' ? 'Page Introuvable' : 'Page Not Found'}
      </h2>
      <button 
        onClick={onReturn}
        className="px-8 py-4 border border-black/20 dark:border-white/20 hover:bg-accent hover:border-accent hover:text-white transition-all uppercase tracking-widest text-sm font-bold rounded"
      >
        {lang === 'fr' ? "Retour à l'accueil" : "Return Home"}
      </button>
    </div>
  );
};

export default NotFound;