import React, { useState } from 'react';
import { Search, ShoppingCart, Check, X, AlertTriangle } from 'lucide-react';
import { Service, CartItem } from '../types';
import { SERVICES, CATEGORIES } from '../constants';
import { Button, Input } from './ui';

interface ServiceListProps {
  onAddToCart: (service: Service) => void;
  onOpenAnamnesis: () => void;
  hasAnamnesis: boolean;
  unlockedServices?: string[]; // IDs of services that had grace period paid or limit bought
  onServiceClick?: (service: Service, type: 'grace' | 'limit' | 'noCoverage') => void; // Intercept click for special logic
  onServiceForward?: (service: Service) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  onAddToCart,
  onOpenAnamnesis,
  hasAnamnesis,
  unlockedServices = [],
  onServiceClick,
  onServiceForward
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = SERVICES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' ||
      (activeCategory === 'consultas' && s.category === 'Consulta') ||
      (activeCategory === 'vacinas' && s.category === 'Vacina') ||
      (activeCategory === 'exames' && s.category === 'Exame') ||
      (activeCategory === 'cirurgias' && s.category === 'Cirurgia') ||
      (activeCategory === 'internacao' && s.category === 'Internação');
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (service: Service) => {
    const isUnlocked = unlockedServices.includes(service.id);

    // Check for Grace Period (Carência) - Error Type
    const hasGracePeriod = service.tags.some(t => t.label.toLowerCase().includes('carência') && t.type === 'error');

    // Check for Limit Reached (Limite atingido) - Error Type
    const hasLimitReached = service.tags.some(t => t.label.toLowerCase().includes('limite') && t.type === 'error');

    // Check for No Coverage (Sem cobertura) - Error Type
    const hasNoCoverage = service.tags.some(t => t.label.toLowerCase().includes('sem cobertura') && t.type === 'error');

    if (!isUnlocked && onServiceClick) {
      if (hasNoCoverage) {
        onServiceClick(service, 'noCoverage');
        return;
      }
      if (hasLimitReached) {
        onServiceClick(service, 'limit');
        return;
      }
      if (hasGracePeriod) {
        onServiceClick(service, 'grace');
        return;
      }
    }

    if (!service.disabled && service.actionType === 'cart') {
      onAddToCart(service);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Selecione o serviço</h3>

      {/* Search and Anamnesis */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            leftIcon={<Search className="text-gray-400" size={20} />}
            type="text"
            placeholder="Pesquise por procedimento ou código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Anamnesis Button Toggle */}
        {!hasAnamnesis ? (
          <Button
            onClick={onOpenAnamnesis}
            variant="outline"
            className="w-full md:w-auto border-primary-300 text-primary-600 whitespace-nowrap"
          >
            Preencher anamnese
          </Button>
        ) : (
          <Button
            onClick={onOpenAnamnesis}
            variant="outline"
            className="w-full md:w-auto border-primary-500 text-primary-600 whitespace-nowrap"
          >
            Anamnese (1)
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="flex gap-8 border-b border-gray-200 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`pb-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors relative
              ${activeCategory === cat.id ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            {cat.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-primary-100' : 'bg-gray-100'}`}>
              {cat.count}
            </span>
            {activeCategory === cat.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Header Info */}
      <div className="bg-gray-100 p-3 rounded-t-md flex justify-between items-center text-xs font-bold text-gray-700 border-b border-gray-200">
        <span>
          {activeCategory === 'all' ? 'Todos os Serviços' : CATEGORIES.find(c => c.id === activeCategory)?.label || 'Serviços'}
        </span>
        <span>Limite para contratação: 05 de 05</span>
      </div>

      {/* Services Grid */}
      <div className="border-l border-r border-b border-gray-200 rounded-b-md divide-y divide-gray-200">
        {filteredServices.map((service) => {
          const isUnlocked = unlockedServices.includes(service.id);

          return (
            <div key={service.id} className="p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {service.name.replace(service.category, '').trim() || service.name}
                    {service.name.startsWith(service.category) && <span className="font-normal text-gray-500 ml-1">({service.category})</span>}
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">{service.code}</div>
                </div>

                {/* Action Buttons Logic */}
                {service.actionType === 'forward' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onServiceForward && onServiceForward(service)}
                    className="border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Encaminhar
                  </Button>
                ) : service.actionType === 'upgrade' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleServiceClick(service)}
                    className="border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Ofertar troca de plano
                  </Button>
                ) : service.actionType === 'none' ? (
                  <Button
                    disabled
                    size="icon"
                    className="bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed h-9 w-9 p-0"
                  >
                    <ShoppingCart size={20} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleServiceClick(service)}
                    // Only disable if it's strictly disabled and NOT a special tag case (error tag like limit/grace/noCoverage)
                    // Error tags need to be clickable to show the modal
                    disabled={service.disabled && !service.tags.some(t => t.type === 'error')}
                    size="icon"
                    className={`h-9 w-9 p-0 transition-colors border
                          ${service.disabled && !service.tags.some(t => t.type === 'error')
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-primary-600 border-primary-200 hover:bg-primary-600 hover:text-white hover:border-primary-600'}
                        `}
                  >
                    <ShoppingCart size={20} />
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {service.tags.map((tag, idx) => {
                  const isErrorTag = tag.type === 'error';
                  // Logic to render the tag differently if unlocked
                  if (isUnlocked && isErrorTag) {
                    // If unlocked, change error tags to success style
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border font-medium border-teal-200 text-teal-700 bg-teal-50"
                      >
                        <Check size={12} />
                        {tag.label.replace('atingido', 'liberado').replace('de 60 dias', 'liberada').replace('Serviço indisponível', 'Disponível').replace('Sem cobertura', 'Cobertura')}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border font-medium
                            ${tag.type === 'success' ? 'border-teal-200 text-teal-700 bg-teal-50' : ''}
                            ${tag.type === 'error' ? 'border-red-200 text-red-700 bg-red-50' : ''}
                          `}
                    >
                      {tag.icon === 'check' && <Check size={12} />}
                      {tag.icon === 'x' && <X size={12} />}
                      {tag.label}
                    </div>
                  )
                })}
              </div>

              {service.warning && (
                <div className="mt-3 text-orange-600 text-xs font-medium flex items-center gap-1.5">
                  {/* <AlertTriangle size={12} /> */}
                  {service.warning}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
