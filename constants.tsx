import React from 'react';
import { Project, Service, SkillCategory, TeamMember, ProcessStep, PricingPackage } from './types';
import { 
  Code2, 
  Rocket, 
  Users, 
  Layout, 
  Database, 
  Smartphone,
  Globe,
  Search,
  ShieldAlert,
  Terminal,
  Cpu,
  Lock,
  PenTool,
  Video,
  Palette
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Tarik Talhaoui",
  title: {
    en: "Digital Architect & Product Builder",
    fr: "Architecte Digital & Product Builder"
  },
  location: "Avignon, France",
  email: "contact@tariktalhaoui.fr",
  tagline: {
    en: "Engineering excellence. Aesthetic precision.",
    fr: "Excellence technique. Précision esthétique."
  },
  bio: {
    en: "I operate as a Lead Product Builder. I don't just write code; I orchestrate complete digital solutions. For projects requiring high-end visuals, I activate my personal 'commando' squad of specialized experts (Filmmakers, Motion Designers, Brand Experts).",
    fr: "J'opère en tant que Lead Product Builder. Je ne fais pas que du code, j'orchestre des solutions digitales complètes. Pour les projets exigeant une identité forte, j'active mon 'commando' d'experts satellites (Filmmakers, Motion Designers, Brand Experts)."
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/tarik-talhaoui-832769110/fr?originalSubdomain=fr",
    github: "https://github.com/TakCastel"
  }
};

export const CAREER_STORY = {
  title: {
    en: "My Philosophy",
    fr: "Ma Philosophie"
  },
  content: {
    en: "After 10 years in agencies, I chose independence to get back to basics: adapting the power of the web to the specific reality of your business. No over-engineering, just the right tool for the right need.",
    fr: "Après 10 ans en agence, j'ai choisi l'indépendance pour revenir à l'essentiel : adapter la puissance du web à la réalité spécifique de votre métier. Pas de sur-ingénierie, juste le bon outil pour le bon besoin."
  }
};

export const TECH_DEFINITIONS: Record<string, { en: string, fr: string }> = {
  "React 19": { en: "Library for building dynamic UIs.", fr: "Bibliothèque pour interfaces dynamiques." },
  "Next.js 15": { en: "Framework for production, SEO & speed.", fr: "Framework pour la production, SEO & vitesse." },
  "Vue.js": { en: "Progressive JS framework.", fr: "Framework JS progressif et flexible." },
  "Nuxt": { en: "The Intuitive Vue Framework.", fr: "Le framework Vue intuitif pour le SSR." },
  "TypeScript": { en: "Typed JavaScript for secure code.", fr: "JavaScript typé pour un code sécurisé." },
  "Node.js": { en: "Backend JavaScript runtime.", fr: "Exécution JS côté serveur." },
  "Tailwind": { en: "Utility-first CSS framework.", fr: "Framework CSS utilitaire rapide." },
  "Framer Motion": { en: "Production-ready animation library.", fr: "Bibliothèque d'animation professionnelle." },
  "GSAP": { en: "High-performance animation.", fr: "Animation haute performance." },
  "Canvas API": { en: "2D/3D graphics rendering.", fr: "Rendu graphique 2D/3D avancé." },
  "UI/UX Systems": { en: "Design consistency & patterns.", fr: "Cohérence et patterns de design." },
  "Docker": { en: "Containerization platform.", fr: "Plateforme de conteneurisation." },
  "Supabase": { en: "Open source Firebase alternative.", fr: "Alternative Open Source à Firebase." },
  "Strapi": { en: "Headless CMS.", fr: "CMS Headless flexible." },
  "Firebase": { en: "Google's app development platform.", fr: "Plateforme de développement Google." },
  "CI/CD": { en: "Continuous Integration/Deployment.", fr: "Intégration et déploiement continus." },
  "Vercel": { en: "Cloud platform for frontend.", fr: "Plateforme Cloud pour le frontend." }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    role: { en: "Lead Tech & Strategy", fr: "Lead Tech & Stratégie" },
    name: "Tarik Talhaoui",
    description: { en: "Your single point of contact. I handle architecture, core development, and quality assurance.", fr: "Votre point d'entrée unique. Je gère l'architecture, le développement cœur et la qualité." }
  },
  {
    role: { en: "Video Production", fr: "Réalisation Vidéo" },
    description: { en: "Expert Director activated for promotional spots, drone shots, and storytelling.", fr: "Réalisateur expert activé pour les spots promotionnels, drones et le storytelling." }
  },
  {
    role: { en: "Art Direction", fr: "Direction Artistique" },
    description: { en: "Specialist in branding and UI refinement for premium visual identities.", fr: "Spécialiste du branding et du raffinement UI pour les identités visuelles premium." }
  },
  {
    role: { en: "Print & Assets", fr: "Print & PAO" },
    description: { en: "Dedicated expert for physical brand assets and complex graphical charts.", fr: "Expert dédié pour les supports physiques et les chartes graphiques complexes." }
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: { en: "Consultation & Audit", fr: "Consultation & Audit" },
    description: { 
      en: "1h Free Session. We define the scope, technical feasibility, and strategy. No commitment required.", 
      fr: "Session 1h Offerte. On définit le périmètre, la faisabilité technique et la stratégie. Sans engagement." 
    }
  },
  {
    number: "02",
    title: { en: "Agile Sprints", fr: "Sprints Agiles" },
    description: { 
      en: "Development in 1-2 week cycles. You verify progress regularly. Flexibility to pivot if needed.", 
      fr: "Développement par cycles de 1-2 semaines. Vous vérifiez l'avancée régulièrement. Flexibilité totale." 
    }
  },
  {
    number: "03",
    title: { en: "Security & SEO", fr: "Sécurité & SEO" },
    description: { 
      en: "Implementation of best practices: SSL, Anti-DDoS, Semantic HTML, Sitemap, Performance (Core Web Vitals).", 
      fr: "Mise en place des bonnes pratiques : SSL, Anti-DDoS, HTML Sémantique, Sitemap, Performance (Core Web Vitals)." 
    }
  },
  {
    number: "04",
    title: { en: "Deployment & Training", fr: "Déploiement & Formation" },
    description: { 
      en: "Launch on Vercel/Netlify/VPS. I train you on the CMS (Strapi/Sanity) so you are fully autonomous.", 
      fr: "Lancement sur Vercel/Netlify/VPS. Je vous forme au CMS (Strapi/Sanity) pour que vous soyez 100% autonome." 
    }
  }
];

