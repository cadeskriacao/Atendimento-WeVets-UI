import React, { useState } from 'react';
import { AlertTriangle, Info, Calendar, X, CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { PetHeader } from './components/PetHeader';
import { ServiceList } from './components/ServiceList';
import { CartSidebar } from './components/CartSidebar';
import { Button } from './components/ui';
import { MobileCartBar } from './components/MobileCartBar';
import { PlanSelection } from './components/PlanSelection';
import { FinalizeModal, ScheduleModal, SearchModal, PetSelectionModal, BudgetDetailsModal, AnamnesisModal, GracePeriodModal, ConfirmBudgetModal, LimitExceededModal, NoCoverageModal, ServiceDetailsModal, CancelAttendanceModal, UpdateWeightModal, TutorInfoModal, UpgradePlanModal, AttendanceHistoryModal } from './components/Modals';
import { PaymentLinkSentToast, PlanActiveToast, GracePeriodSuccessToast, LimitPurchasedToast, ForwardSuccessToast, UpgradeSuccessToast, FinalizeFeesPaidToast, AttendanceCancelledToast } from './components/Notifications';
import { CartItem, ModalType, Service, Pet } from './types';
import {
    MOCK_PET,
    MOCK_PETS_LIST,
    MOCK_TUTOR,
    CPF_NORMAL,
    CPF_MULTI_PET,
    CPF_NO_PLAN,
    CPF_DELINQUENT,
    CPF_SAVED_BUDGET,
    CPF_ATTENDANCE
} from './constants';

const App: React.FC = () => {
    const [view, setView] = useState<'search' | 'dashboard' | 'planSelection'>('search');
    const [activePet, setActivePet] = useState<Pet | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [activeModal, setActiveModal] = useState<ModalType>('none');
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
    const [searchCpf, setSearchCpf] = useState('');

    // Estados de Inadimplência
    const [isDelinquent, setIsDelinquent] = useState(false);
    const [showLinkSentToast, setShowLinkSentToast] = useState(false);
    const [showPlanActiveToast, setShowPlanActiveToast] = useState(false);
    const [isPlanReactivated, setIsPlanReactivated] = useState(false);

    // Estados de Orçamento Salvo
    const [hasSavedBudget, setHasSavedBudget] = useState(false);
    const [isBudgetScheduled, setIsBudgetScheduled] = useState(false);

    // Estado de Atendimento Médico Ativo (Novo cenário)
    const [isAttendanceActive, setIsAttendanceActive] = useState(false);

    // Estado da Anamnese
    const [hasAnamnesis, setHasAnamnesis] = useState(false);

    // Estados de Carência, Limite, Encaminhamento e Upgrade
    const [selectedServiceForCheck, setSelectedServiceForCheck] = useState<Service | null>(null);
    const [unlockedServices, setUnlockedServices] = useState<string[]>([]);
    const [showGracePaidToast, setShowGracePaidToast] = useState(false);
    const [showLimitPaidToast, setShowLimitPaidToast] = useState(false);
    const [showForwardToast, setShowForwardToast] = useState(false);
    const [showUpgradeToast, setShowUpgradeToast] = useState(false);

    // Estado para pagamento de taxas na finalização
    const [isFinalizeFeesPaid, setIsFinalizeFeesPaid] = useState(false);
    const [showFinalizePaidToast, setShowFinalizePaidToast] = useState(false);

    // Estado para cancelamento de atendimento
    const [showAttendanceCancelledToast, setShowAttendanceCancelledToast] = useState(false);

    const addToCart = (service: Service, anticipationFee?: number, limitFee?: number) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === service.id);
            if (existing) {
                return prev.map(item =>
                    item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...service, quantity: 1, anticipationFee, limitFee }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleCartAction = (action: 'schedule' | 'quote' | 'finalize' | 'cancel') => {
        if (action === 'finalize') {
            setActiveModal('finalize');
        } else if (action === 'schedule') {
            setActiveModal('schedule');
        } else if (action === 'quote') {
            setActiveModal('confirmBudget');
        } else if (action === 'cancel') {
            setCartItems([]);
            setActivePet(null);
            setView('search');
            resetState();
        }
    };

    const resetState = () => {
        // Delinquency
        setIsDelinquent(false);
        setShowLinkSentToast(false);
        setShowPlanActiveToast(false);
        setIsPlanReactivated(false);

        // Budget
        setHasSavedBudget(false);
        setIsBudgetScheduled(false);

        // Attendance
        setIsAttendanceActive(false);

        // Anamnesis
        setHasAnamnesis(false);

        // Grace Period & Limit & Forward & Upgrade
        setUnlockedServices([]);
        setShowGracePaidToast(false);
        setShowLimitPaidToast(false);
        setShowForwardToast(false);
        setShowUpgradeToast(false);
        setSelectedServiceForCheck(null);

        // Finalize Fees
        setIsFinalizeFeesPaid(false);
        setShowFinalizePaidToast(false);

        // Cancelled Attendance
        setShowAttendanceCancelledToast(false);
    };

    const handleSearch = (cpf: string) => {
        resetState();

        switch (cpf) {
            case CPF_NO_PLAN:
                setView('planSelection');
                break;
            case CPF_MULTI_PET:
                setActiveModal('petSelection');
                break;
            case CPF_DELINQUENT:
                setIsDelinquent(true);
                setActivePet(MOCK_PET);
                setView('dashboard');
                break;
            case CPF_SAVED_BUDGET:
                setHasSavedBudget(true);
                setActivePet(MOCK_PET);
                setView('dashboard');
                break;
            case CPF_ATTENDANCE:
                setIsAttendanceActive(true);
                setActivePet(MOCK_PET);
                setView('dashboard');
                break;
            case CPF_NORMAL:
            default:
                setActivePet(MOCK_PET);
                setView('dashboard');
                break;
        }
    };

    const handlePetSelect = (pet: Pet) => {
        setActivePet(pet);
        setActiveModal('none');
        setView('dashboard');
    };

    const handleSendPaymentLink = () => {
        setShowLinkSentToast(true);
    };

    const handleSimulatePayment = () => {
        setShowLinkSentToast(false);
        setIsPlanReactivated(true);
        setShowPlanActiveToast(true);
    };

    // Budget Workflow Handlers
    const handleOpenBudgetDetails = () => {
        setActiveModal('budgetDetails');
    };

    const handleScheduleFromBudget = () => {
        // Close budget modal and open schedule modal
        setActiveModal('schedule');
    };

    const handleConfirmBudgetSchedule = () => {
        setActiveModal('none');
        setHasSavedBudget(false);
        setIsBudgetScheduled(true);
    };

    const handleSaveAnamnesis = () => {
        setHasAnamnesis(true);
        setActiveModal('none');
    };

    // Service Click Logic (Grace Period, Limit & No Coverage)
    const handleServiceClick = (service: Service, type: 'grace' | 'limit' | 'noCoverage') => {
        setSelectedServiceForCheck(service);
        if (type === 'grace') {
            setActiveModal('gracePeriod');
        } else if (type === 'limit') {
            setActiveModal('limitExceeded');
        } else if (type === 'noCoverage') {
            setActiveModal('noCoverage');
        }
    };

    // --- Forwarding Handler ---
    const handleServiceForward = (service: Service) => {
        setShowForwardToast(true);
    };

    // --- Grace Period Handlers ---
    const handleGracePeriodSendLink = () => {
        setShowLinkSentToast(true);
    };

    const handleSimulateGracePayment = () => {
        setShowLinkSentToast(false);
        if (selectedServiceForCheck) {
            setUnlockedServices(prev => [...prev, selectedServiceForCheck.id]);
            setShowGracePaidToast(true);
            setActiveModal('none');
        }
    };

    const handleGracePeriodAddToBudget = (anticipationFee: number) => {
        if (selectedServiceForCheck) {
            addToCart(selectedServiceForCheck, anticipationFee, undefined);
            setActiveModal('none');
            setSelectedServiceForCheck(null);
        }
    };

    // --- Limit Exceeded Handlers ---
    const handleLimitExceededSendLink = () => {
        setShowLinkSentToast(true);
    };

    const handleSimulateLimitPayment = () => {
        setShowLinkSentToast(false);
        if (selectedServiceForCheck) {
            setUnlockedServices(prev => [...prev, selectedServiceForCheck.id]);
            setShowLimitPaidToast(true);
            setActiveModal('none');
        }
    };

    const handleLimitExceededAddToBudget = (limitFee: number) => {
        if (selectedServiceForCheck) {
            addToCart(selectedServiceForCheck, undefined, limitFee);
            setActiveModal('none');
            setSelectedServiceForCheck(null);
        }
    };

    // --- No Coverage / Upgrade Handlers ---
    const handleUpgradeSendLink = () => {
        setShowUpgradeToast(true);
        setActiveModal('none');
        if (selectedServiceForCheck) {
            setUnlockedServices(prev => [...prev, selectedServiceForCheck.id]);
        }
    }

    // --- Finalize Fees Handlers ---
    const handleFinalizePaymentLink = () => {
        setShowLinkSentToast(true);
    }

    const handleSimulateFinalizeFeesPayment = () => {
        setShowLinkSentToast(false);
        setIsFinalizeFeesPaid(true);
        setShowFinalizePaidToast(true);
    }

    // --- Attendance Handlers ---
    const handleOpenServiceDetails = () => {
        setActiveModal('serviceDetails');
    };

    const handleAddServiceFromDetails = () => {
        // Closes the modal to allow user to add services via the list
        setActiveModal('none');
    };

    const handleConfirmBudget = () => {
        setActiveModal('none');
    };

    const handleSendLinkFromBudget = () => {
        setShowLinkSentToast(true);
    };

    // --- Cancel Attendance Handlers ---
    const handleCancelAttendance = () => {
        setActiveModal('cancelAttendance');
    };

    const handleUpdateWeight = () => setActiveModal('updateWeight');
    const handleOpenTutorInfo = () => setActiveModal('tutorInfo');
    const handleOpenUpgradePlan = () => setActiveModal('upgradePlan');
    const handleOpenHistory = () => setActiveModal('attendanceHistory');

    const handleConfirmCancellation = () => {
        setActiveModal('none');
        setCartItems([]);
        setActivePet(null);
        setView('search');
        resetState();
        // Need to set toast true after resetState since resetState clears all toasts
        setTimeout(() => setShowAttendanceCancelledToast(true), 100);
    };

    // Determinar ação do toast baseado no contexto (for generic payment toast)
    const getToastAction = () => {
        if (activeModal === 'finalize') return handleSimulateFinalizeFeesPayment;
        if (activeModal === 'gracePeriod') return handleSimulateGracePayment;
        if (activeModal === 'limitExceeded') return handleSimulateLimitPayment;
        return handleSimulatePayment;
    }

    if (view === 'search') {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <Header />
                <SearchModal
                    onClose={() => { }}
                    onSearch={() => handleSearch(searchCpf)}
                    inputValue={searchCpf}
                    onInputChange={setSearchCpf}
                />

                {showAttendanceCancelledToast && (
                    <AttendanceCancelledToast onClose={() => setShowAttendanceCancelledToast(false)} />
                )}

                {activeModal === 'petSelection' && (
                    <PetSelectionModal
                        pets={MOCK_PETS_LIST}
                        onSelect={handlePetSelect}
                        onClose={() => setActiveModal('none')}
                    />
                )}
            </div>
        );
    }

    if (view === 'planSelection') {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <Header />
                <PlanSelection onBack={() => setView('search')} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800 pb-20 flex flex-col">
            <Header />

            {/* Container de Banners */}
            <div className="w-full">
                {/* Banner de Inadimplência */}
                {isDelinquent && !isPlanReactivated && (
                    <div className="bg-primary-100 border-b border-primary-200">
                        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <div className="bg-primary-500 rounded-full p-1 text-white flex-shrink-0">
                                    <AlertTriangle size={18} fill="white" />
                                </div>
                                <p className="text-primary-700 font-medium text-sm md:text-base">
                                    Atenção! Esse plano possui pendências financeiras e está temporariamente inativo.
                                    <Info size={16} className="inline ml-2 text-primary-400 cursor-pointer hover:text-primary-600" />
                                </p>
                            </div>
                            <button
                                onClick={handleSendPaymentLink}
                                className="bg-white border border-primary-300 text-primary-700 font-medium px-6 py-2 rounded hover:bg-primary-50 transition-colors text-sm whitespace-nowrap shadow-sm"
                            >
                                Enviar link de acerto
                            </button>
                        </div>
                    </div>
                )}

                {/* Banner de Orçamento Salvo */}
                {hasSavedBudget && !isBudgetScheduled && (
                    <div className="bg-primary-100 border-b border-primary-200">
                        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <Calendar className="text-primary-600 flex-shrink-0" size={24} />
                                <p className="text-primary-700 font-medium">
                                    Atenção! Existe um orçamento salvo para esse pet. Clique ao lado para acessar.
                                </p>
                            </div>
                            <Button
                                onClick={handleOpenBudgetDetails}
                                variant="outline"
                                className="border-primary-300 text-primary-600 hover:bg-primary-50 px-6 shadow-sm"
                            >
                                Detalhes
                            </Button>
                        </div>
                    </div>
                )}

                {/* Banner de Atendimento Agendado - Desativado se estivermos em atendimento médico ativo para não poluir */}
                {isBudgetScheduled && !isAttendanceActive && (
                    <div className="bg-primary-100 border-b border-primary-200 animate-in fade-in slide-in-from-top duration-500">
                        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <Calendar className="text-primary-600 flex-shrink-0" size={24} />
                                <p className="text-primary-700 font-medium">
                                    Pet com atendimento agendado para dia 20/01/2026 às 14:30
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="border-primary-300 text-primary-600 hover:bg-primary-50 px-6 h-9 text-sm shadow-sm"
                                >
                                    Detalhes
                                </Button>
                                <button onClick={() => setIsBudgetScheduled(false)} className="text-primary-400 hover:text-primary-600 p-1">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Toasts */}
            {showLinkSentToast && (
                <PaymentLinkSentToast
                    onClose={() => setShowLinkSentToast(false)}
                    onAction={getToastAction()}
                />
            )}
            {showPlanActiveToast && (
                <PlanActiveToast onClose={() => setShowPlanActiveToast(false)} />
            )}
            {showGracePaidToast && (
                <GracePeriodSuccessToast onClose={() => setShowGracePaidToast(false)} />
            )}
            {showLimitPaidToast && (
                <LimitPurchasedToast onClose={() => setShowLimitPaidToast(false)} />
            )}
            {showForwardToast && (
                <ForwardSuccessToast onClose={() => setShowForwardToast(false)} />
            )}
            {showUpgradeToast && (
                <UpgradeSuccessToast onClose={() => setShowUpgradeToast(false)} />
            )}
            {showFinalizePaidToast && (
                <FinalizeFeesPaidToast onClose={() => setShowFinalizePaidToast(false)} />
            )}

            {/* Pet Header Full Width Area */}
            {activePet && (
                <PetHeader
                    pet={activePet}
                    tutor={MOCK_TUTOR}
                    isAttendanceActive={isAttendanceActive}
                    onDetailsClick={handleOpenServiceDetails}
                    onUpdateWeightClick={handleUpdateWeight}
                    onTutorInfoClick={handleOpenTutorInfo}
                    onUpgradePlanClick={handleOpenUpgradePlan}
                    onHistoryClick={handleOpenHistory}
                />
            )}

            <main className="max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-8 flex-grow relative">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">

                    {/* Overlay de Bloqueio para Inadimplentes */}
                    {isDelinquent && !isPlanReactivated && (
                        <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] flex flex-col items-center pt-32 text-center rounded-lg border border-gray-100">
                            <p className="text-gray-500 font-medium max-w-sm px-4">
                                Tutor precisa resolver pendências antes de continuar
                            </p>
                        </div>
                    )}

                    <div className="lg:col-span-8 xl:col-span-9">
                        <ServiceList
                            onAddToCart={(s) => addToCart(s)}
                            onOpenAnamnesis={() => setActiveModal('anamnesis')}
                            hasAnamnesis={hasAnamnesis}
                            unlockedServices={unlockedServices}
                            onServiceClick={handleServiceClick}
                            onServiceForward={handleServiceForward}
                        />

                        <div className="mt-12 text-center text-xs text-gray-500">
                            Faça a busca. Seus serviços aparecerão por aqui
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
                        <CartSidebar
                            items={cartItems}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                            onAction={handleCartAction}
                            isAttendanceMode={isAttendanceActive}
                        />
                    </div>
                </div>
            </main>

            {/* Modals */}
            <MobileCartBar items={cartItems} onOpenCart={() => setIsMobileCartOpen(true)} />

            {isMobileCartOpen && (
                <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-200 lg:hidden">
                    <div className="bg-white w-full max-w-lg rounded-t-xl sm:rounded-xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl z-10">
                            <h3 className="font-bold text-lg text-gray-800">Seu Carrinho</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileCartOpen(false)}
                                className="text-gray-600 hover:bg-gray-200 rounded-full h-10 w-10"
                            >
                                <X size={20} />
                            </Button>
                        </div>
                        <div className="overflow-y-auto p-4 custom-scrollbar">
                            <CartSidebar
                                items={cartItems}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                                onAction={(action) => {
                                    handleCartAction(action);
                                    if (action !== 'cancel') setIsMobileCartOpen(false);
                                }}
                                isAttendanceMode={isAttendanceActive}
                            />
                        </div>
                    </div>
                </div>
            )}
            {activeModal === 'finalize' && (
                <FinalizeModal
                    items={cartItems}
                    onClose={() => setActiveModal('none')}
                    isAttendanceMode={isAttendanceActive}
                    onSendPaymentLink={handleFinalizePaymentLink}
                    isFeesPaid={isFinalizeFeesPaid}
                    onCancelProcess={handleCancelAttendance}
                />
            )}

            {activeModal === 'cancelAttendance' && (
                <CancelAttendanceModal
                    onClose={() => setActiveModal('finalize')}
                    onConfirm={handleConfirmCancellation}
                />
            )}

            {activeModal === 'schedule' && (
                <ScheduleModal
                    onClose={() => setActiveModal('none')}
                    onConfirm={hasSavedBudget ? handleConfirmBudgetSchedule : undefined}
                />
            )}

            {activeModal === 'budgetDetails' && (
                <BudgetDetailsModal
                    onClose={() => setActiveModal('none')}
                    onSchedule={handleScheduleFromBudget}
                />
            )}

            {activeModal === 'confirmBudget' && (
                <ConfirmBudgetModal
                    items={cartItems}
                    onClose={() => setActiveModal('none')}
                    onConfirm={handleConfirmBudget}
                    onSendLink={handleSendLinkFromBudget}
                />
            )}

            {activeModal === 'anamnesis' && (
                <AnamnesisModal
                    onClose={() => setActiveModal('none')}
                    onSave={handleSaveAnamnesis}
                />
            )}

            {activeModal === 'gracePeriod' && (
                <GracePeriodModal
                    service={selectedServiceForCheck}
                    onClose={() => setActiveModal('none')}
                    onSendLink={handleGracePeriodSendLink}
                    onAddToBudget={handleGracePeriodAddToBudget}
                />
            )}

            {activeModal === 'limitExceeded' && (
                <LimitExceededModal
                    service={selectedServiceForCheck}
                    onClose={() => setActiveModal('none')}
                    onSendLink={handleLimitExceededSendLink}
                    onAddToBudget={handleLimitExceededAddToBudget}
                />
            )}

            {activeModal === 'noCoverage' && (
                <NoCoverageModal
                    service={selectedServiceForCheck}
                    onClose={() => setActiveModal('none')}
                    onSendLink={handleUpgradeSendLink}
                />
            )}

            {activeModal === 'serviceDetails' && (
                <ServiceDetailsModal
                    onClose={() => setActiveModal('none')}
                    onAddService={handleAddServiceFromDetails}
                    onFinalize={() => setActiveModal('finalize')}
                    cartItems={cartItems}
                />
            )}

            {activeModal === 'updateWeight' && activePet && (
                <UpdateWeightModal
                    currentWeight={activePet.weight || '0kg'}
                    onClose={() => setActiveModal('none')}
                    onSave={(newWeight) => {
                        setActivePet(prev => prev ? { ...prev, weight: newWeight + 'kg' } : null);
                        setActiveModal('none');
                    }}
                />
            )}

            {activeModal === 'tutorInfo' && (
                <TutorInfoModal
                    tutor={MOCK_TUTOR}
                    onClose={() => setActiveModal('none')}
                />
            )}

            {activeModal === 'upgradePlan' && (
                <UpgradePlanModal
                    onClose={() => setActiveModal('none')}
                />
            )}


            {activeModal === 'attendanceHistory' && (
                <AttendanceHistoryModal
                    pet={activePet}
                    onClose={() => setActiveModal('none')}
                />
            )}

        </div>
    );
};

export default App;
