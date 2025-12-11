import React from 'react';
import { Printer } from 'lucide-react';
import { Modal } from '../../../../components/ui/Modal';
import { CartItem } from '../../../../domain/models/cart.model';

interface ConfirmBudgetModalProps {
    items: CartItem[];
    onClose: () => void;
    onConfirm: () => void;
    onSendLink: () => void;
}

export const ConfirmBudgetModal: React.FC<ConfirmBudgetModalProps> = ({ items, onClose, onConfirm, onSendLink }) => {
    const totalServices = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = items.reduce((acc, item) => acc + (item.copay * item.quantity) + ((item.anticipationFee || 0) * item.quantity) + ((item.limitFee || 0) * item.quantity), 0);

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title="Confirmar orçamento"
            maxWidth="max-w-xl"
            headerAction={
                <button className="p-2 text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors">
                    <Printer size={18} />
                </button>
            }
        >
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm text-gray-600">Revise os detalhes e valores do orçamento antes de enviar ao tutor</p>
            </div>

            <div className="px-6 py-4 max-h-[40vh] overflow-y-auto">
                {items.map(item => (
                    <div key={item.id} className="mb-6 last:mb-0">
                        <p className="text-xs text-gray-500 mb-1">{item.code}</p>
                        <h4 className="font-bold text-gray-800 text-base mb-3">{item.name}</h4>
                        <div className="space-y-2 bg-gray-50 p-3 rounded-md border border-gray-100">
                            {item.anticipationFee ? (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Antecipação</span>
                                    <span className="font-medium text-gray-800">R$ {(item.anticipationFee * item.quantity).toFixed(2).replace('.', ',')}</span>
                                </div>
                            ) : null}
                            {item.limitFee ? (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Compra de limite</span>
                                    <span className="font-medium text-gray-800">R$ {(item.limitFee * item.quantity).toFixed(2).replace('.', ',')}</span>
                                </div>
                            ) : null}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Coparticipação</span>
                                <span className="font-medium text-gray-800">R$ {(item.copay * item.quantity).toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-end mb-4 font-bold text-gray-800 text-lg">
                    <span className="text-base font-normal text-gray-600">Total de serviços: {totalServices}</span>
                    <span>Total orçado: R$ {totalValue.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    Observação: Os valores apresentados são estimativas. Valores finais podem variar de acordo com a execução dos serviços.
                </p>

                <div className="flex gap-3 mb-3">
                    <button onClick={onClose} className="flex-1 bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors">
                        Voltar
                    </button>
                    <button onClick={onConfirm} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
                        Confirmar e enviar
                    </button>
                </div>
                <button onClick={onSendLink} className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors">
                    Enviar link de antecipação para o tutor
                </button>
            </div>
        </Modal>
    )
}
