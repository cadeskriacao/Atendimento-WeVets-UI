import React from 'react';
import { Clock } from 'lucide-react';
import { Modal } from '../../../../components/ui/Modal';
import { Service } from '../../../../domain/models/service.model';

interface GracePeriodModalProps {
    service: Service | null;
    onClose: () => void;
    onSendLink: () => void;
    onAddToBudget: (fee: number) => void;
}

export const GracePeriodModal: React.FC<GracePeriodModalProps> = ({ service, onClose, onSendLink, onAddToBudget }) => {
    if (!service) return null;
    const anticipationFee = 300.00;

    return (
        <Modal isOpen={true} onClose={onClose} title="Carência Identificada">
            <div className="p-6 pt-2">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex gap-3 items-start">
                    <div className="bg-orange-100 p-1.5 rounded-full text-orange-600 mt-0.5">
                        <Clock size={16} />
                    </div>
                    <div>
                        <h4 className="font-bold text-orange-800 text-sm mb-1">Serviço em período de carência</h4>
                        <p className="text-orange-700 text-sm">
                            Este serviço possui carência de 60 dias. Para realizar o atendimento agora, é necessário pagar uma taxa de antecipação.
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Valor da antecipação</span>
                        <span className="font-bold text-gray-800">R$ {anticipationFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button onClick={onSendLink} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors">
                        Enviar link de pagamento agora
                    </button>
                    <button onClick={() => onAddToBudget(anticipationFee)} className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors">
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
