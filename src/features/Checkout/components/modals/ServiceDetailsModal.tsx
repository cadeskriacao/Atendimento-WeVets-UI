import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { CartItem } from '../../../../domain/models/cart.model';

const MOCK_CONTRACTED_SERVICES = [
    { name: 'Consulta clínica geral', price: 50.00 },
    { name: 'Hemograma completo', price: 50.00 },
    { name: 'Vacina antirrábica', price: 50.00 }
];

interface ServiceDetailsModalProps {
    onClose: () => void;
    onAddService: () => void;
    onFinalize: () => void;
    cartItems: CartItem[];
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ onClose, onAddService, onFinalize, cartItems }) => {

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

                <div className="w-full border border-indigo-200 rounded-md p-3 mb-6">
                    <button className="w-full text-indigo-600 text-sm font-medium hover:underline">
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
                            <h4 className="font-bold text-indigo-700 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                Serviços adicionados agora
                            </h4>
                            <div className="space-y-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-indigo-900 font-medium">
                                            {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
                                        </span>
                                        <span className="font-bold text-indigo-700">R$ {(item.copay * item.quantity).toFixed(2).replace('.', ',')}</span>
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
                        className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                        Adicionar serviço
                    </button>
                    <button
                        onClick={onFinalize}
                        className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        Finalizar atendimento
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-white border border-indigo-300 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                        Cancelar atendimento
                    </button>
                </div>
            </div>
        </Modal>
    );
};
