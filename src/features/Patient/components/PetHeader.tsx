import React from 'react';
import { Pet, Tutor } from '../../../domain/models/pet.model';
import { Calendar, Cat, User, Phone, ChevronRight, Activity, Percent, ShieldCheck } from 'lucide-react';

interface PetHeaderProps {
    pet: Pet;
    tutor: Tutor;
    onDetailsClick?: () => void;
    isAttendanceActive?: boolean;
}

export const PetHeader: React.FC<PetHeaderProps> = ({ pet, tutor, onDetailsClick, isAttendanceActive }) => {
    return (
        <header className="bg-white border-b border-surface-border shadow-sm w-full relative z-20" aria-label="Informações do Paciente">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">

                {/* Active Attendance Banner */}
                {isAttendanceActive && (
                    <div role="alert" className="mb-6 bg-indigo-50 border border-indigo-100 text-indigo-900 px-5 py-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm animate-in slide-in-from-top duration-300">
                        <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0">
                            <Activity size={18} className="text-indigo-600" />
                        </div>
                        <div className="flex-grow">
                            <span className="font-bold block text-indigo-800 text-base">Pet em atendimento médico</span>
                            <span className="text-indigo-600 text-xs font-medium uppercase tracking-wide">Data de entrada: {pet.appointmentInfo || 'Data desconhecida'}</span>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                            <button className="flex-1 sm:flex-none justify-center px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-all uppercase tracking-wide focus:ring-2 focus:ring-indigo-200 focus:outline-none">
                                Cancelar
                            </button>
                            <button
                                onClick={onDetailsClick}
                                className="flex-1 sm:flex-none justify-center px-4 py-2 bg-indigo-600 text-white border border-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all uppercase tracking-wide shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 focus:outline-none"
                            >
                                Ver Detalhes
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Pet Avatar with Status Ring */}
                    <div className="flex-shrink-0 relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 border-4 border-white shadow-md overflow-hidden ring-1 ring-gray-100">
                            {pet.image ? (
                                <img src={pet.image} alt={`Foto de ${pet.name}`} className="w-full h-full object-cover" />
                            ) : (
                                <Cat size={40} strokeWidth={1.5} />
                            )}
                        </div>

                    </div>

                    {/* Main Info Grid */}
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-8 w-full">

                        {/* Column 1: Pet Identity */}
                        <div className="md:col-span-4 space-y-3">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-none mb-1">
                                    {pet.name}
                                </h1>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <span className="capitalize">{pet.type}</span> • <span className="capitalize">{pet.breed}</span> • <span>{pet.gender}</span>
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button className="px-3 py-1.5 border border-gray-200 text-gray-600 bg-gray-50 rounded-md text-xs font-bold hover:bg-gray-100 transition-colors uppercase tracking-wide flex items-center gap-1">
                                    Mais Informações <ChevronRight size={12} />
                                </button>
                                <button className="px-3 py-1.5 border border-indigo-100 text-indigo-700 bg-indigo-50 rounded-md text-xs font-bold hover:bg-indigo-100 transition-colors uppercase tracking-wide">
                                    Atualizar peso
                                </button>
                            </div>
                        </div>

                        {/* Column 2: Stats */}
                        <div className="md:col-span-3 space-y-1 py-1">
                            <h3 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Dados Vitais</h3>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-gray-100 p-1.5 rounded text-gray-400"><Calendar size={14} /></div>
                                <div>
                                    <div className="text-xs text-gray-500">Nascimento</div>
                                    <div className="text-sm font-bold text-gray-900">{pet.birthDate}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-1.5 rounded text-gray-400"><Activity size={14} /></div>
                                <div>
                                    <div className="text-xs text-gray-500">Idade</div>
                                    <div className="text-sm font-bold text-gray-900">{pet.age}</div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Plan Badges */}
                        <div className="md:col-span-5 flex flex-col gap-3">
                            <h3 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Cobertura</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-600/20">
                                    <ShieldCheck size={12} /> {pet.plan}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-gray-700 border border-gray-200">
                                    <Percent size={12} className="text-gray-400" /> Coparticipação
                                </span>
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white text-gray-700 border border-gray-200">
                                    Rede WeVets + Credenciada
                                </span>
                            </div>

                            {/* Tutor Info Box */}
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between group cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                        {tutor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Tutor Responsável</div>
                                        <div className="text-sm font-bold text-gray-900">{tutor.name}</div>
                                    </div>
                                </div>
                                <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                                    <Phone size={16} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};
