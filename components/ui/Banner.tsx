import React from 'react';
import { X } from 'lucide-react';

interface BannerProps {
    icon?: React.ReactNode;
    children: React.ReactNode;
    action?: React.ReactNode;
    onClose?: () => void;
    className?: string;
}

export const Banner: React.FC<BannerProps> = ({
    icon,
    children,
    action,
    onClose,
    className = ''
}) => {
    return (
        <div className={`bg-primary-100 border-b border-primary-200 ${className}`}>
            <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                    {icon && (
                        <div className="flex-shrink-0">
                            {icon}
                        </div>
                    )}
                    <div className="text-primary-700 font-medium text-sm md:text-base">
                        {children}
                    </div>
                </div>
                {(action || onClose) && (
                    <div className="flex items-center gap-3">
                        {action}
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="text-primary-400 hover:text-primary-600 p-1 transition-colors"
                                aria-label="Fechar"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
