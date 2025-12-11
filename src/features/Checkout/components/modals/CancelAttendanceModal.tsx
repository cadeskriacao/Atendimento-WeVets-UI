import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Modal } from '../../../../components/ui/Modal';

interface CancelAttendanceModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export const CancelAttendanceModal: React.FC<CancelAttendanceModalProps> = ({ onClose, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [otherReasonText, setOtherReasonText] = useState<string>('');

    const reasons = [
        { id: 'absent', label: 'Tutor não compareceu / estava em casa' },
        { id: 'other', label: 'Outro motivo' }
    ];

    const isConfirmDisabled = !selectedReason || (selectedReason === 'other' && !otherReasonText.trim());

    return (
        <Modal isOpen={true} onClose={onClose} title="Cancelar atendimento" maxWidth="max-w-md">
            <div className="p-6 pt-2">
                <div className="mb-4">
                    <p className="font-bold text-gray-800 mb-1">Dia 14/02/2024 às 14:30</p>
                    <p className="text-sm text-gray-600">WeVets - Unidade Jardins (aqui)</p>
                    <p className="text-sm text-gray-600">Rua Augusta, 1234 - Jardins, São Paulo - SP</p>
                </div>

                <button className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-2.5 rounded-md hover:bg-indigo-50 transition-colors mb-6 text-sm">
                    Ver anamnese
                </button>

                <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Informe o motivo</h4>
                    <div className="space-y-3">
                        {reasons.map(reason => (
                            <button
                                key={reason.id}
                                onClick={() => setSelectedReason(reason.id)}
                                className={`w-full p-3 rounded-md border flex items-center justify-center gap-2 font-medium transition-all
                                    ${selectedReason === reason.id
                                        ? 'bg-teal-700 text-white border-teal-700'
                                        : 'bg-white text-indigo-600 border-indigo-200 hover:border-indigo-400'
                                    }
                                `}
                            >
                                {selectedReason === reason.id && <CheckIcon className="w-4.5 h-4.5" />}
                                {reason.label}
                            </button>
                        ))}
                    </div>

                    {selectedReason === 'other' && (
                        <textarea
                            className="w-full mt-3 border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none text-sm animate-in fade-in slide-in-from-top-2 duration-200"
                            placeholder="Inclua uma breve descrição do motivo do não-comparecimento"
                            value={otherReasonText}
                            onChange={(e) => setOtherReasonText(e.target.value)}
                        />
                    )}
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onConfirm}
                        disabled={isConfirmDisabled}
                        className={`w-full font-bold py-3 rounded-md transition-colors shadow-sm
                            ${isConfirmDisabled
                                ? 'bg-indigo-300 text-white cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }
                        `}
                    >
                        Cancelar atendimento
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
