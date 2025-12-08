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
  Palette,
  GraduationCap
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Tarik Talhaoui",
  title: {
    en: "Product Builder & Digital Partner",
    fr: "Product Builder & Partenaire Digital"
  },
  location: "Avignon, France",
  email: "contact@tariktalhaoui.fr",
  tagline: {
    en: "Technical Precision. Creative Impact.",
    fr: "Précision Technique. Impact Créatif."
  },
  bio: {
    en: "I don't just write code; I build digital products. As a Product Builder, I bridge the gap between complex engineering and elegant design to help your business grow.",
    fr: "Je ne fais pas que du code, je construis des produits digitaux. En tant que Product Builder, je fais le pont entre l'ingénierie technique et un design élégant pour faire grandir votre activité."
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/tarik-talhaoui-832769110/fr?originalSubdomain=fr",
    github: "https://github.com/TakCastel"
  }
};

export const CV_FULL_CONTENT = `
EXPERIENCE PROFESSIONNELLE:
- 2025: Développeur Freelance (Actuel). Conception sites sur mesure (WordPress, Next.js, Decap CMS), intégration vidéo, DevOps (OVH, Netlify, Vercel), maquettes Figma.
- 2023-2024: Lead Développeur Front-end chez Gingerminds. Création de Design Systems (Nuxt 3, TS, Tailwind), sites e-commerce, application métier headless pour transporteurs (API REST, auth, scan documents). Encadrement technique, code review, Cypress, Notion/IA.
- 2020-2022: Développeur Front-end chez Motion4ever. Apps métier, sites e-commerce (Prestashop, WordPress, Nuxt 2), outil de conformité fiscale (formulaire dynamique), interface tablette cave à vin.
- 2018-2019: Développeur Intégrateur chez Mediameeting. PWA podcasts (Nuxt 2), maintenance HTML/CSS/jQuery, Design System Material.
- 2014: Responsable d'Enquête chez AFNOR. Audit accessibilité web (RGAA).

COMPETENCES DETAILLEES:
- Front: HTML, CSS, JS, TS, Vue 3, Nuxt 3, React 19, Next.js 15, Tailwind, SCSS.
- Back/CMS: WordPress, Decap CMS, Strapi, Drupal Headless, Prestashop, Firebase.
- Outils: Git (Lab/Bucket), Postman, Notion, Trello, Asana, Agile.
- Design: UI/UX, Figma, Adobe XD, Design System, A11y (Accessibilité), RGPD.
- DevOps: CI/CD, OVH, Netlify, Vercel, Firebase, PM2, GCP, Cypress.

CERTIFICATIONS:
- React & Git (Makina Corpus, 2017)
- Intégrateur Web & Dev Front (OpenClassrooms, 2015-2017)
`;

export const CAREER_STORY = {
  title: {
    en: "My Approach",
    fr: "Mon Approche"
  },
  content: {
    en: "I bring agency-level rigor to the agility of freelance work. My goal: to make high-end web architecture accessible and useful for your business.",
    fr: "J'apporte la rigueur de l'agence à l'agilité du freelance. Mon but : rendre l'architecture web haut de gamme accessible et utile pour votre activité."
  }
};

