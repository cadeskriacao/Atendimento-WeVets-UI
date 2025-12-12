import React from 'react';
import { User, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary border-b border-primary-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-8 h-full">
          <div className="flex items-center">
            <img src="/wevets-logo-2.png" alt="WeVets Logo" className="h-10 w-auto brightness-0 invert" />
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-white text-lg tracking-wide">
          Atendimento WeVets
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-white font-medium text-sm hover:text-blue-100 transition-colors">Ajuda</a>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded-full pr-3 transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-white font-medium text-sm">Nome</span>
            <ChevronDown size={16} className="text-blue-200" />
          </div>
        </div>
      </div>
    </header>
  );
};
