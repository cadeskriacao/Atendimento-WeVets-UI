import React from 'react';
import { Search, Info, Check, X, Plus } from 'lucide-react';
import { Service } from '../../../domain/models/service.model';
import { CATEGORIES } from '../../../infrastructure/api/mockData';
import { StatusFeedback } from '../../../components/ui/StatusFeedback';


interface ServiceListProps {
    services: Service[];
    loading: boolean;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onAddToCart: (service: Service) => void;
    onServiceClick: (service: Service, action: 'cart' | 'noCoverage' | 'limit' | 'grace' | 'upgrade' | 'details' | 'forward') => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
    services,
    loading,
    activeCategory,
    onCategoryChange,
    searchTerm,
    onSearchChange,
    onAddToCart,
    onServiceClick
}) => {

    const handleServiceClick = (service: Service) => {
        if (service.disabled) {
            const tags = service.tags || [];
            const hasLimitExceeded = tags.some((t: any) => t.label.toLowerCase().includes('limite') && t.type === 'error');

            if (service.actionType === 'upgrade') onServiceClick(service, 'upgrade');
            else if (service.actionType === 'forward') onServiceClick(service, 'forward');
            else if (hasLimitExceeded) onServiceClick(service, 'limit');
            return;
        }

        const tags = service.tags || [];
        const hasGracePeriod = tags.some((t: any) => t.label.toLowerCase().includes('carência') && t.type === 'error');
        const hasLimitExceeded = tags.some((t: any) => t.label.toLowerCase().includes('limite') && t.type === 'error');
        const hasNoCoverage = tags.some((t: any) => t.label.toLowerCase().includes('sem cobertura') && t.type === 'error');

        if (hasGracePeriod) onServiceClick(service, 'grace');
        else if (hasLimitExceeded) onServiceClick(service, 'limit');
        else if (hasNoCoverage) onServiceClick(service, 'noCoverage');
        else onAddToCart(service);
    };

    return (
        <section
            className="flex flex-col bg-surface-card rounded-lg shadow-sm border border-surface-border min-h-[600px] h-full"
            aria-label="Catálogo de Serviços"
        >
            {/* Header / Search */}
            <header className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10 rounded-t-lg">
                <div className="relative mb-6">
                    <label htmlFor="search-services" className="sr-only">Buscar serviços</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            id="search-services"
                            type="text"
                            placeholder="Buscar procedimentos, exames ou vacinas..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" aria-label="Filtro de categorias">
                    {CATEGORIES.map((category: any) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            aria-current={activeCategory === category.id ? 'page' : undefined}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                ${activeCategory === category.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }
                            `}
                        >
                            {category.label}
                            {category.count > 0 && (
                                <span className={`ml-2 text-xs py-0.5 px-1.5 rounded-full ${activeCategory === category.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                    {category.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </header>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {loading ? (
                    <StatusFeedback status="loading" title="Buscando serviços" message="Carregando catálogo completo..." />
                ) : services.length === 0 ? (
                    <StatusFeedback status="empty" title="Nenhum serviço encontrado" message={`Não encontramos resultados para "${searchTerm}" nesta categoria.`} />
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {services.map(service => (
                            <article
                                key={service.id}
                                onClick={() => handleServiceClick(service)}
                                className={`
                                    group relative border rounded-xl p-5 transition-all cursor-pointer bg-white
                                    ${service.disabled
                                        ? 'border-gray-100 opacity-70 hover:bg-gray-50'
                                        : 'border-gray-200 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5'
                                    }
                                `}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleServiceClick(service); }}
                                aria-disabled={service.disabled}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
                                            {service.code}
                                        </span>
                                        <h3 className={`font-bold text-lg leading-tight mb-1 ${service.disabled ? 'text-gray-500' : 'text-gray-900'}`}>
                                            {service.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">Consulta Especializada</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xl font-bold ${service.disabled ? 'text-gray-400' : 'text-indigo-600'}`}>
                                            R$ {service.copay.toFixed(2).replace('.', ',')}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">Coparticipação</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {service.tags && service.tags.map((tag: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`
                                                flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border
                                                ${tag.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    tag.type === 'warning' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                        'bg-emerald-50 text-emerald-700 border-emerald-100'}
                                            `}
                                        >
                                            {tag.icon === 'check' && <Check size={12} strokeWidth={3} />}
                                            {tag.icon === 'x' && <X size={12} strokeWidth={3} />}
                                            {tag.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Warning / Footer */}
                                <div className="mt-4">
                                    {service.warning ? (
                                        <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-50 px-3 py-2 rounded-md w-full">
                                            <Info size={14} className="flex-shrink-0 mt-0.5" />
                                            <span className="font-medium">{service.warning}</span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end">
                                            <span className="text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-full">
                                                <Plus size={14} /> Adicionar
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
