import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Pet } from '../../../../domain/models/pet.model';

interface PetSelectionModalProps {
    pets: Pet[];
    onSelect: (pet: Pet) => void;
    onClose: () => void;
}

export const PetSelectionModal: React.FC<PetSelectionModalProps> = ({ pets, onSelect, onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Selecione o Pet" maxWidth="max-w-2xl">
            <div className="p-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {pets.map((pet) => (
                    <div
                        key={pet.id}
                        onClick={() => onSelect(pet)}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center gap-4"
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
