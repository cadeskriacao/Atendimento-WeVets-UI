import React from 'react';
import { User, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-indigo-600 tracking-tight">
            WeVets
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-1 py-5">
              Início
            </a>
          </nav>
        </div>

        <div className="flex-1 text-center font-medium text-gray-700 hidden sm:block">
          Atendimento WeVets
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-indigo-600 font-medium text-sm">Ajuda</a>
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
