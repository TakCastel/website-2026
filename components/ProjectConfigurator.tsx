import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_CONFIG } from '../constants';
import { Language } from '../types';
import { 
    Check, Download, Send, Calculator, FileText, 
    ArrowRight, ChevronLeft, Layout, ShoppingCart, 
    Layers, Zap, Palette, Globe, Smartphone, Server 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

interface ProjectConfiguratorProps {
  lang: Language;
  currentStep: number;
  onStepChange: (step: number) => void;
}

// Map icons to categories
const CATEGORY_ICONS: Record<string, React.FC<any>> = {
    'design': Palette,
    'tech': Server,
    'marketing': Globe,
    'content': FileText
};

const CATEGORY_LABELS: Record<string, { en: string, fr: string }> = {
    'design': { en: 'Design & UX', fr: 'Design & Apparence' },
    'tech': { en: 'Tech & Features', fr: 'Technique & Fonctions' },
    'marketing': { en: 'Marketing & SEO', fr: 'Marketing & Visibilité' },
    'content': { en: 'Content & Data', fr: 'Contenu & Données' }
};

const TYPE_ICONS: Record<string, React.FC<any>> = {
    'landing': Layout,
    'showcase': Layers,
    'ecommerce': ShoppingCart,
    'webapp': Zap
};

const ProjectConfigurator: React.FC<ProjectConfiguratorProps> = ({ lang, currentStep, onStepChange }) => {
  const navigate = useNavigate();
  
  // Use props for step control
  const step = currentStep;
  const setStep = onStepChange;

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const activeConfig = PRICING_CONFIG.find(c => c.id === selectedType);
  
  const toggleOption = (optId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optId) ? prev.filter(id => id !== optId) : [...prev, optId]
    );
  };

  const calculateTotal = () => {
    if (!activeConfig) return 0;
    let total = activeConfig.basePrice;
    activeConfig.options.forEach(opt => {
      if (selectedOptions.includes(opt.id)) {
        total += opt.price;
      }
    });
    return total;
  };

  const total = calculateTotal();
  
  // Complexity Gauge
  const maxPrice = 8000;
  const complexityPercent = Math.min((total / maxPrice) * 100, 100);
  const getComplexityColor = () => {
      if(complexityPercent < 30) return 'bg-green-400';
      if(complexityPercent < 60) return 'bg-yellow-400';
      return 'bg-accent';
  };

  const categories = activeConfig ? Array.from(new Set(activeConfig.options.map(o => o.category || 'tech'))) : [];

  const handleDownloadPDF = () => {
    if (!activeConfig) return;
    
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(30, 30, 30);
    doc.text("Tarik Talhaoui - Product Builder", 20, 20);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Lead Tech & Développeur Freelance", 20, 26);
    doc.text("contact@tariktalhaoui.fr", 20, 32);
    doc.text("Avignon, France", 20, 38);
    
    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);
    
    // Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(lang === 'fr' ? "ESTIMATION DE PROJET" : "PROJECT ESTIMATION", 20, 60);
    
    // Main Project Box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 70, 170, 30, 3, 3, 'F');
    doc.setFontSize(12);
    doc.text(`${lang === 'fr' ? "Type de projet" : "Project Type"}: ${activeConfig.title[lang]}`, 30, 85);
    doc.text(`${lang === 'fr' ? "Base" : "Base"}: ${activeConfig.basePrice}€`, 150, 85);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(activeConfig.description[lang], 30, 92);
    
    // Options
    let yPos = 120;
    doc.setTextColor(0, 0, 0);
    if (selectedOptions.length > 0) {
      doc.setFontSize(12);
      doc.text(lang === 'fr' ? "Options sélectionnées:" : "Selected Options:", 20, yPos);
      yPos += 10;
      doc.setFontSize(10);
      
      activeConfig.options.forEach(opt => {
        if (selectedOptions.includes(opt.id)) {
          doc.text(`- ${opt.label[lang]}`, 30, yPos);
          doc.text(`${opt.price}€`, 150, yPos);
          yPos += 8;
        }
      });
    } else {
        doc.text(lang === 'fr' ? "Aucune option supplémentaire." : "No additional options.", 20, yPos);
        yPos += 10;
    }
    
    // Total Box
    yPos += 20;
    doc.setFillColor(240, 240, 255); // Light Accent Color equivalent
    doc.roundedRect(20, yPos, 170, 25, 3, 3, 'F');
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 50, 200);
    doc.text(lang === 'fr' ? "TOTAL ESTIMÉ" : "ESTIMATED TOTAL", 30, yPos + 17);
    doc.text(`${total}€`, 150, yPos + 17);
    
    // Footer / Disclaimer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    yPos += 40;
    const disclaimer = lang === 'fr' 
      ? "Ceci est une estimation non-contractuelle basée sur des tarifs moyens constatés à Avignon. Le prix final peut varier selon le cahier des charges détaillé." 
      : "This is a non-binding estimate based on average rates in Avignon. Final price may vary based on detailed specifications.";
    
    const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
    doc.text(splitDisclaimer, 20, yPos);
    
    doc.save("tarik-talhaoui-estimate.pdf");
  };

  const handleContact = () => {
    const message = `Bonjour Tarik,\n\nJ'ai configuré un projet sur votre site :\n\nType : ${activeConfig?.title[lang]}\n\nOptions :\n${activeConfig?.options.filter(o => selectedOptions.includes(o.id)).map(o => `- ${o.label[lang]}`).join('\n')}\n\nBudget estimé : ${total}€.\n\nPouvons-nous en discuter ?`;
    navigate('/contact', { state: { prefilledMessage: message } });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COLUMN: MAIN CONFIGURATOR */}
      <div className="flex-1 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[600px]">
        
        {/* Progress Header */}
        <div className="flex items-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className="h-1 flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                <div className={`h-full bg-accent rounded-full transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-500'}`}>2</div>
            <div className="h-1 flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                <div className={`h-full bg-accent rounded-full transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-500'}`}>3</div>
        </div>

        <AnimatePresence mode="wait">
            
            {/* STEP 1: TYPE SELECTION */}
            {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="text-center mb-8">
                        <h2 className="font-display text-2xl font-bold uppercase mb-2">
                            {lang === 'fr' ? "Quel est votre point de départ ?" : "What is your starting point?"}
                        </h2>
                        <p className="opacity-60 text-sm">
                            {lang === 'fr' ? "Choisissez la base technique de votre projet." : "Choose the technical base of your project."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {PRICING_CONFIG.map((conf) => {
                            const Icon = TYPE_ICONS[conf.id] || Layout;
                            return (
                                <button
                                    key={conf.id}
                                    onClick={() => { setSelectedType(conf.id); setSelectedOptions([]); setStep(2); }}
                                    className="group text-left p-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-accent hover:shadow-lg transition-all relative overflow-hidden bg-white dark:bg-black/20"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                                        <Icon size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center text-accent mb-4">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="font-bold font-display uppercase text-lg mb-1">{conf.title[lang]}</h3>
                                        <p className="text-xs opacity-60 mb-4 h-8">{conf.description[lang]}</p>
                                        <span className="text-sm font-mono font-bold text-accent">
                                            {lang === 'fr' ? 'À partir de' : 'From'} {conf.basePrice}€
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* STEP 2: CUSTOMIZATION */}
            {step === 2 && activeConfig && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                >
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                            <ChevronLeft size={16} /> {lang === 'fr' ? 'Retour' : 'Back'}
                        </button>
                        <h2 className="font-display text-xl font-bold uppercase">
                            {activeConfig.title[lang]}
                        </h2>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                         <button 
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-white/5 opacity-60 hover:opacity-100'}`}
                         >
                            {lang === 'fr' ? 'Tout' : 'All'}
                         </button>
                         {categories.map(cat => (
                             <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors flex items-center gap-2 ${activeCategory === cat ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-white/5 opacity-60 hover:opacity-100'}`}
                             >
                                {CATEGORY_LABELS[cat] ? CATEGORY_LABELS[cat][lang] : cat}
                             </button>
                         ))}
                    </div>

                    {/* Options Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {activeConfig.options
                            .filter(opt => activeCategory === 'all' || opt.category === activeCategory)
                            .map((opt) => {
                                const CatIcon = opt.category ? CATEGORY_ICONS[opt.category] : Zap;
                                const isSelected = selectedOptions.includes(opt.id);
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => toggleOption(opt.id)}
                                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left group ${
                                            isSelected
                                            ? 'border-accent bg-accent/5 shadow-inner' 
                                            : 'border-black/5 dark:border-white/5 hover:border-accent/30'
                                        }`}
                                    >
                                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                            isSelected ? 'bg-accent border-accent text-white' : 'border-black/20 dark:border-white/20'
                                        }`}>
                                            {isSelected && <Check size={12} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-sm mb-1">{opt.label[lang]}</span>
                                                {CatIcon && <CatIcon size={14} className="opacity-30" />}
                                            </div>
                                            <span className="text-xs font-mono opacity-60">+{opt.price}€</span>
                                        </div>
                                    </button>
                                );
                        })}
                    </div>

                    <div className="mt-auto flex justify-end">
                         <button 
                            onClick={() => setStep(3)}
                            className="bg-accent text-white px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest shadow-lg hover:bg-accent-hover transition-colors flex items-center gap-2"
                         >
                            {lang === 'fr' ? 'Voir le Récapitulatif' : 'View Summary'} <ArrowRight size={16} />
                         </button>
                    </div>
                </motion.div>
            )}

            {/* STEP 3: SUMMARY */}
            {step === 3 && activeConfig && (
                 <motion.div 
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="text-center flex flex-col items-center justify-center h-full"
                >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 animate-bounce">
                        <Check size={32} strokeWidth={4} />
                    </div>
                    <h2 className="font-display text-3xl font-bold uppercase mb-4">
                        {lang === 'fr' ? "Configuration Terminée !" : "Configuration Complete!"}
                    </h2>
                    <p className="opacity-60 max-w-md mx-auto mb-8">
                        {lang === 'fr' 
                            ? "Vous pouvez télécharger votre estimation ou me l'envoyer directement pour que nous puissions en discuter." 
                            : "You can download your estimate or send it directly to me so we can discuss it."}
                    </p>
                    
                    <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 px-6 py-3">
                            {lang === 'fr' ? 'Modifier' : 'Edit'}
                        </button>
                        <button 
                             onClick={handleDownloadPDF}
                             className="flex items-center gap-2 border border-black/10 dark:border-white/10 px-6 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-bold uppercase text-xs tracking-widest transition-colors"
                        >
                             <Download size={16} /> PDF
                        </button>
                        <button 
                             onClick={handleContact}
                             className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-hover font-bold uppercase text-xs tracking-widest shadow-lg transition-colors"
                        >
                             <Send size={16} /> {lang === 'fr' ? 'Envoyer' : 'Send'}
                        </button>
                    </div>
                </motion.div>
            )}

        </AnimatePresence>

      </div>

      {/* RIGHT COLUMN: STICKY SUMMARY */}
      <div className="lg:w-80">
          <div className="sticky top-32 bg-gray-50 dark:bg-zinc-950 border border-black/5 dark:border-white/5 p-6 rounded-xl">
              <h3 className="font-display font-bold uppercase text-sm mb-6 border-b border-black/5 dark:border-white/5 pb-4">
                  {lang === 'fr' ? "Votre Estimation" : "Your Estimate"}
              </h3>
              
              <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                      <span className="opacity-60">{lang === 'fr' ? "Base" : "Base"}</span>
                      <span className="font-mono">{activeConfig ? activeConfig.basePrice : 0}€</span>
                  </div>
                  {selectedOptions.length > 0 && (
                      <div className="flex justify-between items-center text-sm">
                          <span className="opacity-60">{lang === 'fr' ? "Options" : "Options"} ({selectedOptions.length})</span>
                          <span className="font-mono text-accent">
                              +{total - (activeConfig ? activeConfig.basePrice : 0)}€
                          </span>
                      </div>
                  )}
                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-end">
                      <span className="font-bold text-lg">{lang === 'fr' ? "Total" : "Total"}</span>
                      <div className="text-right">
                          <span className="block text-3xl font-display font-bold text-accent">{total}€</span>
                          <span className="text-[10px] opacity-40 uppercase tracking-widest">
                            {lang === 'fr' ? "Moyenne Avignon" : "Avignon Average"}
                          </span>
                      </div>
                  </div>
              </div>

              {/* Visual Gauge */}
              <div className="mb-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold opacity-40 mb-1">
                      <span>Simple</span>
                      <span>Complex</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${complexityPercent}%` }}
                        className={`h-full ${getComplexityColor()} transition-all duration-700`}
                      />
                  </div>
              </div>

          </div>
      </div>

    </div>
  );
};

export default ProjectConfigurator;