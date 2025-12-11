import React from 'react';
import { Pet, Tutor } from '../types';
import { Calendar, Cat } from 'lucide-react';

interface PetHeaderProps {
  pet: Pet;
  tutor: Tutor;
  onDetailsClick?: () => void; // Callback para abrir modal de detalhes
  isAttendanceActive?: boolean;
}

export const PetHeader: React.FC<PetHeaderProps> = ({ pet, tutor, onDetailsClick, isAttendanceActive }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
            {/* Active Service Banner - Aligned with App.tsx banners */}
            {isAttendanceActive && (
                <div className="mb-6 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-3 rounded-md flex items-center gap-3 text-sm animate-in slide-in-from-top duration-300">
                    <div className="bg-indigo-100 p-1 rounded-full">
                        <Calendar size={16} className="text-indigo-600" />
                    </div>
                    <span className="font-medium">Pet em atendimento médico (20/11/2025 às 14:30)</span>
                    <div className="ml-auto flex gap-2">
                    <button className="bg-white border border-indigo-200 text-indigo-600 px-3 py-1 rounded text-xs font-medium hover:bg-indigo-50 transition-colors">
                        Cancelar
                    </button>
                    <button 
                        onClick={onDetailsClick}
                        className="bg-white border border-indigo-200 text-indigo-600 px-3 py-1 rounded text-xs font-medium hover:bg-indigo-50 transition-colors"
                    >
                        Detalhes
                    </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                {/* Pet Avatar */}
                <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                    <Cat size={32} />
                </div>
                </div>

                {/* Pet Details */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h2>
                    <div className="text-sm text-gray-600 mb-4">
                    {pet.type} - {pet.gender}<br />
                    {pet.breed}
                    </div>
                    <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-indigo-300 text-indigo-600 rounded text-xs font-bold hover:bg-indigo-50 transition-colors uppercase tracking-wide">
                        + infos do Pet
                    </button>
                    <button className="px-3 py-1.5 border border-indigo-300 text-indigo-600 rounded text-xs font-bold hover:bg-indigo-50 transition-colors uppercase tracking-wide">
                        Atualizar peso
                    </button>
                    </div>
                </div>

                <div className="md:col-span-2 text-sm">
                    <div className="text-gray-500 mb-1 text-xs uppercase font-bold tracking-wide">Nascimento</div>
                    <div className="font-medium text-gray-800">{pet.birthDate}</div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2 items-start">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-gray-200 text-gray-600 bg-gray-50">
                    WeVets Conforto
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-gray-200 text-gray-600 bg-gray-50">
                    Coparticipação
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-gray-200 text-gray-600 bg-gray-50">
                    Rede Credenciada + Rede WeVets
                    </span>
                </div>

                <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div className="text-xs text-gray-400 mb-1 font-bold uppercase tracking-wide">Tutor(a)</div>
                    <div className="font-bold text-gray-800 mb-1">{tutor.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{tutor.phone}</div>
                    <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 mb-4 block uppercase tracking-wide">
                    + infos do Tutor
                    </a>
                    
                    <div className="flex flex-col gap-2">
                        <button className="w-full text-center px-3 py-1.5 border border-indigo-300 text-indigo-600 rounded text-sm font-bold hover:bg-indigo-50 shadow-sm">
                        Upgrade de plano
                        </button>
                        <button className="w-full text-center px-3 py-1.5 border border-indigo-300 text-indigo-600 rounded text-sm font-bold hover:bg-indigo-50 shadow-sm">
                        Histórico de atendimento
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};
