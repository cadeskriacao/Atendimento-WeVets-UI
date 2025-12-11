import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../../components/ui/Modal';
import { Service } from '../../../../domain/models/service.model';

interface LimitExceededModalProps {
    service: Service | null;
    onClose: () => void;
    onSendLink: () => void;
    onAddToBudget: (fee: number) => void;
}

export const LimitExceededModal: React.FC<LimitExceededModalProps> = ({ service, onClose, onSendLink, onAddToBudget }) => {
    if (!service) return null;
    const limitFee = 300.00;

    return (
        <Modal isOpen={true} onClose={onClose} title="Limite Excedido">
            <div className="p-6 pt-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3 items-start">
                    <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5">
                        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-red-800 text-sm mb-1">Limite de uso atingido</h4>
                        <p className="text-red-700 text-sm">
                            O limite anual para este serviço foi atingido. Para realizar o atendimento, é necessário comprar limite adicional.
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Valor do limite extra</span>
                        <span className="font-bold text-gray-800">R$ {limitFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button onClick={onSendLink} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors">
                        Enviar link de pagamento agora
                    </button>
                    <button onClick={() => onAddToBudget(limitFee)} className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors">
                        Adicionar ao orçamento
                    </button>
                    <button onClick={onClose} className="w-full text-gray-500 font-medium py-2 hover:text-gray-700">
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
