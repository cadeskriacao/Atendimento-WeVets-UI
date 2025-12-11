import React from 'react';
import { Modal } from '../../../../components/ui/Modal';


// Mock data strictly typed for this display
interface BudgetItem {
    name: string;
    price: number;
}
const MOCK_BUDGET_ITEMS: BudgetItem[] = [
    { name: "Consulta clínica geral", price: 50.00 },
    { name: "Hemograma completo", price: 50.00 },
    { name: "Vacina antirrábica", price: 50.00 }
];

interface BudgetDetailsModalProps {
    onClose: () => void;
    onSchedule: () => void;
}

export const BudgetDetailsModal: React.FC<BudgetDetailsModalProps> = ({ onClose, onSchedule }) => {
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
                    <div className="space-y-2">
                        {MOCK_BUDGET_ITEMS.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-gray-600 border-b border-gray-100 last:border-0 pb-2">
                                <span>{item.name}</span>
                                <span className="font-medium text-gray-800">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-indigo-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50 bg-transparent"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={onSchedule}
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
                    >
                        Agendar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
