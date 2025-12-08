import React from 'react';
import { SKILLS_DATA } from '../constants';
import { Terminal, Cpu, Database, Layout } from 'lucide-react';
import { MultiLangString } from '../types';

interface SkillsGridProps {
  lang: keyof MultiLangString;
}

const SkillsChart: React.FC<SkillsGridProps> = ({ lang }) => {
  const getIcon = (index: number) => {
    switch(index) {
      case 0: return <Layout className="w-6 h-6 text-green-400" />;
      case 1: return <Database className="w-6 h-6 text-green-400" />;
      case 2: return <Terminal className="w-6 h-6 text-green-400" />;
      default: return <Cpu className="w-6 h-6 text-green-400" />;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {SKILLS_DATA.map((category, idx) => (
        <div 
          key={idx} 
          className="bg-black/40 border border-slate-800 p-6 relative overflow-hidden group hover:border-green-500/50 transition-colors"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-slate-600 group-hover:border-green-500 transition-colors"></div>
          
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
            {getIcon(idx)}
            <h3 className="font-mono text-lg text-slate-200 uppercase tracking-widest">
              {category.name[lang]}
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {category.skills.map((skill, sIdx) => (
              <span 
                key={sIdx} 
                className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 text-sm font-mono hover:bg-green-900/20 hover:text-green-400 hover:border-green-500/30 transition-all cursor-crosshair"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsChart;
