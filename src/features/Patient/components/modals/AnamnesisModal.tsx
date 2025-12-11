import React from 'react';
import { Modal } from '../../../../components/ui/Modal';

interface AnamnesisModalProps {
    onClose: () => void;
    onSave: () => void;
}

export const AnamnesisModal: React.FC<AnamnesisModalProps> = ({ onClose, onSave }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Anamnese" maxWidth="max-w-3xl">
            <div className="p-6 pt-2">
                <p className="text-gray-500 mb-6">Preencha os dados da anamnese abaixo.</p>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Queixa principal</label>
                        <textarea className="w-full border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Descreva o motivo da consulta..."></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Histórico</label>
                        <textarea className="w-full border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Histórico médico relevante..."></textarea>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-50 rounded-md">Cancelar</button>
                    <button onClick={onSave} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700">Salvar Anamnese</button>
                </div>
            </div>
        </Modal>
    );
};
