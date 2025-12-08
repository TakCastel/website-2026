import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulation d'un chargement non-linéaire pour un effet plus naturel
    const timer = setInterval(() => {
      setProgress((prev) => {
        const remaining = 100 - prev;
        // Plus on approche de 100, plus ça ralentit légèrement, puis ça finit vite
        const increment = Math.max(1, Math.floor(Math.random() * remaining * 0.4)); 
        const next = prev + increment;
        
        if (next >= 100) {
            clearInterval(timer);
            return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
      if (progress === 100) {
          // Petit délai une fois à 100% avant de déclencher la sortie
          const timeout = setTimeout(() => {
              onComplete();
          }, 600);
          return () => clearTimeout(timeout);
      }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper dark:bg-void text-ink dark:text-off-white"
      initial={{ opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Courbe de Bézier smooth
    >
      <div className="w-full max-w-sm px-8 relative">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-end mb-4 font-display"
        >
            <span className="text-sm font-bold uppercase tracking-widest opacity-60">System Loading</span>
            <span className="text-6xl font-bold text-accent">{progress}%</span>
        </motion.div>

        <div className="w-full h-[2px] bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
            />
        </div>
        
        <div className="mt-6 flex justify-between text-[10px] uppercase tracking-widest font-mono opacity-40">
            <span>Tarik Talhaoui</span>
            <span>Product Builder</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;