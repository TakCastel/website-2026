export type Language = 'en' | 'fr';

export interface MultiLangString {
  en: string;
  fr: string;
}

export type ProjectCategory = 'client' | 'product' | 'lab' | 'agency';

export interface Project {
  id: string;
  title: MultiLangString;
  role: MultiLangString;
  period: string;
  description: MultiLangString;
  stack: string[];
  link?: string;
  featured?: boolean;
  image?: string;
  type: 'freelance' | 'agency' | 'product' | 'student';
  category: ProjectCategory;
  confidential?: boolean;
}

export interface SkillCategory {
  name: MultiLangString;
  skills: string[];
}

export interface Service {
  title: MultiLangString;
  icon: string;
  description: MultiLangString;
  features: MultiLangString[];
}

export interface TeamMember {
  role: MultiLangString;
  name?: string; // Optional if we want to keep it vague "A Director"
  description: MultiLangString;
}

export interface ProcessStep {
  number: string;
  title: MultiLangString;
  description: MultiLangString;
}

export interface PricingPackage {
  title: MultiLangString;
  price: string;
  features: MultiLangString[];
  idealFor: MultiLangString;
}
