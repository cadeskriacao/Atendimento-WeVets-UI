import React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
    headerAction?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    maxWidth = "max-w-lg",
    headerAction
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Content */}
            <div
                className={`
                    bg-white rounded-xl shadow-2xl w-full ${maxWidth} 
                    overflow-hidden relative z-10 flex flex-col max-h-[90vh]
                `}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
            >
                {title && (
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                        <h3 id="modal-title" className="font-bold text-lg text-gray-800">{title}</h3>
                        {headerAction && <div className="mr-8">{headerAction}</div>}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-label="Fechar modal"
                >
                    <X size={20} />
                </button>

                <div className="p-0 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div >
    );
};
