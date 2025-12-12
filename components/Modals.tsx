import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Cat, ShoppingCart, Trash2, Upload, Printer, Info, CheckCircle2, AlertTriangle, Check } from 'lucide-react';
import { CartItem, ModalType, Pet, Service, Tutor } from '../types';
import { MOCK_BUDGET_ITEMS } from '../constants';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
    headerAction?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, maxWidth = "max-w-lg", headerAction }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200">
            <div className={`bg-white rounded-lg shadow-2xl w-full ${maxWidth} overflow-hidden animate-in zoom-in-95 duration-200 relative`}>
                {title && (
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                        {headerAction && <div className="mr-8">{headerAction}</div>}
                    </div>
                )}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10">
                    <X size={20} />
                </button>
                <div className="p-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Dados Mockados dos serviços já contratados no início do atendimento
const MOCK_CONTRACTED_SERVICES = [
    { name: 'Consulta clínica geral', price: 50.00 },
    { name: 'Hemograma completo', price: 50.00 },
    { name: 'Vacina antirrábica', price: 50.00 }
];

export const ServiceDetailsModal: React.FC<{
    onClose: () => void;
    onAddService: () => void;
    onFinalize: () => void;
    cartItems: CartItem[];
}> = ({ onClose, onAddService, onFinalize, cartItems }) => {

    const contractedTotal = MOCK_CONTRACTED_SERVICES.reduce((acc, item) => acc + item.price, 0);
    const newServicesTotal = cartItems.reduce((acc, item) => acc + (item.copay * item.quantity), 0);
    const grandTotal = contractedTotal + newServicesTotal;

    return (
        <Modal isOpen={true} onClose={onClose} title="Detalhes do atendimento" maxWidth="max-w-md">
            <div className="p-6 pt-2">
                <div className="mb-4">
                    <p className="font-bold text-gray-800 mb-1">Dia 14/02/2024 às 14:30</p>
                    <p className="text-sm text-gray-600">WeVets - Unidade Jardins (aqui)</p>
                    <p className="text-sm text-gray-600">Rua Augusta, 1234 - Jardins, São Paulo - SP</p>
                </div>

                <div className="w-full border border-primary-200 rounded-md p-3 mb-6">
                    <button className="w-full text-primary-600 text-sm font-medium hover:underline">
                        Ver anamnese
                    </button>
                </div>

                <div className="max-h-[40vh] overflow-y-auto pr-1">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Serviços já contratados</h4>
                    <div className="space-y-3 mb-6">
                        {MOCK_CONTRACTED_SERVICES.map((service, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600">{service.name}</span>
                                <span className="font-medium text-gray-600">R$ {service.price.toFixed(2).replace('.', ',')}</span>
                            </div>
                        ))}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="mb-6 animate-in slide-in-from-bottom duration-300">
                            <h4 className="font-bold text-primary-700 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                Serviços adicionados agora
                            </h4>
                            <div className="space-y-3 bg-primary-50 p-3 rounded-lg border border-primary-100">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-primary-900 font-medium">
                                            {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
                                        </span>
                                        <span className="font-bold text-primary-700">R$ {(item.copay * item.quantity).toFixed(2).replace('.', ',')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-8">
                    <span className="font-bold text-gray-800">Total Geral</span>
                    <span className="font-bold text-gray-800 text-lg">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onAddService}
                        className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors"
                    >
                        Adicionar serviço
                    </button>
                    <button
                        onClick={onFinalize}
                        className="w-full bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors shadow-sm"
                    >
                        Finalizar atendimento
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors"
                    >
                        Cancelar atendimento
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const ConfirmBudgetModal: React.FC<{
    items: CartItem[];
    onClose: () => void;
    onConfirm: () => void;
    onSendLink: () => void;
}> = ({ items, onClose, onConfirm, onSendLink }) => {
    const totalServices = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = items.reduce((acc, item) => acc + (item.copay * item.quantity) + ((item.anticipationFee || 0) * item.quantity) + ((item.limitFee || 0) * item.quantity), 0);

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title="Confirmar orçamento"
            maxWidth="max-w-xl"
            headerAction={
                <button className="p-2 text-primary-600 border border-primary-200 rounded hover:bg-primary-50 transition-colors">
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
                    <button onClick={onClose} className="flex-1 bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors">
                        Voltar
                    </button>
                    <button onClick={onConfirm} className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors shadow-sm">
                        Confirmar e enviar
                    </button>
                </div>
                <button onClick={onSendLink} className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors">
                    Enviar link de antecipação para o tutor
                </button>
            </div>
        </Modal>
    )
}

export const FinalizeModal: React.FC<{
    items: CartItem[];
    onClose: () => void;
    isAttendanceMode?: boolean;
    onSendPaymentLink?: () => void;
    isFeesPaid?: boolean;
    onCancelProcess?: () => void;
}> = ({ items, onClose, isAttendanceMode = false, onSendPaymentLink, isFeesPaid = false, onCancelProcess }) => {

    // Identificar itens com pendências
    const pendingItems = items.filter(item => (item.anticipationFee && item.anticipationFee > 0) || (item.limitFee && item.limitFee > 0));

    // Determinar se há bloqueio ativo (tem pendências e não foi pago)
    const hasPendingFees = pendingItems.length > 0 && !isFeesPaid;

    // Filtrar itens para exibição na lista principal: Se houver bloqueio, remove os itens pendentes da lista visual
    const displayItems = hasPendingFees ? items.filter(item => !pendingItems.includes(item)) : items;

    // Calcular totais baseados nos itens visíveis
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

                {/* Warning Banner for Pending Fees */}
                {hasPendingFees && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 mb-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex gap-2 items-start mb-4">
                            <AlertTriangle className="text-primary-600 shrink-0 mt-0.5" size={20} />
                            <p className="text-primary-600 font-bold text-base leading-tight">
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

                        <div className="flex justify-between items-center text-sm font-bold text-gray-900 border-t border-primary-200 pt-3 mb-4">
                            <span>Total</span>
                            <span className="text-lg">R$ {totalPending.toFixed(2).replace('.', ',')}</span>
                        </div>

                        <button
                            onClick={onSendPaymentLink}
                            className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-2.5 rounded hover:bg-primary-100 transition-colors shadow-sm"
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
                        <span className="text-primary-600">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-bold text-gray-800 mb-3 text-sm">Forma de pagamento recebida</p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="payment" className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" disabled={hasPendingFees} />
                            <span className={`group-hover:text-primary-600 transition-colors ${hasPendingFees ? 'text-gray-300' : 'text-gray-700'}`}>PIX</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="payment" className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" disabled={hasPendingFees} />
                            <span className={`group-hover:text-primary-600 transition-colors ${hasPendingFees ? 'text-gray-300' : 'text-gray-700'}`}>Cartão de crédito/débito</span>
                        </label>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancelProcess ? onCancelProcess : onClose}
                        className="flex-1 bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onClose}
                        disabled={hasPendingFees}
                        className="flex-[2] bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Finalizar atendimento
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const CancelAttendanceModal: React.FC<{
    onClose: () => void;
    onConfirm: () => void;
}> = ({ onClose, onConfirm }) => {
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

                <button className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-2.5 rounded-md hover:bg-primary-50 transition-colors mb-6 text-sm">
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
                                        : 'bg-white text-primary-600 border-primary-200 hover:border-primary-400'
                                    }
                                `}
                            >
                                {selectedReason === reason.id && <Check size={18} />}
                                {reason.label}
                            </button>
                        ))}
                    </div>

                    {selectedReason === 'other' && (
                        <textarea
                            className="w-full mt-3 border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-primary-500 outline-none text-sm animate-in fade-in slide-in-from-top-2 duration-200"
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
                                ? 'bg-primary-300 text-white cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            }
                        `}
                    >
                        Cancelar atendimento
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const ScheduleModal: React.FC<{ onClose: () => void; onConfirm?: () => void }> = ({ onClose, onConfirm }) => {

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Agendar">
            <div className="p-6 pt-2">
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Data</label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="date" className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Horário</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="time" className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 bg-white border border-primary-300 text-primary-600 font-bold py-2.5 rounded-md hover:bg-primary-50 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleConfirm} className="flex-1 bg-primary-600 text-white font-bold py-2.5 rounded-md hover:bg-primary-700 transition-colors shadow-sm">
                        Confirmar agendamento
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export const BudgetDetailsModal: React.FC<{ onClose: () => void; onSchedule: () => void }> = ({ onClose, onSchedule }) => {
    const total = MOCK_BUDGET_ITEMS.reduce((sum, item) => sum + item.price, 0);

    return (
        <Modal isOpen={true} onClose={onClose} title="Detalhes do orçamento">
            <div className="p-6 pt-2">
                <div className="mb-6 text-gray-600 text-sm">
                    <p className="mb-1"><strong className="text-gray-800">Dia 14/02/2024 às 14:30</strong></p>
                    <p className="mb-1">WeVets - Unidade Jardins (aqui)</p>
                    <p className="text-sm text-gray-600">Rua Augusta, 1234 - Jardins, São Paulo - SP</p>
                </div>

                <div className="mb-8">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Serviços contratados</h4>
                    <div className="space-y-3">
                        {MOCK_BUDGET_ITEMS.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-gray-600 border-b border-gray-100 pb-2 text-sm">
                                <span>{item.name}</span>
                                <span className="font-medium text-gray-800">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold bg-gray-50 p-4 rounded-lg border border-gray-100 mt-4">
                        <span className="text-gray-600">Total</span>
                        <span className="text-primary-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors shadow-sm">
                        Enviar orçamento ao tutor
                    </button>
                    <button onClick={onSchedule} className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors">
                        Agendar
                    </button>
                    <button onClick={onClose} className="w-full bg-white border border-red-200 text-red-500 font-bold py-3 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                        Excluir orçamento
                    </button>
                </div>
            </div>
        </Modal>
    );
};

interface SearchModalProps {
    onClose: () => void;
    onSearch: () => void;
    inputValue?: string;
    onInputChange?: (value: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSearch, inputValue, onInputChange }) => {
    return (
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)] bg-white animate-in fade-in duration-300">
            <div className="max-w-xl w-full text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Novo Atendimento</h2>
                <p className="text-gray-500 mb-10 text-lg">Localize o pet por meio do CPF do tutor</p>

                <div className="text-left mb-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Digite o CPF do tutor</label>
                </div>
                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="000.000.000-00"
                        className="flex-1 border border-gray-300 rounded-lg px-6 py-4 text-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm"
                        value={inputValue}
                        onChange={(e) => onInputChange?.(e.target.value)}
                    />
                    <button
                        onClick={onSearch}
                        className="bg-primary-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-lg"
                    >
                        <span>→</span> Pesquisar
                    </button>
                </div>

                <div className="mt-8 text-left text-sm text-gray-500 border-t border-gray-100 pt-6">
                    <p className="font-bold mb-3 text-gray-400 uppercase tracking-wider text-xs">Cenários de Teste</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => onInputChange?.("111.111.111-11")}>
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono text-xs">111.111.111-11</code>
                            <span>Normal (1 Pet)</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => onInputChange?.("222.222.222-22")}>
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono text-xs">222.222.222-22</code>
                            <span>Múltiplos Pets</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => onInputChange?.("333.333.333-33")}>
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono text-xs">333.333.333-33</code>
                            <span>Pet sem plano</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => onInputChange?.("444.444.444-44")}>
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono text-xs">444.444.444-44</code>
                            <span>Inadimplente</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => onInputChange?.("555.555.555-55")}>
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono text-xs">555.555.555-55</code>
                            <span>Orçamento Salvo</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => onInputChange?.("666.666.666-66")}>
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono text-xs">666.666.666-66</code>
                            <span>Em Atendimento</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PetSelectionModal: React.FC<{
    pets: Pet[];
    onSelect: (pet: Pet) => void;
    onClose: () => void;
}> = ({ pets, onSelect, onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Selecione o Pet" maxWidth="max-w-2xl">
            <div className="p-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {pets.map((pet) => (
                    <div
                        key={pet.id}
                        onClick={() => onSelect(pet)}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all flex items-center gap-4"
                    >
                        <img src={pet.image} alt={pet.name} className="w-16 h-16 rounded-full object-cover bg-gray-200" />
                        <div>
                            <h4 className="font-bold text-gray-800">{pet.name}</h4>
                            <p className="text-sm text-gray-600">{pet.type} • {pet.breed}</p>
                            <p className="text-xs text-gray-500 mt-1">{pet.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export const AnamnesisModal: React.FC<{
    onClose: () => void;
    onSave: () => void;
}> = ({ onClose, onSave }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Anamnese" maxWidth="max-w-3xl">
            <div className="p-6 pt-2">
                <p className="text-gray-500 mb-6">Preencha os dados da anamnese abaixo.</p>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Queixa principal</label>
                        <textarea className="w-full border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Descreva o motivo da consulta..."></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Histórico</label>
                        <textarea className="w-full border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Histórico médico relevante..."></textarea>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-primary-600 font-bold hover:bg-primary-50 rounded-md">Cancelar</button>
                    <button onClick={onSave} className="px-6 py-2 bg-primary-600 text-white font-bold rounded-md hover:bg-primary-700">Salvar Anamnese</button>
                </div>
            </div>
        </Modal>
    );
};

export const GracePeriodModal: React.FC<{
    service: Service | null;
    onClose: () => void;
    onSendLink: () => void;
    onAddToBudget: (fee: number) => void;
}> = ({ service, onClose, onSendLink, onAddToBudget }) => {
    if (!service) return null;
    const anticipationFee = 300.00; // Mock fee updated to match screenshot

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
                    <button onClick={onSendLink} className="w-full bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors">
                        Enviar link de pagamento agora
                    </button>
                    <button onClick={() => onAddToBudget(anticipationFee)} className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors">
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

export const LimitExceededModal: React.FC<{
    service: Service | null;
    onClose: () => void;
    onSendLink: () => void;
    onAddToBudget: (fee: number) => void;
}> = ({ service, onClose, onSendLink, onAddToBudget }) => {
    if (!service) return null;
    const limitFee = 300.00; // Mock fee updated to match screenshot style

    return (
        <Modal isOpen={true} onClose={onClose} title="Limite Excedido">
            <div className="p-6 pt-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3 items-start">
                    <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5">
                        <AlertTriangle size={16} />
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
                    <button onClick={onSendLink} className="w-full bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors">
                        Enviar link de pagamento agora
                    </button>
                    <button onClick={() => onAddToBudget(limitFee)} className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors">
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

export const NoCoverageModal: React.FC<{
    service: Service | null;
    onClose: () => void;
    onSendLink: () => void;
}> = ({ service, onClose, onSendLink }) => {
    if (!service) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title="Sem Cobertura">
            <div className="p-6 pt-2">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6 flex gap-3 items-start">
                    <div className="bg-gray-200 p-1.5 rounded-full text-gray-600 mt-0.5">
                        <Info size={16} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1">Serviço fora do plano contratado</h4>
                        <p className="text-gray-600 text-sm">
                            Este serviço não está coberto pelo plano atual do pet (Plano Básico). O serviço está disponível no Plano Super.
                        </p>
                    </div>
                </div>

                <div className="mb-6 text-center">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Ofereça um Upgrade!</h4>
                    <p className="text-gray-500 text-sm">O cliente pode migrar para o Plano Super e ter acesso imediato.</p>
                </div>

                <div className="space-y-3">
                    <button onClick={onSendLink} className="w-full bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors">
                        Enviar oferta de upgrade por link
                    </button>
                    <button onClick={onClose} className="w-full text-gray-500 font-medium py-2 hover:text-gray-700">
                        Voltar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export const UpdateWeightModal: React.FC<{
    currentWeight: string;
    onClose: () => void;
    onSave: (newWeight: string) => void;
}> = ({ currentWeight, onClose, onSave }) => {
    const [weight, setWeight] = useState(currentWeight.replace('kg', '').trim());

    // Mock Data for Weight History (Last 6 months)
    const history = [
        { month: 'Jun', weight: 4.2 },
        { month: 'Jul', weight: 4.3 },
        { month: 'Ago', weight: 4.2 },
        { month: 'Set', weight: 4.4 },
        { month: 'Out', weight: 4.5 },
        { month: 'Nov', weight: 4.5 },
    ];

    // Simple SVG Chart Logic
    const maxWeight = Math.max(...history.map(h => h.weight)) + 0.5;
    const minWeight = Math.min(...history.map(h => h.weight)) - 0.5;
    const height = 150;
    const width = 300;
    const padding = 20;

    const getX = (index: number) => padding + (index * (width - 2 * padding) / (history.length - 1));
    const getY = (w: number) => height - padding - ((w - minWeight) / (maxWeight - minWeight)) * (height - 2 * padding);

    const points = history.map((h, i) => `${getX(i)},${getY(h.weight)}`).join(' ');

    return (
        <Modal isOpen={true} onClose={onClose} title="Atualizar Peso" maxWidth="max-w-md">
            <div className="p-6 pt-2">
                <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Histórico de Peso (Últimos 6 meses)</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex justify-center">
                        <svg width={width} height={height} className="overflow-visible">
                            {/* Grid Lines */}
                            {[0, 0.5, 1].map(r => (
                                <line
                                    key={r}
                                    x1={padding}
                                    y1={padding + r * (height - 2 * padding)}
                                    x2={width - padding}
                                    y2={padding + r * (height - 2 * padding)}
                                    stroke="#e5e7eb"
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* Line */}
                            <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth="2" />

                            {/* Points */}
                            {history.map((h, i) => (
                                <g key={i}>
                                    <circle cx={getX(i)} cy={getY(h.weight)} r="4" fill="#0ea5e9" stroke="white" strokeWidth="2" />
                                    <text x={getX(i)} y={height + 15} textAnchor="middle" fontSize="10" fill="#6b7280">{h.month}</text>
                                    <text x={getX(i)} y={getY(h.weight) - 10} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">{h.weight}</text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Peso Atual (kg)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-3 text-lg font-bold text-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                </div>

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={() => onSave(weight)} className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-md hover:bg-primary-700 transition-colors shadow-sm">
                        Salvar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const TutorInfoModal: React.FC<{
    tutor: Tutor;
    onClose: () => void;
}> = ({ tutor, onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Informações do Tutor" maxWidth="max-w-md">
            <div className="p-6 pt-2 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Nome Completo</h4>
                    <p className="font-bold text-gray-800 text-lg">{tutor.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">CPF</h4>
                        <p className="font-medium text-gray-800">{tutor.cpf}</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Telefone</h4>
                        <p className="font-medium text-gray-800">{tutor.phone}</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Endereço</h4>
                    <p className="font-medium text-gray-800">Av. Paulista, 1000 - Bela Vista</p>
                    <p className="text-gray-600 text-sm">São Paulo - SP, 01310-100</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Pessoas Autorizadas</h4>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-md">
                            <div className="bg-primary-100 p-1.5 rounded-full text-primary-600">
                                <Check size={14} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">Maria Almeida dos Santos</p>
                                <p className="text-xs text-gray-500">Mãe • (11) 99999-9999</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-md">
                            <div className="bg-primary-100 p-1.5 rounded-full text-primary-600">
                                <Check size={14} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">João Silva</p>
                                <p className="text-xs text-gray-500">Marido • (11) 98888-8888</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <button onClick={onClose} className="w-full bg-white border border-primary-300 text-primary-600 font-bold py-3 rounded-md hover:bg-primary-50 transition-colors mt-2">
                    Fechar
                </button>
            </div>
        </Modal>
    );
};

export const UpgradePlanModal: React.FC<{
    onClose: () => void;
}> = ({ onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Upgrade de Plano" maxWidth="max-w-4xl">
            <div className="p-6 pt-2">
                <p className="text-gray-500 mb-8 text-center">Compare os planos e ofereça a melhor opção para o tutor.</p>

                <div className="grid grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden mb-8">
                    {/* Header Row */}
                    <div className="p-4 bg-gray-50 border-b border-r border-gray-200 font-bold text-gray-600 flex items-center">Benefícios</div>
                    <div className="p-4 bg-gray-50 border-b border-r border-gray-200 text-center">
                        <div className="font-bold text-gray-600">Conforto</div>
                        <div className="text-xs text-gray-500">(Atual)</div>
                    </div>
                    <div className="p-4 bg-primary-50 border-b border-r border-primary-100 text-center relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary-500"></div>
                        <div className="font-bold text-primary-700">Super</div>
                        <div className="text-xs text-primary-600">Recomendado</div>
                    </div>
                    <div className="p-4 bg-gray-50 border-b border-gray-200 text-center">
                        <div className="font-bold text-gray-800">Ultra</div>
                    </div>

                    {/* Row 1 */}
                    <div className="p-4 border-b border-r border-gray-200 text-sm font-medium text-gray-700">Consultas</div>
                    <div className="p-4 border-b border-r border-gray-200 text-center text-sm text-gray-600">Coparticipação</div>
                    <div className="p-4 border-b border-r border-primary-100 bg-primary-50/30 text-center text-sm font-bold text-gray-800">Isento</div>
                    <div className="p-4 border-b border-gray-200 text-center text-sm font-bold text-gray-800">Isento</div>

                    {/* Row 2 */}
                    <div className="p-4 border-b border-r border-gray-200 text-sm font-medium text-gray-700">Exames Laboratoriais</div>
                    <div className="p-4 border-b border-r border-gray-200 text-center text-sm text-gray-600">Coparticipação</div>
                    <div className="p-4 border-b border-r border-primary-100 bg-primary-50/30 text-center text-sm font-bold text-gray-800">Ilimitado</div>
                    <div className="p-4 border-b border-gray-200 text-center text-sm font-bold text-gray-800">Ilimitado</div>

                    {/* Row 3 */}
                    <div className="p-4 border-b border-r border-gray-200 text-sm font-medium text-gray-700">Vacinas</div>
                    <div className="p-4 border-b border-r border-gray-200 text-center text-sm text-gray-600 text-red-500"><X size={16} className="mx-auto" /></div>
                    <div className="p-4 border-b border-r border-primary-100 bg-primary-50/30 text-center text-sm font-bold text-green-600"><Check size={16} className="mx-auto" /></div>
                    <div className="p-4 border-b border-gray-200 text-center text-sm font-bold text-green-600"><Check size={16} className="mx-auto" /></div>

                    {/* Row 4 */}
                    <div className="p-4 border-br border-r border-gray-200 text-sm font-medium text-gray-700">Internação</div>
                    <div className="p-4 border-br border-r border-gray-200 text-center text-sm text-gray-600">Coparticipação</div>
                    <div className="p-4 border-br border-r border-primary-100 bg-primary-50/30 text-center text-sm font-bold text-gray-800">10 dias/ano</div>
                    <div className="p-4 border-br border-gray-200 text-center text-sm font-bold text-gray-800">Ilimitado</div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 bg-white border border-primary-300 text-primary-600 font-bold rounded-md hover:bg-primary-50 transition-colors">
                        Cancelar
                    </button>
                    <button className="px-8 py-3 bg-primary-600 text-white font-bold rounded-md hover:bg-primary-700 transition-colors shadow-sm">
                        Selecionar Plano Super (Upgrade)
                    </button>
                </div>
            </div>
        </Modal>
    );
};
