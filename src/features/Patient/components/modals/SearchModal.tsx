import React from 'react';
import { Modal } from '../../../../components/ui/Modal';

interface SearchModalProps {
    onClose: () => void;
    onSearch: () => void;
    inputValue?: string;
    onInputChange?: (value: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSearch, inputValue, onInputChange }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/95 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="max-w-xl w-full text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Novo Atendimento</h2>
                <p className="text-gray-500 mb-8 text-base">Localize o pet por meio do CPF do tutor</p>

                <div className="text-left mb-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Digite o CPF do tutor</label>
                </div>
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="000.000.000-00"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        value={inputValue}
                        onChange={(e) => onInputChange?.(e.target.value)}
                    />
                    <button
                        onClick={onSearch}
                        className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-base"
                    >
                        <span>→</span> Pesquisar
                    </button>
                </div>

                <div className="mt-6 text-left text-sm text-gray-500 border-t border-gray-100 pt-6">
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
