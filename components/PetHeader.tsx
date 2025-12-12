import React from 'react';
import { Pet, Tutor } from '../types';
import { Calendar, Cat } from 'lucide-react';
import { Button, Badge } from './ui';

interface PetHeaderProps {
    pet: Pet;
    tutor: Tutor;
    onDetailsClick?: () => void;
    isAttendanceActive?: boolean;
    onUpdateWeightClick?: () => void;
    onTutorInfoClick?: () => void;
    onUpgradePlanClick?: () => void;
    onHistoryClick?: () => void;
}

export const PetHeader: React.FC<PetHeaderProps> = ({
    pet,
    tutor,
    onDetailsClick,
    isAttendanceActive,
    onUpdateWeightClick,
    onTutorInfoClick,
    onUpgradePlanClick,
    onHistoryClick
}) => {

    const calculateAge = (birthDate: string) => {
        try {
            const [day, month, year] = birthDate.split('/').map(Number);
            const birth = new Date(year, month - 1, day);
            const today = new Date();
            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
                years--;
                months += 12;
            }
            return `${years} anos`;
        } catch (e) {
            return '';
        }
    };

    const age = calculateAge(pet.birthDate);

    return (

        <div className="w-full shadow-sm flex flex-col">
            {/* Active Service Banner - Full Width */}
            {isAttendanceActive && (
                <div className="bg-primary-50 border-b border-primary-100 w-full animate-in slide-in-from-top duration-300">
                    <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-2 flex items-center gap-3 text-sm text-primary-700">
                        <div className="bg-primary-100 p-1 rounded-full flex-shrink-0">
                            <Calendar size={16} className="text-primary-600" />
                        </div>
                        <span className="font-medium truncate">Pet em atendimento médico (20/11/2025 às 14:30)</span>
                        <div className="ml-auto flex gap-2 flex-shrink-0">
                            <Button variant="outline" size="sm" className="bg-white border-primary-200 text-primary-600 hover:bg-primary-50">
                                Cancelar
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onDetailsClick}
                                className="bg-white border-primary-200 text-primary-600 hover:bg-primary-50"
                            >
                                Detalhes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white border-b border-gray-200 w-full">
                <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Pet Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                                <Cat size={28} />
                            </div>
                        </div>

                        {/* Pet Details - Compact */}
                        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">

                            {/* Identity & Basic Info */}
                            <div className="lg:col-span-8 flex flex-col gap-1">
                                <h2 className="text-base md:text-lg font-bold text-gray-800 leading-tight">{pet.name}</h2>
                                <div className="text-sm text-gray-600">
                                    {pet.type} - {pet.gender} {pet.weight && `- ${pet.weight}`}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {pet.breed}
                                    <span className="text-gray-400 mx-1">•</span>
                                    <span>{age} <span className="text-gray-400">({pet.birthDate})</span></span>
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onUpdateWeightClick}
                                        className="text-xs uppercase tracking-wide border-primary-200 text-primary-600 hover:bg-primary-50"
                                    >
                                        Atualizar peso
                                    </Button>
                                    <Badge variant="neutral">WeVets Conforto</Badge>
                                    <Badge variant="neutral">Coparticipação</Badge>
                                    <Badge variant="neutral">Rede Credenciada + Rede WeVets</Badge>
                                </div>
                            </div>

                            {/* Tutor & Actions - Right */}
                            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 flex flex-col gap-1">
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Tutor(a)</div>
                                <div className="font-bold text-gray-800 text-sm">{tutor.name}</div>
                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                    {tutor.phone}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={onTutorInfoClick}
                                        className="text-xs uppercase tracking-wide h-6 px-1 text-primary-600 hover:text-primary-800"
                                    >
                                        + infos
                                    </Button>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={onUpgradePlanClick}
                                        className="w-full lg:flex-1 border-blue-600 text-blue-800 hover:bg-blue-50 font-bold whitespace-nowrap rounded-full lg:h-8 lg:text-xs lg:px-3"
                                    >
                                        Upgrade de plano
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={onHistoryClick}
                                        className="w-full lg:flex-1 border-blue-600 text-blue-800 hover:bg-blue-50 font-bold whitespace-nowrap rounded-full lg:h-8 lg:text-xs lg:px-3"
                                    >
                                        Histórico de atendimento
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