export const TECH_DEFINITIONS: Record<string, { en: string, fr: string }> = {
  "React 19": { en: "Library for building dynamic UIs.", fr: "Technologie pour des sites rapides et fluides." },
  "Next.js 15": { en: "Framework for production, SEO & speed.", fr: "Le standard pour un site performant et bien référencé." },
  "Vue.js": { en: "Progressive JS framework.", fr: "Technologie d'interface moderne." },
  "Nuxt": { en: "The Intuitive Vue Framework.", fr: "Framework puissant pour le web." },
  "TypeScript": { en: "Typed JavaScript for secure code.", fr: "Sécurise le code de votre site." },
  "Node.js": { en: "Backend JavaScript runtime.", fr: "Fait fonctionner le site côté serveur." },
  "Tailwind": { en: "Utility-first CSS framework.", fr: "Pour un design sur-mesure rapide." },
  "Framer Motion": { en: "Production-ready animation library.", fr: "Pour des animations fluides." },
  "GSAP": { en: "High-performance animation.", fr: "Animations haut de gamme." },
  "Canvas API": { en: "2D/3D graphics rendering.", fr: "Graphismes avancés." },
  "UI/UX Systems": { en: "Design consistency & patterns.", fr: "Design cohérent et ergonomique." },
  "Docker": { en: "Containerization platform.", fr: "Outil technique de déploiement." },
  "Supabase": { en: "Open source Firebase alternative.", fr: "Base de données moderne." },
  "Strapi": { en: "Headless CMS.", fr: "Gestion de contenu flexible." },
  "Firebase": { en: "Google's app development platform.", fr: "Plateforme Google robuste." },
  "CI/CD": { en: "Continuous Integration/Deployment.", fr: "Mises à jour automatisées." },
  "Vercel": { en: "Cloud platform for frontend.", fr: "Hébergement ultra-rapide." }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    role: { en: "Lead Tech & Builder", fr: "Lead Tech & Builder" },
    name: "Tarik Talhaoui",
    description: { en: "Architecture, Development & Quality Assurance. I am your main point of contact.", fr: "Architecture, Développement & Qualité. Je suis votre interlocuteur principal." }
  },
  {
    role: { en: "Video Production", fr: "Réalisation Vidéo" },
    description: { en: "Senior Director for promotional spots and storytelling.", fr: "Réalisateur senior pour les spots promotionnels et le storytelling." }
  },
  {
    role: { en: "Art Direction", fr: "Direction Artistique" },
    description: { en: "Specialist in branding and UI refinement.", fr: "Spécialiste du branding et du raffinement UI." }
  },
  {
    role: { en: "Print & Assets", fr: "Print & Supports" },
    description: { en: "For physical brand assets and graphical charts.", fr: "Pour les supports physiques et les chartes graphiques." }
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: { en: "Audit & Strategy", fr: "Audit & Stratégie" },
    description: { 
      en: "We define the technical scope and user experience together.", 
      fr: "On définit ensemble le périmètre technique et l'expérience utilisateur." 
    }
  },
  {
    number: "02",
    title: { en: "Agile Build", fr: "Développement Agile" },
    description: { 
      en: "Iterative development. You validate each major step.", 
      fr: "Construction par étapes. Vous validez chaque brique importante." 
    }
  },
  {
    number: "03",
    title: { en: "Polishing & SEO", fr: "Optimisations & SEO" },
    description: { 
      en: "Performance tuning, security, and search engine optimization.", 
      fr: "Réglage des performances, sécurité et référencement naturel." 
    }
  },
  {
    number: "04",
    title: { en: "Deployment", fr: "Déploiement" },
    description: { 
      en: "Launch and handover. You become autonomous on your content.", 
      fr: "Mise en ligne et passage de relais. Vous devenez autonome sur vos contenus." 
    }
  }
];

