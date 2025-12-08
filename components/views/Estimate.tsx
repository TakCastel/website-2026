import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import ProjectConfigurator from '../ProjectConfigurator';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface EstimateProps {
  lang: Language;
}

const Estimate: React.FC<EstimateProps> = ({ lang }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="pt-32 px-6 md:px-12 pb-20 min-h-screen text-ink dark:text-off-white bg-paper dark:bg-void">
      
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION - FULL WIDTH */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    {lang === 'fr' ? `Étape ${currentStep} sur 3` : `Step ${currentStep} of 3`}
                </div>
                <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-6 leading-[0.9]">
                    {lang === 'fr' ? 'Définissons' : 'Define'}<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                        {lang === 'fr' ? 'votre besoin' : 'your needs'}
                    </span>
                </h1>
                <p className="text-lg opacity-70 leading-relaxed max-w-2xl">
                    {lang === 'fr' 
                        ? "Configurez votre projet idéal ci-dessous. Sélectionnez une base technique et ajoutez les modules nécessaires pour obtenir une estimation immédiate et un PDF détaillé."
                        : "Configure your ideal project below. Select a technical base and add necessary modules to get an immediate estimate and a detailed PDF."
                    }
                </p>
            </motion.div>

            {/* REASSURANCE - DESKTOP ONLY */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:flex flex-col gap-3 text-right opacity-60"
            >
                <div className="flex items-center justify-end gap-3">
                    <span className="text-sm font-bold uppercase tracking-wide">{lang === 'fr' ? 'Devis immédiat (PDF)' : 'Instant Quote (PDF)'}</span>
                    <CheckCircle2 className="text-accent" size={20} />
                </div>
                <div className="flex items-center justify-end gap-3">
                    <span className="text-sm font-bold uppercase tracking-wide">{lang === 'fr' ? 'Prise de contact simplifiée' : 'Simplified Contact'}</span>
                    <CheckCircle2 className="text-accent" size={20} />
                </div>
                <div className="flex items-center justify-end gap-3">
                    <span className="text-sm font-bold uppercase tracking-wide">{lang === 'fr' ? 'Base de travail claire' : 'Clear Scope'}</span>
                    <CheckCircle2 className="text-accent" size={20} />
                </div>
            </motion.div>
        </div>

        {/* CONFIGURATOR - FULL WIDTH */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full"
        >
            <ProjectConfigurator 
                lang={lang} 
                currentStep={currentStep} 
                onStepChange={setCurrentStep} 
            />
        </motion.div>

      </div>

    </div>
  );
};

export default Estimate;