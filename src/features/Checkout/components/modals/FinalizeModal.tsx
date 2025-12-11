import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../../components/ui/Modal';
import { CartItem } from '../../../../domain/models/cart.model';

// This could be moved to a shared constant or context
const MOCK_CONTRACTED_SERVICES = [
    { name: 'Consulta clínica geral', price: 50.00 },
    { name: 'Hemograma completo', price: 50.00 },
    { name: 'Vacina antirrábica', price: 50.00 }
];

interface FinalizeModalProps {
    items: CartItem[];
    onClose: () => void;
    isAttendanceMode?: boolean;
    onSendPaymentLink?: () => void;
    isFeesPaid?: boolean;
    onCancelProcess?: () => void;
}

export const FinalizeModal: React.FC<FinalizeModalProps> = ({
    items,
    onClose,
    isAttendanceMode = false,
    onSendPaymentLink,
    isFeesPaid = false,
    onCancelProcess
}) => {

    // Identify items with pending fees using generic logic (anticipation or limit)
    const pendingItems = items.filter(item => (item.anticipationFee && item.anticipationFee > 0) || (item.limitFee && item.limitFee > 0));

    const hasPendingFees = pendingItems.length > 0 && !isFeesPaid;

    const displayItems = hasPendingFees ? items.filter(item => !pendingItems.includes(item)) : items;

    const cartTotal = displayItems.reduce((sum, item) => sum + (item.copay * item.quantity), 0);
    const contractedTotal = isAttendanceMode ? MOCK_CONTRACTED_SERVICES.reduce((acc, item) => acc + item.price, 0) : 0;
    const grandTotal = cartTotal + contractedTotal;

    const totalPending = pendingItems.reduce((acc, item) => {
        const anticipation = item.anticipationFee ? item.anticipationFee * item.quantity : 0;
        const limit = item.limitFee ? item.limitFee * item.quantity : 0;
        return acc + anticipation + limit;
    }, 0);

    return (
        <Modal isOpen={true} onClose={onClose} title="Finalizar atendimento">
            <div className="p-6 pt-2">
                <div className="text-gray-600 mb-6 text-sm">
                    <p className="mb-1"><strong className="text-gray-800">Dia 14/02/2024 às 14:30</strong></p>
                    <p className="mb-1">WeVets - Unidade Jardins (aqui)</p>
                    <p>Rua Augusta, 1234 - Jardins, São Paulo - SP</p>
                </div>

                {hasPendingFees && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex gap-2 items-start mb-4">
                            <ExclamationTriangleIcon className="text-indigo-600 shrink-0 mt-0.5 w-5 h-5" />
                            <p className="text-indigo-600 font-bold text-base leading-tight">
                                Atenção! Tutor precisa realizar esses pagamentos antes de finalizar o atendimento
                            </p>
                        </div>

                        <div className="space-y-4 mb-5">
                            {pendingItems.map(item => (
                                <div key={item.id} className="flex justify-between items-start text-sm">
                                    <div>
                                        <span className="font-bold text-gray-800 block mb-0.5">{item.name}</span>
                                        <span className="text-xs text-gray-600">
                                            {item.anticipationFee ? 'Antecipação da Carência:' : 'Compra de Limite:'}
                                        </span>
                                    </div>
                                    <span className="font-bold text-gray-800">
                                        R$ {((item.anticipationFee || 0) + (item.limitFee || 0)).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center text-sm font-bold text-gray-900 border-t border-indigo-200 pt-3 mb-4">
                            <span>Total</span>
                            <span className="text-lg">R$ {totalPending.toFixed(2).replace('.', ',')}</span>
                        </div>

                        <button
                            onClick={onSendPaymentLink}
                            className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-2.5 rounded hover:bg-indigo-100 transition-colors shadow-sm"
                        >
                            Enviar link de pagamento pro tutor
                        </button>
                    </div>
                )}

                <div className="border-t border-b border-gray-100 py-4 mb-6">
                    <div className="flex justify-between font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        <span>Serviços contratados</span>
                        <span>Coparticipação</span>
                    </div>

                    <div className="space-y-4 text-sm text-gray-600 mb-4 max-h-[30vh] overflow-y-auto pr-2">
                        {isAttendanceMode && (
                            <>
                                {MOCK_CONTRACTED_SERVICES.map((service, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <span className="text-gray-600">{service.name}</span>
                                        <span className="font-medium text-gray-600">R$ {service.price.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                ))}
                            </>
                        )}

                        {displayItems.length > 0 && (
                            <div className={`${isAttendanceMode ? "mt-4" : ""}`}>
                                {displayItems.map(item => (
                                    <div key={item.id} className="flex justify-between">
                                        <span className={isAttendanceMode ? "text-gray-800 font-medium" : ""}>
                                            {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
                                        </span>
                                        <span className={`font-medium ${isAttendanceMode ? 'text-gray-800' : 'text-gray-800'}`}>
                                            R$ {(item.copay * item.quantity).toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-lg font-bold bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <span className="text-gray-600">Total</span>
                        <span className="text-indigo-600">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-bold text-gray-800 mb-3 text-sm">Forma de pagamento recebida</p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="payment" className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" disabled={hasPendingFees} />
                            <span className={`group-hover:text-indigo-600 transition-colors ${hasPendingFees ? 'text-gray-300' : 'text-gray-700'}`}>PIX</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="payment" className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" disabled={hasPendingFees} />
                            <span className={`group-hover:text-indigo-600 transition-colors ${hasPendingFees ? 'text-gray-300' : 'text-gray-700'}`}>Cartão de crédito/débito</span>
                        </label>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancelProcess ? onCancelProcess : onClose}
                        className="flex-1 bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onClose}
                        disabled={hasPendingFees}
                        className="flex-[2] bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Finalizar atendimento
                    </button>
                </div>
            </div>
        </Modal>
    );
};
