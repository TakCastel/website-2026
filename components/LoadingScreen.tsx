import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Logique de chargement plus agressive et linéaire pour éviter l'effet "bloqué à la fin"
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
            clearInterval(timer);
            return 100;
        }
        
        // Incrémentation aléatoire mais soutenue (entre 5% et 15% par tick)
        // Plus on avance, plus on garde un rythme constant, fini le ralentissement excessif
        const remaining = 100 - prev;
        const jump = Math.floor(Math.random() * 15) + 5; 
        
        // Si on est proche de la fin, on termine d'un coup
        if (remaining < 10) return 100;

        return Math.min(prev + jump, 100);
      });
    }, 80); // Intervalle plus rapide (80ms vs 150ms)

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
      if (progress === 100) {
          // Délai très court une fois à 100% pour une sensation de rapidité
          const timeout = setTimeout(() => {
              onComplete();
          }, 200); // Réduit de 600ms à 200ms
          return () => clearTimeout(timeout);
      }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper dark:bg-void text-ink dark:text-off-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className="w-full max-w-sm px-8 relative">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-end mb-2 font-display"
        >
            <span className="text-sm font-bold uppercase tracking-widest opacity-60">System Loading</span>
            <span className="text-6xl font-bold text-accent tabular-nums">{progress}%</span>
        </motion.div>

        <div className="w-full h-[4px] bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
            />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest font-mono opacity-40">
            <span>Tarik Talhaoui</span>
            <span>Product Builder</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;