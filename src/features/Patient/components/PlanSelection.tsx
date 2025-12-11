import React, { useState } from 'react';
import { Check, Star, ArrowLeft } from 'lucide-react';

const PLANS = [
    { name: "WeVets Conforto", price: "129,90", features: ["Consultas ilimitadas", "Vacinas anuais", "Exames laboratoriais"], baseFeatures: "Plano Intermediário", recommended: false },
    { name: "WeVets Master", price: "199,90", features: ["Tudo do Conforto", "Exames de imagem", "Cirurgias simples"], baseFeatures: "Plano Avançado", recommended: true },
    { name: "WeVets Super", price: "299,90", features: ["Tudo do Master", "Internação", "Cirurgias complexas"], baseFeatures: "Plano Premium", recommended: false },
    { name: "WeVets Flex", price: "89,90", features: ["Coparticipação em tudo", "Mensalidade reduzida", "Acesso à rede"], baseFeatures: "Plano Econômico", recommended: false }
];

interface PlanSelectionProps {
    onBack: () => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({ onBack }) => {
    const [period, setPeriod] = useState<'anual' | 'mensal'>('anual');

    return (
        <main className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100 text-sm font-bold mb-6">
                    <Star size={14} fill="currentColor" /> Sem plano ativo
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                    Escolha o plano ideal para<br />proteger este pet.
                </h1>
                <p className="text-gray-500 text-lg md:text-xl">
                    Indique a melhor opção e garanta <strong className="text-indigo-600">bônus de indicação</strong> para você.
                </p>
            </div>

            <section className="w-full max-w-[1400px]">
                {/* Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center p-1.5 bg-gray-100/80 rounded-xl border border-gray-200">
                        <button
                            onClick={() => setPeriod('anual')}
                            className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ${period === 'anual'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
                                : 'bg-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Anual (Desconto)
                        </button>
                        <button
                            onClick={() => setPeriod('mensal')}
                            className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ${period === 'mensal'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
                                : 'bg-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Mensal
                        </button>
                    </div>
                </div>

                {/* Plan Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4">
                    {PLANS.map((plan, index) => (
                        <article
                            key={index}
                            className={`
                                relative flex flex-col p-6 rounded-2xl transition-all duration-300 group
                                ${plan.recommended
                                    ? 'bg-white border-2 border-indigo-600 shadow-xl scale-105 z-10'
                                    : 'bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-lg'
                                }
                            `}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                    Recomendado
                                </div>
                            )}

                            <header className="mb-6 text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-3xl font-bold text-gray-900">R$ {plan.price}</span>
                                    <span className="text-gray-500 font-medium text-sm">/mês</span>
                                </div>
                                {period === 'anual' && (
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
                                        2 meses grátis
                                    </span>
                                )}
                            </header>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-3">
                                        <div className={`mt-0.5 p-0.5 rounded-full ${plan.recommended ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400 group-hover:text-indigo-600 transition-colors'}`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.recommended
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
                                    }`}
                            >
                                Enviar Oferta
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            <div className="mt-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                    <ArrowLeft size={16} />
                    Voltar para busca
                </button>
            </div>
        </main>
    );
};
