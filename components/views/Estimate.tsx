import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import ProjectConfigurator from '../ProjectConfigurator';
import { CheckCircle2 } from 'lucide-react';

interface EstimateProps {
  lang: Language;
}

const Estimate: React.FC<EstimateProps> = ({ lang }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="pt-32 px-6 md:px-12 pb-20 min-h-screen text-ink dark:text-off-white">
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-5"
            >
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                    {lang === 'fr' ? `Étape ${currentStep} sur 3` : `Step ${currentStep} of 3`}
                </div>
                <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-8 leading-[0.9]">
                    {lang === 'fr' ? 'Définissons' : 'Define'}<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                        {lang === 'fr' ? 'votre besoin' : 'your needs'}
                    </span>
                </h1>
                <p className="text-lg opacity-70 leading-relaxed mb-8">
                    {lang === 'fr' 
                        ? "Utilisez ce configurateur pour obtenir une fourchette budgétaire immédiate. Sélectionnez vos options et générez un PDF que nous utiliserons comme base de travail."
                        : "Use this configurator to get an immediate budget range. Select your options and generate a PDF that we will use as a working basis."
                    }
                </p>

                <div className="space-y-4 opacity-60">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wide">{lang === 'fr' ? 'Devis immédiat (PDF)' : 'Instant Quote (PDF)'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wide">{lang === 'fr' ? 'Prise de contact simplifiée' : 'Simplified Contact'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wide">{lang === 'fr' ? 'Base de travail claire' : 'Clear Scope'}</span>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-7"
            >
                <ProjectConfigurator 
                    lang={lang} 
                    currentStep={currentStep} 
                    onStepChange={setCurrentStep} 
                />
            </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Estimate;