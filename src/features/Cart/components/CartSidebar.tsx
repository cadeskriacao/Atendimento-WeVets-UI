import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart, AlertCircle, Calendar, CreditCard } from 'lucide-react';
import { CartItem } from '../../../domain/models/cart.model';

interface CartSidebarProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onAction: (action: 'schedule' | 'quote' | 'finalize' | 'cancel') => void;
    isAttendanceMode?: boolean;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ items, onUpdateQuantity, onRemove, onAction, isAttendanceMode = false }) => {
    const totalCopay = items.reduce((acc, item) => acc + (item.copay * item.quantity), 0);
    const totalAnticipation = items.reduce((acc, item) => acc + (item.anticipationFee || 0), 0);
    const totalLimitFee = items.reduce((acc, item) => acc + (item.limitFee || 0), 0);
    const grandTotal = totalCopay + totalAnticipation + totalLimitFee;
    const hasPendingFees = totalAnticipation > 0 || totalLimitFee > 0;

    return (
        <aside
            className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 h-full max-h-[calc(100vh-120px)] sticky top-24"
            aria-label="Carrinho de Serviços"
        >
            <header className="p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
                <div className="flex items-center gap-3 text-indigo-900 mb-1">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <ShoppingCart size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Resumo</h2>
                        <p className="text-xs text-gray-500 font-medium">Itens selecionados</p>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" role="list">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-60">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <ShoppingCart size={24} />
                        </div>
                        <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
                        <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Adicione serviços do catálogo para prosseguir.</p>
                    </div>
                ) : (
                    items.map(item => (
                        <article
                            key={item.id}
                            className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:border-indigo-100 hover:shadow-sm transition-all"
                            role="listitem"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-sm text-gray-800 pr-6 leading-snug">{item.name}</h3>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="text-gray-300 hover:text-red-500 transition-colors p-1 -mr-2 -mt-2 rounded-full hover:bg-red-50"
                                    aria-label={`Remover ${item.name}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Fee Indicators with Semantic Colors */}
                            {(item.anticipationFee || 0) > 0 && (
                                <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-50 px-2 py-1.5 rounded mb-3 border border-orange-100">
                                    <AlertCircle size={12} className="flex-shrink-0" />
                                    <span className="font-semibold">Antecipação: R$ {item.anticipationFee?.toFixed(2)}</span>
                                </div>
                            )}

                            {(item.limitFee || 0) > 0 && (
                                <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 px-2 py-1.5 rounded mb-3 border border-red-100">
                                    <AlertCircle size={12} className="flex-shrink-0" />
                                    <span className="font-semibold">Taxa Limite: R$ {item.limitFee?.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-white rounded shadow-sm transition-all focus:ring-2 focus:ring-indigo-200"
                                        aria-label="Diminuir quantidade"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-xs font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-white rounded shadow-sm transition-all focus:ring-2 focus:ring-indigo-200"
                                        aria-label="Aumentar quantidade"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <div className="text-indigo-600 font-bold text-sm">
                                        R$ {(item.copay * item.quantity).toFixed(2).replace('.', ',')}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>

            <footer className="p-6 border-t border-gray-100 bg-gray-50/80 mt-auto rounded-b-lg space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal Coparticipação</span>
                        <span>R$ {totalCopay.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {hasPendingFees && (
                        <div className="flex justify-between text-sm text-orange-600 font-medium bg-orange-50 p-2 rounded border border-orange-100">
                            <span>Taxas Extras</span>
                            <span>R$ {(totalAnticipation + totalLimitFee).toFixed(2).replace('.', ',')}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                        <span>Total Geral</span>
                        <span>R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={() => onAction('finalize')}
                        disabled={items.length === 0}
                        className="col-span-2 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CreditCard size={18} />
                        {isAttendanceMode ? 'Finalizar Atendimento' : 'Ir para Pagamento'}
                    </button>

                    <button
                        onClick={() => onAction('quote')}
                        disabled={items.length === 0}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        Orçamento
                    </button>

                    <button
                        onClick={() => onAction('schedule')}
                        disabled={items.length === 0}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        <Calendar size={14} />
                        Agendar
                    </button>
                </div>

                <button
                    onClick={() => onAction('cancel')}
                    className="w-full py-2 text-red-500 font-medium text-xs hover:text-red-700 transition-colors hover:underline"
                >
                    Cancelar e limpar tudo
                </button>
            </footer>
        </aside>
    );
};