export const SERVICES: Service[] = [
  {
    title: { en: "Digital Products", fr: "Produits Digitaux" },
    icon: "Layout",
    description: {
      en: "Showcase sites, Portfolios, Landing Pages. Modern architecture (Next.js/React).",
      fr: "Sites Vitrines, Portfolios, Landing Pages. Architecture moderne (Next.js/React)."
    },
    features: [
      { en: "Custom Design", fr: "Design Sur Mesure" },
      { en: "High Performance", fr: "Haute Performance" },
      { en: "Mobile First", fr: "Mobile First" }
    ]
  },
  {
    title: { en: "E-Commerce", fr: "E-Commerce" },
    icon: "Rocket",
    description: {
      en: "Robust online sales platforms. Secure and scalable.",
      fr: "Plateformes de vente en ligne robustes. Sécurisées et évolutives."
    },
    features: [
      { en: "Stripe/PayPal", fr: "Stripe/PayPal" },
      { en: "Stock Management", fr: "Gestion de Stock" },
      { en: "Conversion Focus", fr: "Focus Conversion" }
    ]
  },
  {
    title: { en: "Tech Partnership", fr: "Partenariat Tech" },
    icon: "Users",
    description: {
      en: "Long-term support. Maintenance, security updates, and evolution.",
      fr: "Accompagnement long terme. Maintenance, sécurité et évolutions."
    },
    features: [
      { en: "Maintenance", fr: "Maintenance" },
      { en: "Code Audit", fr: "Audit de Code" },
      { en: "Training", fr: "Formation" }
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  { 
    name: { en: "Core Engineering", fr: "Cœur Technique" }, 
    skills: ["React 19", "Next.js 15", "Vue.js", "Nuxt", "TypeScript", "Node.js"] 
  },
  { 
    name: { en: "Visual & Motion", fr: "Visuel & Mouvement" }, 
    skills: ["Tailwind", "Framer Motion", "GSAP", "Canvas API", "UI/UX Systems"] 
  },
  { 
    name: { en: "Infrastructure", fr: "Infrastructure" }, 
    skills: ["Docker", "Supabase", "Strapi", "Firebase", "CI/CD", "Vercel"] 
  }
];

// Configurator Data with Contextual Categories and Local Pricing
export const PRICING_CONFIG = [
  {
    id: 'landing',
    title: { en: "Landing Page", fr: "Landing Page" },
    basePrice: 900,
    description: { en: "Single page to convert visitors.", fr: "Une page unique optimisée pour convertir vos visiteurs." },
    options: [
      { id: 'design_premium', category: 'design', label: { en: "Premium UI/UX & Motion", fr: "Design Premium & Animé" }, price: 400 },
      { id: 'copywriting', category: 'marketing', label: { en: "Copywriting", fr: "Rédaction Persuasive" }, price: 300 },
      { id: 'form_advanced', category: 'tech', label: { en: "CRM Integration", fr: "Liaison CRM & Formulaire Avancé" }, price: 250 },
      { id: 'analytics', category: 'marketing', label: { en: "Advanced Analytics", fr: "Analytics & Tracking" }, price: 200 },
      { id: 'abtesting', category: 'tech', label: { en: "A/B Testing Setup", fr: "Config A/B Testing" }, price: 350 },
      { id: 'rgpd', category: 'tech', label: { en: "RGPD Compliance", fr: "Conformité RGPD" }, price: 150 }
    ]
  },
  {
    id: 'showcase',
    title: { en: "Showcase Website", fr: "Site Vitrine" },
    basePrice: 1600,
    description: { en: "Complete presence (Home, About, Services, Contact).", fr: "Présence complète (Accueil, A Propos, Services, Contact)." },
    options: [
      { id: 'cms', category: 'tech', label: { en: "CMS (Admin Panel)", fr: "Interface d'administration sur-mesure" }, price: 500 },
      { id: 'map', category: 'tech', label: { en: "Interactive Map", fr: "Carte Interactive / Store Locator" }, price: 250 },
      { id: 'seo', category: 'marketing', label: { en: "Local SEO Pack", fr: "Pack Référencement Local" }, price: 450 },
      { id: 'reviews', category: 'marketing', label: { en: "Reviews Integration", fr: "Intégration Avis Clients (Google/Trust)" }, price: 200 },
      { id: 'multi', category: 'tech', label: { en: "Multi-language", fr: "Multi-langues" }, price: 400 },
      { id: 'blog', category: 'content', label: { en: "Blog Section", fr: "Espace Blog / Actualités" }, price: 300 },
      { id: 'training_content', category: 'support', label: { en: "CMS Training (2h)", fr: "Formation Gestion Contenu (2h)" }, price: 180 }
    ]
  },
  {
    id: 'ecommerce',
    title: { en: "E-Commerce", fr: "E-Commerce" },
    basePrice: 3800,
    description: { en: "Sell your products online efficiently.", fr: "Vendez vos produits en ligne efficacement." },
    options: [
      { id: 'payment', category: 'tech', label: { en: "Stripe/PayPal Setup", fr: "Config Paiements Sécurisés" }, price: 400 },
      { id: 'products_import', category: 'content', label: { en: "Product Import (50+)", fr: "Import Produits (50+)" }, price: 500 },
      { id: 'filter', category: 'tech', label: { en: "Advanced Filtering", fr: "Filtres de recherche avancés" }, price: 600 },
      { id: 'newsletter', category: 'marketing', label: { en: "Newsletter Integration", fr: "Intégration Newsletter" }, price: 300 },
      { id: 'loyalty', category: 'marketing', label: { en: "Loyalty Program", fr: "Système de Fidélité" }, price: 450 },
      { id: 'abandoned_cart', category: 'marketing', label: { en: "Abandoned Cart Recovery", fr: "Relance Paniers Abandonnés" }, price: 350 },
      { id: 'b2b', category: 'tech', label: { en: "B2B Mode (Quotes/TVA)", fr: "Mode B2B (Devis/TVA)" }, price: 600 },
      { id: 'training_shop', category: 'support', label: { en: "Shop Management Training", fr: "Formation Gestion Boutique" }, price: 250 }
    ]
  },
  {
    id: 'webapp',
    title: { en: "Web App / Custom", fr: "App Sur Mesure" },
    basePrice: 6000,
    description: { en: "SaaS, internal tool, complex logic.", fr: "SaaS, outil métier, logique complexe." },
    options: [
      { id: 'auth', category: 'tech', label: { en: "User Auth & Roles", fr: "Auth & Gestion des Rôles" }, price: 800 },
      { id: 'dashboard', category: 'tech', label: { en: "Admin Dashboard", fr: "Tableau de bord Admin" }, price: 1200 },
      { id: 'notifications', category: 'tech', label: { en: "Real-time Notifications", fr: "Notifications Temps Réel" }, price: 500 },
      { id: 'api', category: 'tech', label: { en: "External API Connect", fr: "Connexion API Tiers (ERP/CRM)" }, price: 1000 },
      { id: 'pwa', category: 'tech', label: { en: "Mobile App (PWA)", fr: "Version Mobile (PWA)" }, price: 1500 },
      { id: 'testing', category: 'tech', label: { en: "E2E Testing", fr: "Tests Automatisés (E2E)" }, price: 600 },
      { id: 'docs', category: 'support', label: { en: "Technical Docs", fr: "Documentation Technique" }, price: 400 },
      { id: 'training_admin', category: 'support', label: { en: "Admin Training", fr: "Formation Administrateur" }, price: 300 }
    ]
  }
];

// Using optimized images (w=800 for thumbnails, w=1200 for larger) to improve LCP and general performance
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
    image: "https://picsum.photos/seed/polinizz/1200/800", 
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
    stack: ["React", "LocalStorage", "State Management", "UI/UX"],
    link: "https://serpenter.netlify.app/",
    type: "product",
    category: "product",
    image: "https://picsum.photos/seed/serpenter/1200/800", 
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
    image: "https://picsum.photos/seed/arnaudban/1200/800", 
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
    image: "https://picsum.photos/seed/florine/1200/800", 
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
    image: "https://picsum.photos/seed/brice/1200/800", 
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
    image: "https://picsum.photos/seed/soleil/1200/800", 
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
    image: "https://picsum.photos/seed/prehisto/1200/800",
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
    image: "https://picsum.photos/seed/archeode/1200/800",
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
    image: "https://picsum.photos/seed/thread/1200/800",
    confidential: false
  }
];

export const ICONS: Record<string, React.FC<any>> = {
  Code2, Rocket, Users, Layout, Database, Smartphone, Globe, Search, ShieldAlert, Terminal, Cpu, Lock, Palette, Video, PenTool, GraduationCap
};