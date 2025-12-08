import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_CONFIG } from '../constants';
import { Language } from '../types';
import { 
    Check, Download, Send, Calculator, FileText, 
    ArrowRight, ChevronLeft, Layout, ShoppingCart, 
    Layers, Zap, Palette, Globe, Smartphone, Server,
    GraduationCap, Info
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useNavigate, Link } from 'react-router-dom';

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
    'content': FileText,
    'support': GraduationCap
};

const CATEGORY_LABELS: Record<string, { en: string, fr: string }> = {
    'design': { en: 'Design & UX', fr: 'Design & Apparence' },
    'tech': { en: 'Tech & Features', fr: 'Technique & Fonctions' },
    'marketing': { en: 'Marketing & SEO', fr: 'Marketing & Visibilité' },
    'content': { en: 'Content & Data', fr: 'Contenu & Données' },
    'support': { en: 'Training & Support', fr: 'Formation & Support' }
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
    doc.text("EI - SIRET: 000 000 000 00000", 20, 26); // Legal requirement
    doc.text("contact@tariktalhaoui.fr", 20, 32);
    doc.text("Avignon, France", 20, 38);
    
    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);
    
    // Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(lang === 'fr' ? "ESTIMATION DE PROJET (NON CONTRACTUEL)" : "PROJECT ESTIMATION (NON-BINDING)", 20, 60);
    
    // Main Project Box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 70, 170, 30, 3, 3, 'F');
    doc.setFontSize(12);
    doc.text(`${lang === 'fr' ? "Type de projet" : "Project Type"}: ${activeConfig.title[lang]}`, 30, 85);
    doc.text(`${lang === 'fr' ? "Base" : "Base"}: ${activeConfig.basePrice}€ HT`, 150, 85);
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
          doc.text(`${opt.price}€ HT`, 150, yPos);
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
    doc.text(`${total}€ HT`, 150, yPos + 17);
    
    // Footer / Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    yPos += 40;
    
    const disclaimer = lang === 'fr' 
      ? "Ce document est une estimation tarifaire indicative et ne constitue pas une offre ferme. Les prix sont hors taxes (TVA non applicable, art. 293 B du CGI). Le prix final sera fixé après étude détaillée du cahier des charges et fera l'objet d'un devis formel soumis aux Conditions Générales de Vente (CGV) disponibles sur le site." 
      : "This document is an indicative price estimate and does not constitute a binding offer. Prices are excluding tax. Final price will be set after detailed study of specifications and will be subject to a formal quote under the General Terms of Sales (CGV) available on the website.";
    
    const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
    doc.text(splitDisclaimer, 20, yPos);
    
    doc.save("tarik-talhaoui-estimate.pdf");
  };

  const handleContact = () => {
    const message = `Bonjour Tarik,\n\nJ'ai configuré un projet sur votre site (Soumis aux CGV) :\n\nType : ${activeConfig?.title[lang]}\n\nOptions :\n${activeConfig?.options.filter(o => selectedOptions.includes(o.id)).map(o => `- ${o.label[lang]}`).join('\n')}\n\nBudget estimé : ${total}€ HT.\n\nPouvons-nous en discuter ?`;
    navigate('/contact', { state: { prefilledMessage: message } });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COLUMN: MAIN CONFIGURATOR */}
      <div className="flex-1 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Progress Header */}
        <div className="flex items-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 1 ? 'bg-accent text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className="h-1 flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                <div className={`h-full bg-accent rounded-full transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 2 ? 'bg-accent text-white scale-110' : 'bg-gray-200 dark:bg-zinc-800 text-gray-500'}`}>2</div>
            <div className="h-1 flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                <div className={`h-full bg-accent rounded-full transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 3 ? 'bg-accent text-white scale-110' : 'bg-gray-200 dark:bg-zinc-800 text-gray-500'}`}>3</div>
        </div>

        <AnimatePresence mode="wait">
            
            {/* STEP 1: TYPE SELECTION */}
            {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 flex-1 flex flex-col"
                >
                    <div className="text-center mb-8">
                        <h2 className="font-display text-2xl font-bold uppercase mb-2">
                            {lang === 'fr' ? "Quel est votre point de départ ?" : "What is your starting point?"}
                        </h2>
                        <p className="opacity-60 text-sm">
                            {lang === 'fr' ? "Choisissez la base technique de votre projet." : "Choose the technical base of your project."}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {PRICING_CONFIG.map((conf) => {
                            const Icon = TYPE_ICONS[conf.id] || Layout;
                            return (
                                <button
                                    key={conf.id}
                                    onClick={() => { setSelectedType(conf.id); setSelectedOptions([]); setStep(2); }}
                                    className="group text-left p-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-accent hover:shadow-lg transition-all relative overflow-hidden bg-white dark:bg-black/20 h-full flex flex-col"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500 pointer-events-none">
                                        <Icon size={120} />
                                    </div>
                                    <div className="relative z-10 flex-1 flex flex-col">
                                        <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="font-bold font-display uppercase text-lg mb-2">{conf.title[lang]}</h3>
                                        <p className="text-sm opacity-60 mb-6 flex-1">{conf.description[lang]}</p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                                            <span className="text-sm font-mono font-bold text-accent">
                                                {lang === 'fr' ? 'À partir de' : 'From'} {conf.basePrice}€
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
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
                    <div className="flex items-center justify-between mb-8">
                        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                            <ChevronLeft size={16} /> {lang === 'fr' ? 'Changer de type' : 'Change type'}
                        </button>
                        <div className="text-right">
                             <h2 className="font-display text-xl font-bold uppercase">{activeConfig.title[lang]}</h2>
                             <span className="text-xs opacity-50 font-mono">{activeConfig.basePrice}€ Base</span>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                         <button 
                            onClick={() => setActiveCategory('all')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === 'all' ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' : 'bg-gray-100 dark:bg-white/5 opacity-60 hover:opacity-100'}`}
                         >
                            {lang === 'fr' ? 'Tout' : 'All'}
                         </button>
                         {categories.map(cat => (
                             <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${activeCategory === cat ? 'bg-accent text-white shadow-md' : 'bg-gray-100 dark:bg-white/5 opacity-60 hover:opacity-100'}`}
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
                                        className={`flex items-start gap-4 p-5 rounded-xl border transition-all text-left group h-full hover:shadow-md ${
                                            isSelected
                                            ? 'border-accent bg-accent/5 shadow-inner' 
                                            : 'border-black/5 dark:border-white/5 hover:border-accent/30 bg-white dark:bg-black/20'
                                        }`}
                                    >
                                        <div className={`mt-1 min-w-[20px] h-5 rounded border flex items-center justify-center transition-colors ${
                                            isSelected ? 'bg-accent border-accent text-white' : 'border-black/20 dark:border-white/20'
                                        }`}>
                                            {isSelected && <Check size={12} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-4">
                                                <span className={`font-bold text-sm mb-1 ${isSelected ? 'text-accent' : ''}`}>{opt.label[lang]}</span>
                                                {CatIcon && <CatIcon size={16} className={`opacity-30 flex-shrink-0 ${isSelected ? 'text-accent opacity-100' : ''}`} />}
                                            </div>
                                            <div className="text-xs font-mono opacity-60 mt-1 bg-black/5 dark:bg-white/5 inline-block px-1.5 py-0.5 rounded">+{opt.price}€</div>
                                        </div>
                                    </button>
                                );
                        })}
                    </div>

                    <div className="mt-auto flex justify-end pt-6 border-t border-black/5 dark:border-white/5">
                         <button 
                            onClick={() => setStep(3)}
                            className="bg-accent text-white px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest shadow-lg hover:bg-accent-hover transition-colors flex items-center gap-2 group"
                         >
                            {lang === 'fr' ? 'Voir le Récapitulatif' : 'View Summary'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
                    className="text-center flex flex-col items-center justify-center h-full py-8"
                >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 animate-bounce shadow-xl shadow-green-500/30">
                        <Check size={40} strokeWidth={4} />
                    </div>
                    <h2 className="font-display text-4xl font-bold uppercase mb-4">
                        {lang === 'fr' ? "Configuration Terminée !" : "Configuration Complete!"}
                    </h2>
                    <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg text-xs md:text-sm mb-6 max-w-lg flex items-start gap-2 text-left">
                        <Info size={16} className="shrink-0 mt-0.5" />
                        {lang === 'fr' 
                           ? "Estimation non contractuelle. Le prix final sera validé sur devis formel." 
                           : "Non-binding estimate. Final price subject to formal quote."}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                        <button onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 px-6 py-4">
                            {lang === 'fr' ? 'Modifier' : 'Edit'}
                        </button>
                        <button 
                             onClick={handleDownloadPDF}
                             className="flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 px-8 py-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 font-bold uppercase text-xs tracking-widest transition-colors"
                        >
                             <Download size={16} /> {lang === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
                        </button>
                        <button 
                             onClick={handleContact}
                             className="flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl hover:bg-accent-hover font-bold uppercase text-xs tracking-widest shadow-lg transition-colors hover:shadow-accent/30"
                        >
                             <Send size={16} /> {lang === 'fr' ? 'Envoyer au Studio' : 'Send to Studio'}
                        </button>
                    </div>
                    <p className="mt-6 text-[10px] opacity-40">
                         {lang === 'fr' ? "En envoyant cette estimation, vous acceptez nos CGV." : "By sending this estimate, you agree to our Terms of Sales."}
                    </p>
                </motion.div>
            )}

        </AnimatePresence>

      </div>

      {/* RIGHT COLUMN: STICKY SUMMARY */}
      <div className="lg:w-96">
          <div className="sticky top-32 bg-gray-50 dark:bg-zinc-950 border border-black/5 dark:border-white/5 p-8 rounded-2xl shadow-lg">
              <h3 className="font-display font-bold uppercase text-sm mb-6 border-b border-black/5 dark:border-white/5 pb-4 flex justify-between items-center">
                  {lang === 'fr' ? "Votre Estimation" : "Your Estimate"}
                  <Calculator size={16} className="opacity-50" />
              </h3>
              
              <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                      <span className="opacity-60">{lang === 'fr' ? "Base" : "Base"}</span>
                      <span className="font-mono">{activeConfig ? activeConfig.basePrice : 0}€</span>
                  </div>
                  <AnimatePresence>
                    {selectedOptions.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex justify-between items-center text-sm"
                        >
                            <span className="opacity-60">{lang === 'fr' ? "Options" : "Options"} ({selectedOptions.length})</span>
                            <span className="font-mono text-accent">
                                +{total - (activeConfig ? activeConfig.basePrice : 0)}€
                            </span>
                        </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-end">
                      <span className="font-bold text-lg">{lang === 'fr' ? "Total" : "Total"}</span>
                      <div className="text-right">
                          <motion.span 
                            key={total}
                            initial={{ scale: 1.2, color: '#8B5CF6' }}
                            animate={{ scale: 1, color: '#8B5CF6' }}
                            className="block text-4xl font-display font-bold text-accent"
                          >
                              {total}€
                          </motion.span>
                          <span className="text-[10px] opacity-40 uppercase tracking-widest">
                            {lang === 'fr' ? "Hors Taxes (HT)" : "Excl. Tax"}
                          </span>
                      </div>
                  </div>
              </div>

              {/* Visual Gauge */}
              <div className="mb-6">
                  <div className="flex justify-between text-[10px] uppercase font-bold opacity-40 mb-2">
                      <span>Standard</span>
                      <span>Premium</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                      <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 z-10"></div>
                      <div className="absolute left-[60%] top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 z-10"></div>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${complexityPercent}%` }}
                        className={`h-full ${getComplexityColor()} transition-all duration-700 relative z-0 shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                      />
                  </div>
              </div>

              <div className="text-[10px] opacity-40 leading-relaxed text-center">
                 {lang === 'fr' ? "*Tarif indicatif hors hébergement." : "*Indicative price excl. hosting."}
                 <br />
                 <Link to="/terms" className="underline hover:text-accent">
                    {lang === 'fr' ? "Voir Conditions" : "See Terms"}
                 </Link>
              </div>

          </div>
      </div>

    </div>
  );
};

export default ProjectConfigurator;