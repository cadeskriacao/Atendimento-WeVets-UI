import React from 'react';
import { User, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8 h-full">
          <div className="flex items-center">
            <img src="/wevets-logo.png" alt="WeVets Logo" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-6 h-full">
            <nav className="h-full flex items-center">
              <a href="#" className="text-primary-700 font-medium border-b-2 border-primary-700 px-1 flex items-center h-full pt-1">
                Início
              </a>
            </nav>
            <div className="h-6 w-px bg-gray-400"></div>
            <div className="font-medium text-primary-700">
              Atendimento WeVets
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-primary-700 font-medium text-sm">Ajuda</a>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-full pr-3 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <User size={18} />
            </div>
            <span className="text-gray-700 font-medium text-sm">Nome</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