export const SERVICES: Service[] = [
  {
    title: { en: "Product Architecture", fr: "Architecture Produit" },
    icon: "Rocket",
    description: {
      en: "Transforming complex requirements into clean, scalable software.",
      fr: "Transformer des exigences complexes en logiciels propres et évolutifs."
    },
    features: [
      { en: "MVP Development", fr: "Développement MVP" },
      { en: "Complex Logic", fr: "Logique Complexe" },
      { en: "Next.js / React / Vue", fr: "Next.js / React / Vue" }
    ]
  },
  {
    title: { en: "Creative Tech", fr: "Creative Tech" },
    icon: "Palette",
    description: {
      en: "Websites that feel like experiences. Motion, interaction, and depth.",
      fr: "Des sites web qui sont des expériences. Mouvement, interaction et profondeur."
    },
    features: [
      { en: "Video Integration", fr: "Intégration Vidéo" },
      { en: "Interactive UI", fr: "UI Interactive" },
      { en: "Brand Identity", fr: "Identité de Marque" }
    ]
  },
  {
    title: { en: "Tech Leadership", fr: "Leadership Technique" },
    icon: "ShieldAlert",
    description: {
      en: "Interim CTO services. Audits, team guidance, and technical roadmaps.",
      fr: "Services de CTO par intérim. Audits, guidance d'équipe et roadmaps."
    },
    features: [
      { en: "Code Audits", fr: "Audits de Code" },
      { en: "Team Mentoring", fr: "Mentorat d'Équipe" },
      { en: "Cloud Strategy", fr: "Stratégie Cloud" }
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  { 
    name: { en: "Core Engineering", fr: "Cœur d'Ingénierie" }, 
    skills: ["React 19", "Next.js 15", "Vue.js", "Nuxt", "TypeScript", "Node.js"] 
  },
  { 
    name: { en: "Visual & Motion", fr: "Visuel & Mouvement" }, 
    skills: ["Tailwind", "Framer Motion", "GSAP", "Canvas API", "UI/UX Systems"] 
  },
  { 
    name: { en: "Infrastructure & CMS", fr: "Infrastructure & CMS" }, 
    skills: ["Docker", "Supabase", "Strapi", "Firebase", "CI/CD", "Vercel"] 
  }
];

export const PROJECTS: Project[] = [
  {
    id: "polinizz",
    title: { en: "Polinizz.fr", fr: "Polinizz.fr" },
    role: { en: "Founder & Builder", fr: "Fondateur & Créateur" },
    period: "2025",
    description: {
      en: "A masterclass in data aggregation. Unifying France's cultural events into a seamless, high-performance discovery engine.",
      fr: "Une masterclass en agrégation de données. Unification des événements culturels de France dans un moteur de découverte fluide et performant."
    },
    stack: ["Next.js", "Firebase", "Open Data", "Automation"],
    link: "https://polinizz.fr",
    featured: true,
    type: "product",
    category: "product",
    image: "https://images.unsplash.com/photo-1540575467063-17e6fc8c62d8?q=80&w=2600", // Event vibe
    confidential: false
  },
  {
    id: "serpenter",
    title: { en: "Serpenter", fr: "Serpenter" },
    role: { en: "Creator", fr: "Créateur" },
    period: "2024",
    description: {
      en: "A focused checklist and tracking tool designed for operational efficiency. Simple, effective, and reliable.",
      fr: "Un outil de checklist et de suivi conçu pour l'efficacité opérationnelle. Simple, efficace et fiable."
    },
    stack: ["React", "LocalStorage", "State Management"],
    link: "https://serpenter.netlify.app/",
    type: "product",
    category: "product",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2600", // Productivity dark mode
    confidential: false,
    featured: true
  },
  {
    id: "arnaudban",
    title: { en: "Arnaud Ban", fr: "Arnaud Ban" },
    role: { en: "Digital Craftsman", fr: "Artisan Numérique" },
    period: "2024",
    description: {
      en: "Director's Portfolio. A visual architecture built to showcase cinematography and storytelling.",
      fr: "Portfolio de Réalisateur. Architecture visuelle pour mettre en avant la cinématographie."
    },
    stack: ["React", "SEO", "Responsive"],
    link: "https://arnaudban.fr",
    type: "freelance",
    category: "client",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2600", // Cinema
    confidential: false
  },
  {
    id: "florineclap",
    title: { en: "Florine Clap", fr: "Florine Clap" },
    role: { en: "Digital Craftsman", fr: "Artisan Numérique" },
    period: "2025",
    description: {
      en: "Director's Showcase. A stage for productions, showreels, and artistic vision.",
      fr: "Vitrine de Réalisatrice. Mise en scène des productions, showreels et vision artistique."
    },
    stack: ["Modern Web", "Animation"],
    link: "https://florineclap.netlify.app",
    type: "freelance",
    category: "client",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2600", // Lens
    confidential: false
  },
  {
    id: "bricetheate",
    title: { en: "Brice Theate", fr: "Brice Theate" },
    role: { en: "Digital Craftsman", fr: "Artisan Numérique" },
    period: "2024",
    description: {
      en: "Screenwriter's Portfolio. Clean lines designed for reading scripts and synopses.",
      fr: "Portfolio de Scénariste. Design épuré pour la lecture de scripts et synopsis."
    },
    stack: ["Web Design", "CMS", "Performance"],
    link: "https://bricetheate.fr",
    type: "freelance",
    category: "client",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2600", // Writing
    confidential: false
  },
  {
    id: "123soleil",
    title: { en: "123, Soleil", fr: "123, Soleil" },
    role: { en: "Full Stack Dev", fr: "Dev Full Stack" },
    period: "Current",
    description: {
      en: "Social Short Film Association. Management platform for members and screening schedules.",
      fr: "Association de court-métrage social. Plateforme de gestion d'adhérents et programmation."
    },
    stack: ["React", "Data Management"],
    link: "https://123soleil.netlify.app",
    type: "freelance",
    category: "client",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2600", // Cinema hall
    confidential: false
  },
  {
    id: "prehistopia",
    title: { en: "Prehistopia", fr: "Prehistopia" },
    role: { en: "Game Architect", fr: "Architecte de Jeu" },
    period: "Side Project",
    description: {
      en: "Browser-based City Builder. Complex state management and resource logic.",
      fr: "City Builder par navigateur. Gestion d'état complexe et logique de ressources."
    },
    stack: ["React", "Game Logic", "State Management"],
    link: "https://prehistopia.vercel.app/",
    type: "product",
    category: "lab",
    confidential: false
  },
  {
    id: "archeode",
    title: { en: "Archéode Guild", fr: "Guilde Archéode" },
    role: { en: "Creator", fr: "Créateur" },
    period: "Community",
    description: {
      en: "Immersive community hub for high-fantasy roleplay.",
      fr: "Hub communautaire immersif pour le jeu de rôle high-fantasy."
    },
    stack: ["Vue.js", "Community Tools"],
    link: "https://archeode.fr",
    type: "freelance",
    category: "client",
    confidential: false
  },
  {
    id: "threadcity",
    title: { en: "ThreadCity", fr: "ThreadCity" },
    role: { en: "R&D", fr: "R&D" },
    period: "Academic",
    description: {
      en: "Real-time massive collaboration canvas (Pixel War concept).",
      fr: "Toile de collaboration massive en temps réel (Concept Pixel War)."
    },
    stack: ["WebSockets", "Canvas", "Real-time"],
    link: "https://threadcity.fr/",
    type: "student",
    category: "lab",
    confidential: false
  }
];

export const ICONS: Record<string, React.FC<any>> = {
  Code2, Rocket, Users, Layout, Database, Smartphone, Globe, Search, ShieldAlert, Terminal, Cpu, Lock, Palette, Video, PenTool
};