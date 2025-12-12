import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './ui';

interface CartSidebarProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onAction: (action: 'schedule' | 'quote' | 'finalize' | 'cancel') => void;
    isAttendanceMode?: boolean; // Novo prop para indicar modo de atendimento
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ items, onUpdateQuantity, onRemove, onAction, isAttendanceMode = false }) => {
    const totalCopay = items.reduce((sum, item) => sum + (item.copay * item.quantity), 0);
    const totalAnticipation = items.reduce((sum, item) => sum + ((item.anticipationFee || 0) * item.quantity), 0);
    const totalLimitFee = items.reduce((sum, item) => sum + ((item.limitFee || 0) * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const grandTotal = totalCopay + totalAnticipation + totalLimitFee;
    const hasPendingFees = totalAnticipation > 0 || totalLimitFee > 0;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-fit flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">Carrinho</h3>
                    {items.length > 0 && <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>}
                </div>
                <a href="#" className="text-primary-600 text-xs hover:underline">Infos. importantes</a>
            </div>

            <div className="p-4 flex-grow min-h-[300px]">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                        <ShoppingCart size={48} className="mb-3 opacity-20" />
                        <p className="font-medium text-lg">Carrinho Vazio</p>
                        <p className="text-sm">Adicione serviços ao lado</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="bg-gray-50 rounded p-3 border border-gray-100">
                                <div className="flex items-start gap-3 mb-2">
                                    <input type="checkbox" checked className="mt-1 accent-primary-600" readOnly />
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-0.5">{item.code}</div>
                                        <div className="font-medium text-gray-800 text-sm leading-tight mb-2">{item.name}</div>

                                        {/* Exibir antecipação no item se houver */}
                                        {item.anticipationFee && item.anticipationFee > 0 && (
                                            <div className="text-xs text-gray-500 mb-1 flex justify-between">
                                                <span>Antecipação:</span>
                                                <span>R$ {(item.anticipationFee * item.quantity).toFixed(2).replace('.', ',')}</span>
                                            </div>
                                        )}
                                        {/* Exibir compra de limite no item se houver */}
                                        {item.limitFee && item.limitFee > 0 && (
                                            <div className="text-xs text-gray-500 mb-1 flex justify-between">
                                                <span>Compra de limite:</span>
                                                <span>R$ {(item.limitFee * item.quantity).toFixed(2).replace('.', ',')}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center border border-primary-200 rounded bg-white">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                            className="p-1 text-primary-600 hover:bg-primary-50"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-xs font-medium w-6 text-center">{item.quantity.toString().padStart(2, '0')}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                            className="p-1 text-primary-600 hover:bg-primary-50"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button onClick={() => onRemove(item.id)} className="text-primary-400 hover:text-red-500 p-1 border border-primary-200 rounded bg-white">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    Coparticipação: R$ {(item.copay * item.quantity).toFixed(2).replace('.', ',')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white rounded-b-lg">
                {hasPendingFees && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-start gap-2 text-orange-500">
                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0 fill-orange-100" />
                            <p className="text-xs font-bold leading-tight">
                                Aviso: tutor só pode realizar agendamento após pagar pendências em aberto
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {totalAnticipation > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 font-medium">Antecipação</span>
                                <span className="text-[10px] font-bold text-red-500 border border-red-200 bg-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                                    Pendências
                                </span>
                            </div>
                            <span className="font-medium text-gray-800">R$ {totalAnticipation.toFixed(2).replace('.', ',')}</span>
                        </div>
                    )}

                    {totalLimitFee > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 font-medium">Compra de limite</span>
                                <span className="text-[10px] font-bold text-red-500 border border-red-200 bg-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                                    Pendências
                                </span>
                            </div>
                            <span className="font-medium text-gray-800">R$ {totalLimitFee.toFixed(2).replace('.', ',')}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 font-medium">Coparticipação</span>
                        <span className="font-medium text-gray-800">R$ {totalCopay.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <div className="flex justify-between items-end pt-2 mt-2">
                        <span className="text-gray-800 font-bold text-lg">Total</span>
                        <span className="text-gray-900 font-bold text-xl">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                {isAttendanceMode ? (
                    <div className="mt-6">
                        <Button
                            onClick={() => onAction('finalize')}
                            disabled={items.length === 0 || hasPendingFees}
                            className="w-full text-base py-6 disabled:opacity-50"
                            isLoading={false}
                        >
                            Finalizar atendimento
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <Button
                            onClick={() => onAction('schedule')}
                            disabled={items.length === 0 || hasPendingFees}
                            className="col-span-1 disabled:opacity-50"
                        >
                            Agendar
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onAction('quote')}
                            className="col-span-1 border-primary-300 text-primary-600"
                        >
                            Orçamento
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onAction('finalize')}
                            disabled={items.length === 0 || hasPendingFees}
                            className="col-span-1 border-primary-300 text-primary-600 disabled:opacity-50"
                        >
                            Finalizar
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => onAction('cancel')}
                            className="col-span-1 text-primary-600 hover:bg-primary-50"
                        >
                            Cancelar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
