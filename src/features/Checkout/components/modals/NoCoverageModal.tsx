import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../../components/ui/Modal';
import { Service } from '../../../../domain/models/service.model';

interface NoCoverageModalProps {
    onClose: () => void;
    onAuthorize: () => void;
    onUpgrade: () => void;
    service: Service;
}

export const NoCoverageModal: React.FC<NoCoverageModalProps> = ({ onClose, onAuthorize, onUpgrade, service }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Serviço sem Cobertura">
            <div className="p-6 pt-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3 items-start">
                    <div className="bg-blue-100 p-1.5 rounded-full text-blue-600 mt-0.5">
                        <InformationCircleIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm mb-1">Upgrade de Plano Disponível</h4>
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
                    <button onClick={onUpgrade} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors">
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
