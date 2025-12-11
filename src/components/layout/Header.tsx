import React from 'react';
import { UserIcon, QuestionMarkCircleIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export const Header: React.FC = () => {
    return (
        <header className="bg-white border-b border-surface-border sticky top-0 z-50 shadow-sm" role="banner">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* Logo & Main Nav */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-indigo-600">
                        <div className="bg-indigo-600 text-white p-1 rounded-lg">
                            <Squares2X2Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">WeVets</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6" aria-label="Navegação Principal">
                        <a
                            href="#"
                            className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-1 py-5 text-sm"
                            aria-current="page"
                        >
                            Atendimento
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 font-medium hover:text-indigo-600 px-1 py-5 text-sm transition-colors border-b-2 border-transparent hover:border-indigo-100"
                        >
                            Agenda
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 font-medium hover:text-indigo-600 px-1 py-5 text-sm transition-colors border-b-2 border-transparent hover:border-indigo-100"
                        >
                            Vendas
                        </a>
                    </nav>
                </div>

                {/* Center Title (Desktop only) */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        Portal de Atendimento
                    </span>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    <button
                        className="text-gray-400 hover:text-indigo-600 transition-colors p-2 hover:bg-gray-50 rounded-full"
                        aria-label="Ajuda e Suporte"
                        title="Ajuda"
                    >
                        <QuestionMarkCircleIcon className="w-5 h-5" />
                    </button>

                    <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

                    <button
                        className="flex items-center gap-3 cursor-pointer bg-white hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-all border border-indigo-200 hover:border-indigo-300 group shadow-sm"
                        aria-label="Menu do Usuário"
                        aria-haspopup="true"
                    >
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                            <UserIcon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start hidden sm:flex">
                            <span className="text-indigo-950 font-bold text-sm leading-tight">Dr. Fernando</span>
                            <span className="text-xs text-gray-500 leading-tight">Veterinário</span>
                        </div>
                        <ChevronDownIcon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                    </button>
                </div>
            </div>
        </header>
    );
};
