import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Modal } from '../../../../components/ui/Modal';

interface ScheduleModalProps {
    onClose: () => void;
    onConfirm?: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose, onConfirm }) => {

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Agendar Atendimento">
            <div className="p-6 pt-2">
                <p className="text-gray-500 text-sm mb-6">Selecione uma data e horário para agendar o retorno ou realização dos serviços.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Data</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <CalendarIcon size={18} />
                            </div>
                            <input
                                type="date"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Horário</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Clock size={18} />
                            </div>
                            <input
                                type="time"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Confirmar Agendamento
                    </button>
                </div>
            </div>
        </Modal>
    );
};
