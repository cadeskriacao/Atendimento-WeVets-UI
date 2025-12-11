import React from 'react';
import { Info } from 'lucide-react';
import { Modal } from '../../../../components/ui/Modal';
import { Service } from '../../../../domain/models/service.model';

interface NoCoverageModalProps {
    service: Service | null;
    onClose: () => void;
    onSendLink: () => void;
}

export const NoCoverageModal: React.FC<NoCoverageModalProps> = ({ service, onClose, onSendLink }) => {
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
                    <button onClick={onSendLink} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors">
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
