import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Accessibility } from 'lucide-react';
import { PROJECTS } from './constants';
import ChatWidget from './components/ChatWidget';
import { Language } from './types';

// Importing Views
import Home from './components/views/Home';
import Projects from './components/views/Projects';
import Services from './components/views/Services';
import Contact from './components/views/Contact';
import NotFound from './components/views/NotFound';

type View = 'home' | 'projects' | 'services' | 'contact' | '404';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  // --- State & Init ---
  const [lang, setLang] = useState<Language>(() => 
    (typeof window !== 'undefined' ? localStorage.getItem('lang') as Language : 'fr') || 'fr'
  );
  
  const [currentView, setCurrentView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  
  const [theme, setTheme] = useState<Theme>(() => 
    (typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme : 'dark') || 'dark'
  );
  
  const [showA11yModal, setShowA11yModal] = useState(false);

  // --- Translations ---
  const UI_TEXT = {
    fr: {
      home: 'Accueil',
      projects: 'Projets',
      services: 'Services',
      contact: 'Contact',
      rights: 'Tous droits réservés.',
      location: 'Localisation'
    },
    en: {
      home: 'Home',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact',
      rights: 'All Rights Reserved.',
      location: 'Location'
    }
  };

  const navItems: View[] = ['home', 'projects', 'services', 'contact'];

  // --- Effects ---

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Initial Theme Setup
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, []); // Run once on mount to set initial class, subsequent toggles handled in toggleTheme

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Navigation & Data ---

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = async (e: React.MouseEvent) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Fallback if View Transitions are not supported
    // @ts-ignore
    if (!(document as any).startViewTransition) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      return;
    }

    // Circular Reveal Logic
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Start Transition
    // @ts-ignore
    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        const root = document.documentElement;
        if (newTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      });
    });

    // Wait for the pseudo-elements to be created
    await transition.ready;

    // Animate the circle
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const allProjects = PROJECTS.filter(p => p.id !== 'polinizz');

  // View Router Logic
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home lang={lang} navigateTo={navigateTo} setHoveredProject={setHoveredProject} />;
      case 'projects':
        return <Projects lang={lang} />;
      case 'services':
        return <Services lang={lang} />;
      case 'contact':
        return <Contact lang={lang} />;
      case '404':
        return <NotFound lang={lang} onReturn={() => navigateTo('home')} />;
      default:
        return <NotFound lang={lang} onReturn={() => navigateTo('home')} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 relative cursor-default bg-paper dark:bg-void text-ink dark:text-off-white selection:bg-accent selection:text-white overflow-x-hidden`}>
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] dark:opacity-[0.15] pointer-events-none z-50 mix-blend-overlay"></div>

      {/* Floating Image Reveal (Custom Cursor Effect) - Only visible on Home usually, but kept global for potential reuse */}
      <motion.div 
        className="fixed w-[300px] h-[200px] pointer-events-none z-40 rounded-lg overflow-hidden hidden md:block shadow-2xl border border-white/10"
        style={{ 
          x: cursorPos.x + 20, 
          y: cursorPos.y - 100,
        }}
        animate={{
          opacity: hoveredProject ? 1 : 0,
          scale: hoveredProject ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {allProjects.map((p) => (
           <img 
             key={p.id}
             src={p.image} 
             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredProject === p.id ? 'opacity-100' : 'opacity-0'}`}
             loading="lazy"
             alt=""
           />
        ))}
      </motion.div>

      {/* Navigation Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-white/80 dark:bg-void/80 backdrop-blur-xl py-4 border-black/5 dark:border-white/5 shadow-sm' 
            : 'bg-transparent py-8 border-transparent'
        }`}
      >
        <div className="px-6 md:px-12 flex justify-between items-center max-w-[1920px] mx-auto">
          <div 
            className="font-display font-extrabold text-2xl tracking-tighter cursor-pointer flex items-center gap-2 group"
            onClick={() => navigateTo('home')}
            aria-label="Homepage"
          >
            <span className="group-hover:text-accent transition-colors duration-300 text-ink dark:text-off-white">TARIK.T</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((view) => (
              <button 
                key={view}
                onClick={() => navigateTo(view as View)}
                className={`text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors duration-300 relative group ${currentView === view ? 'text-accent' : 'text-ink dark:text-off-white opacity-60 hover:opacity-100'}`}
              >
                {UI_TEXT[lang][view as keyof typeof UI_TEXT['fr']]}
                {currentView === view && (
                  <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
               onClick={toggleTheme} 
               className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-ink dark:text-off-white relative overflow-hidden"
            >
               <AnimatePresence mode="wait">
                  {theme === 'light' ? 
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                       <Moon size={18} />
                    </motion.div> : 
                    <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                       <Sun size={18} />
                    </motion.div>
                  }
               </AnimatePresence>
            </button>

            <button 
               onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} 
               className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors w-8 text-ink dark:text-off-white"
            >
              {lang}
            </button>

            <button 
               className="md:hidden text-ink dark:text-off-white" 
               onClick={() => setMenuOpen(!menuOpen)}
            >
               {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-paper dark:bg-void z-40 flex flex-col justify-center items-center gap-8"
          >
             {navItems.map((view) => (
              <button 
                key={view}
                onClick={() => navigateTo(view as View)}
                className="font-display text-5xl font-bold uppercase hover:text-accent transition-colors text-ink dark:text-off-white"
              >
                {UI_TEXT[lang][view as keyof typeof UI_TEXT['fr']]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* A11y Modal */}
      <AnimatePresence>
      {showA11yModal && (
         <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
         >
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
               className="bg-white dark:bg-surface border border-black/10 dark:border-white/10 p-8 rounded-xl max-w-md shadow-2xl relative"
            >
               <button onClick={() => setShowA11yModal(false)} className="absolute top-4 right-4 hover:text-accent transition-colors text-ink dark:text-off-white"><X size={20}/></button>
               <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2 text-ink dark:text-off-white">
                  <Accessibility className="text-accent"/> Accessibility
               </h3>
               <p className="text-sm opacity-80 mb-6 leading-relaxed text-ink dark:text-off-white">
                  {lang === 'fr' 
                   ? "Je m'engage à rendre ce portfolio accessible. Standards sémantiques HTML5, contrastes vérifiés et navigation clavier."
                   : "Committed to accessibility. Semantic HTML5, checked contrasts, and keyboard navigation."}
               </p>
               <button onClick={() => setShowA11yModal(false)} className="w-full py-3 bg-accent text-white font-bold uppercase tracking-widest text-xs rounded hover:opacity-90 transition-opacity">
                  {lang === 'fr' ? 'Compris' : 'Understood'}
               </button>
            </motion.div>
         </motion.div>
      )}
      </AnimatePresence>

      <main className="max-w-[1920px] mx-auto min-h-screen">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-black/10 dark:border-white/10 mt-20 bg-paper dark:bg-surface text-ink dark:text-off-white">
         <div className="flex flex-col md:flex-row justify-between items-end gap-8">
             <div className="flex flex-col gap-4">
                <span className="font-display font-bold text-2xl">Tarik.T</span>
                <span className="text-xs opacity-50 uppercase tracking-widest">© 2025 {UI_TEXT[lang].rights}</span>
             </div>
             
             <div className="flex flex-col items-end gap-4">
                 <button 
                     onClick={() => setShowA11yModal(true)}
                     className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 hover:text-accent transition-colors"
                 >
                     <Accessibility size={14} /> {lang === 'fr' ? 'Accessibilité' : 'Accessibility'}
                 </button>
                <div className="text-right">
                    <div className="text-xs opacity-50 uppercase tracking-widest mb-1">{UI_TEXT[lang].location}</div>
                    <div className="font-display font-bold">Avignon, France</div>
                </div>
             </div>
         </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;