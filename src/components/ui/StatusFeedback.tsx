import React from 'react';
import { ExclamationCircleIcon, QuestionMarkCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

type StatusType = 'error' | 'empty' | 'loading';

interface StatusFeedbackProps {
    status: StatusType;
    title?: string;
    message?: string;
    onAction?: () => void;
    actionLabel?: string;
    className?: string;
}

export const StatusFeedback: React.FC<StatusFeedbackProps> = ({
    status,
    title,
    message,
    onAction,
    actionLabel = "Tentar novamente",
    className = ""
}) => {
    const config = {
        loading: {
            icon: ArrowPathIcon,
            defaultTitle: "Carregando...",
            defaultMessage: "Por favor, aguarde.",
            colorClass: "text-indigo-500",
            bgClass: "bg-indigo-50",
            iconClass: "animate-spin"
        },
        error: {
            icon: ExclamationCircleIcon,
            defaultTitle: "Ocorreu um erro",
            defaultMessage: "Não foi possível carregar os dados. Verifique a conexão.",
            colorClass: "text-red-500",
            bgClass: "bg-red-50",
            iconClass: ""
        },
        empty: {
            icon: QuestionMarkCircleIcon,
            defaultTitle: "Nenhum resultado",
            defaultMessage: "Não encontramos nada com os filtros atuais.",
            colorClass: "text-gray-400",
            bgClass: "bg-gray-50",
            iconClass: ""
        }
    };

    const { icon: Icon, defaultTitle, defaultMessage, colorClass, bgClass, iconClass } = config[status];

    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px] animate-in fade-in zoom-in duration-300 ${className}`} role="status">
            <div className={`p-4 rounded-full mb-4 ${bgClass}`}>
                <Icon className={`h-12 w-12 ${colorClass} ${iconClass}`} />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {title || defaultTitle}
            </h3>

            <p className="text-gray-500 max-w-sm mb-6">
                {message || defaultMessage}
            </p>

            {onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
