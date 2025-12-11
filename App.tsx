import React, { useState, useEffect } from 'react';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon as ExclamationTriangleSolid } from '@heroicons/react/20/solid';

// Domain Logic & State
import { useServices } from './src/hooks/useServices';
import { useCart } from './src/hooks/useCart';
import { usePatient } from './src/hooks/usePatient';
import { useCheckout, ModalType } from './src/hooks/useCheckout';
import { MOCK_TUTOR, MOCK_PET, MOCK_PETS_LIST } from './src/infrastructure/api/mockData';

// Layout & UI
import { Header } from './src/components/layout/Header';
import {
    PaymentLinkSentToast, PlanActiveToast, GracePeriodSuccessToast, LimitPurchasedToast,
    ForwardSuccessToast, UpgradeSuccessToast, FinalizeFeesPaidToast, AttendanceCancelledToast
} from './src/components/ui/Notifications';

// Features - Patient
import { SearchModal } from './src/features/Patient/components/modals/SearchModal';
import { PetSelectionModal } from './src/features/Patient/components/modals/PetSelectionModal';
import { AnamnesisModal } from './src/features/Patient/components/modals/AnamnesisModal';
import { PlanSelection } from './src/features/Patient/components/PlanSelection';
import { PetHeader } from './src/features/Patient/components/PetHeader';

// Features - Catalog
import { ServiceList } from './src/features/Catalog/components/ServiceList';

// Features - Cart
import { CartSidebar } from './src/features/Cart/components/CartSidebar';

// Features - Checkout Modals
import { FinalizeModal } from './src/features/Checkout/components/modals/FinalizeModal';
import { ScheduleModal } from './src/features/Checkout/components/modals/ScheduleModal';
import { ConfirmBudgetModal } from './src/features/Checkout/components/modals/ConfirmBudgetModal';
import { BudgetDetailsModal } from './src/features/Checkout/components/modals/BudgetDetailsModal';
import { ServiceDetailsModal } from './src/features/Checkout/components/modals/ServiceDetailsModal';
import { CancelAttendanceModal } from './src/features/Checkout/components/modals/CancelAttendanceModal';
import { GracePeriodModal } from './src/features/Checkout/components/modals/GracePeriodModal';
import { LimitExceededModal } from './src/features/Checkout/components/modals/LimitExceededModal';
import { NoCoverageModal } from './src/features/Checkout/components/modals/NoCoverageModal';

const App: React.FC = () => {
    // --- Global View State ---
    const [view, setView] = useState<'search' | 'dashboard' | 'planSelection'>('search');

    // --- Hooks ---
    const {
        activePet, searchPatient, loading: patientLoading, searchScenario, searchResults, selectPet, clearPatient
    } = usePatient(); // Note: added setActivePet to hook temporarily or assumed it returns one. 
    // Wait, my usePatient didn't export setActivePet directly, but selectPet behaves like it. 
    // And searchPatient logic sets it. I'll rely on usePatient's internal logic and `activePet` state.

    const {
        services, loading: servicesLoading, activeCategory, setActiveCategory, searchTerm, setSearchTerm
    } = useServices();

    const {
        cartItems, addToCart, removeFromCart, updateQuantity, clearCart
    } = useCart();

    const {
        activeModal, openModal, closeModal, selectedService: modalService
    } = useCheckout();

    // --- Notifications State (keeping local for simplicity as it's UI feedback) ---
    // In a real refined version, this could be a useToast context.
    const [notifications, setNotifications] = useState({
        linkSent: false,
        planActive: false,
        gracePaid: false,
        limitPaid: false,
        forwarded: false,
        upgraded: false,
        finalizeFeesPaid: false,
        attendanceCancelled: false
    });

    const updateNotification = (key: keyof typeof notifications, value: boolean) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
    };

    // --- Derived State needed for Banners/Buisness Logic ---
    const [isAttendanceActive, setIsAttendanceActive] = useState(false);
    const [isDelinquent, setIsDelinquent] = useState(false);
    const [isPlanReactivated, setIsPlanReactivated] = useState(false);
    const [hasSavedBudget, setHasSavedBudget] = useState(false);
    const [isBudgetScheduled, setIsBudgetScheduled] = useState(false);
    const [hasAnamnesis, setHasAnamnesis] = useState(false);

    // Unlocked services map (serviceId -> true) to bypass restrictions after payment
    const [unlockedServices, setUnlockedServices] = useState<Record<string, boolean>>({});

    // --- Effects to React to Hook Changes ---
    useEffect(() => {
        // Handle Search Scenarios
        if (searchScenario === 'delinquent') {
            setIsDelinquent(true);
            setView('dashboard');
        } else if (searchScenario === 'no_plan') {
            setView('planSelection');
        } else if (searchScenario === 'multi_pet') {
            openModal('petSelection');
        } else if (searchScenario === 'saved_budget') {
            setHasSavedBudget(true);
            setView('dashboard');
        } else if (searchScenario === 'attendance') {
            setIsAttendanceActive(true);
            setView('dashboard');
        } else if (activePet && searchScenario === 'normal') {
            setView('dashboard');
        }
    }, [searchScenario, activePet, openModal]);

    const handleSearch = (cpf: string) => {
        // Reset local transient flags
        setIsDelinquent(false);
        setIsPlanReactivated(false);
        setHasSavedBudget(false);
        setIsBudgetScheduled(false);
        setIsAttendanceActive(false);
        setHasAnamnesis(false);
        setUnlockedServices({});
        searchPatient(cpf);
    };

    const handlePetSelectFromModal = (pet: any) => {
        selectPet(pet);
        closeModal();
        setView('dashboard');
    };

    // --- Handlers for Cart Sidebar Actions ---
    const handleCartAction = (action: 'schedule' | 'quote' | 'finalize' | 'cancel') => {
        if (action === 'finalize') openModal('finalize');
        if (action === 'schedule') openModal('schedule');
        if (action === 'quote') openModal('confirmBudget');
        if (action === 'cancel') restartProcess();
    };

    const restartProcess = () => {
        clearCart();
        clearPatient();
        setView('search');
        setNotifications({
            linkSent: false, planActive: false, gracePaid: false, limitPaid: false,
            forwarded: false, upgraded: false, finalizeFeesPaid: false, attendanceCancelled: false
        });
        setIsAttendanceActive(false);
        // Note: other local states reset in handleSearch or as needed
    };

    const handleCancelAttendance = () => {
        openModal('cancelAttendance');
    }

    const confirmCancellation = () => {
        closeModal();
        clearCart();
        clearPatient();
        setView('search');
        setIsAttendanceActive(false);
        setTimeout(() => updateNotification('attendanceCancelled', true), 300);
    }

    // --- Service Interaction Handlers ---
    const handleServiceClick = (service: any, action: 'cart' | 'noCoverage' | 'limit' | 'grace' | 'upgrade' | 'details' | 'forward') => {
        // Check if service is unlocked
        if (unlockedServices[service.id]) {
            addToCart(service);
            return;
        }

        if (action === 'grace') openModal('gracePeriod', service);
        if (action === 'limit') openModal('limitExceeded', service);
        if (action === 'noCoverage' || action === 'upgrade') openModal('noCoverage', service); // Reuse noCoverage for upgrade UI
        if (action === 'cart') addToCart(service);
        // forward handled separately? Or via modal?
    };

    const handleServiceForward = (service: any) => {
        updateNotification('forwarded', true);
    };

    // --- Business Logic for Modals ---
    // Grace Period
    const handleGracePaymentLink = () => updateNotification('linkSent', true);
    const handleGraceSimulatePayment = () => {
        updateNotification('linkSent', false);
        if (modalService) {
            setUnlockedServices(prev => ({ ...prev, [modalService.id]: true }));
            updateNotification('gracePaid', true);
        }
        closeModal();
    };
    const handleGraceAddToBudget = (fee: number) => {
        if (modalService) addToCart(modalService, fee, undefined);
        closeModal();
    };

    // Limit Exceeded
    const handleLimitPaymentLink = () => updateNotification('linkSent', true);
    const handleLimitSimulatePayment = () => {
        updateNotification('linkSent', false);
        if (modalService) {
            setUnlockedServices(prev => ({ ...prev, [modalService.id]: true }));
            updateNotification('limitPaid', true);
        }
        closeModal();
    };
    const handleLimitAddToBudget = (fee: number) => {
        if (modalService) addToCart(modalService, undefined, fee);
        closeModal();
    };

    // Upgrade / No Coverage
    const handleUpgradeLink = () => {
        updateNotification('upgraded', true);
        if (modalService) setUnlockedServices(prev => ({ ...prev, [modalService.id]: true }));
        closeModal();
    }

    // Delinquency
    const handleDelinquencyLink = () => updateNotification('linkSent', true);
    const handleDelinquencyPayment = () => {
        updateNotification('linkSent', false);
        setIsPlanReactivated(true);
        updateNotification('planActive', true);
    }

    // Finalize
    const handleFinalizeLink = () => updateNotification('linkSent', true);
    const handleFinalizePayment = () => {
        updateNotification('linkSent', false);
        updateNotification('finalizeFeesPaid', true);
    }

    // --- Render Logic ---

    // 1. Search View
    if (view === 'search') {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <Header />
                <SearchModal
                    onClose={() => { }}
                    onSearch={() => handleSearch(searchTerm)}
                    inputValue={searchTerm}
                    onInputChange={setSearchTerm}
                />

                {notifications.attendanceCancelled && <AttendanceCancelledToast onClose={() => updateNotification('attendanceCancelled', false)} />}

                {activeModal === 'petSelection' && (
                    <PetSelectionModal
                        pets={searchResults.length > 0 ? searchResults : MOCK_PETS_LIST} // Fallback to mock list if searchResults empty (handled by hook)
                        onSelect={handlePetSelectFromModal}
                        onClose={() => closeModal()}
                    />
                )}
            </div>
        );
    }

    // 2. Plan Selection View
    if (view === 'planSelection') {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <Header />
                <PlanSelection onBack={() => setView('search')} />
            </div>
        )
    }

    // 3. Dashboard View
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800 pb-20 flex flex-col">
            <Header />

            {/* Banners */}
            <div className="w-full">
                {isDelinquent && !isPlanReactivated && (
                    <div className="bg-indigo-100 border-b border-indigo-200">
                        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <div className="bg-indigo-500 rounded-full p-1 text-white flex-shrink-0"><ExclamationTriangleSolid className="w-4.5 h-4.5 text-white" /></div>
                                <p className="text-indigo-700 font-medium text-sm md:text-base">Atenção! Esse plano possui pendências financeiras e está temporariamente inativo.</p>
                            </div>
                            <button onClick={handleDelinquencyLink} className="bg-white border border-indigo-300 text-indigo-700 font-medium px-6 py-2 rounded hover:bg-indigo-50 transition-colors text-sm whitespace-nowrap shadow-sm">Enviar link de acerto</button>
                        </div>
                    </div>
                )}
                {hasSavedBudget && !isBudgetScheduled && (
                    <div className="bg-indigo-100 border-b border-indigo-200">
                        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <CalendarIcon className="text-indigo-600 flex-shrink-0 w-6 h-6" />
                                <p className="text-indigo-700 font-medium">Atenção! Existe um orçamento salvo para esse pet. Clique ao lado para acessar.</p>
                            </div>
                            <button onClick={() => openModal('budgetDetails')} className="bg-white border border-indigo-300 text-indigo-600 font-medium px-6 py-2 rounded hover:bg-indigo-50 transition-colors shadow-sm">Detalhes</button>
                        </div>
                    </div>
                )}
                {isBudgetScheduled && !isAttendanceActive && (
                    <div className="bg-indigo-100 border-b border-indigo-200 animate-in fade-in slide-in-from-top duration-500">
                        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <CalendarIcon className="text-indigo-600 flex-shrink-0 w-6 h-6" />
                                <p className="text-indigo-700 font-medium">Pet com atendimento agendado para dia 20/11/2025 às 14:30</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="bg-white border border-indigo-300 text-indigo-600 font-medium px-6 py-2 rounded hover:bg-indigo-50 transition-colors text-sm shadow-sm">Detalhes</button>
                                <button onClick={() => setIsBudgetScheduled(false)} className="text-indigo-400 hover:text-indigo-600 p-1"><XMarkIcon className="w-6 h-6" /></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Toasts */}
            {notifications.linkSent && <PaymentLinkSentToast onClose={() => updateNotification('linkSent', false)} onAction={() => {
                if (activeModal === 'gracePeriod') handleGraceSimulatePayment();
                else if (activeModal === 'limitExceeded') handleLimitSimulatePayment();
                else if (activeModal === 'finalize') handleFinalizePayment();
                else if (isDelinquent) handleDelinquencyPayment();
            }} />}
            {notifications.planActive && <PlanActiveToast onClose={() => updateNotification('planActive', false)} />}
            {notifications.gracePaid && <GracePeriodSuccessToast onClose={() => updateNotification('gracePaid', false)} />}
            {notifications.limitPaid && <LimitPurchasedToast onClose={() => updateNotification('limitPaid', false)} />}
            {notifications.forwarded && <ForwardSuccessToast onClose={() => updateNotification('forwarded', false)} />}
            {notifications.upgraded && <UpgradeSuccessToast onClose={() => updateNotification('upgraded', false)} />}
            {notifications.finalizeFeesPaid && <FinalizeFeesPaidToast onClose={() => updateNotification('finalizeFeesPaid', false)} />}


            {activePet && (
                <PetHeader
                    pet={activePet}
                    tutor={MOCK_TUTOR}
                    isAttendanceActive={isAttendanceActive}
                    onDetailsClick={() => openModal('serviceDetails')}
                />
            )}

            <main className="max-w-[1600px] w-full mx-auto p-4 md:p-6 flex-grow relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">

                    {/* Block Interaction Layer */}
                    {isDelinquent && !isPlanReactivated && (
                        <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] flex flex-col items-center pt-32 text-center rounded-lg border border-gray-100">
                            <p className="text-gray-500 font-medium max-w-sm px-4">Tutor precisa resolver pendências antes de continuar</p>
                        </div>
                    )}

                    <div className="lg:col-span-8 xl:col-span-9">
                        <ServiceList
                            services={services}
                            loading={servicesLoading}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onAddToCart={(s) => addToCart(s)}
                            onServiceClick={handleServiceClick}
                        />
                        <div className="mt-12 text-center text-xs text-gray-500">
                            Faça a busca. Seus serviços aparecerão por aqui
                        </div>
                    </div>

                    <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
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

            {/* Modals Layer */}
            {activeModal === 'finalize' && (
                <FinalizeModal
                    items={cartItems}
                    onClose={closeModal}
                    isAttendanceMode={isAttendanceActive}
                    onSendPaymentLink={handleFinalizeLink}
                    isFeesPaid={notifications.finalizeFeesPaid}
                    onCancelProcess={handleCancelAttendance}
                />
            )}
            {activeModal === 'cancelAttendance' && (
                <CancelAttendanceModal
                    onClose={() => openModal('finalize')}
                    onConfirm={confirmCancellation}
                />
            )}
            {activeModal === 'schedule' && (
                <ScheduleModal onClose={closeModal} onConfirm={() => {
                    setIsBudgetScheduled(true);
                    setHasSavedBudget(false);
                    closeModal();
                }
                } />
            )}
            {activeModal === 'budgetDetails' && (
                <BudgetDetailsModal onClose={closeModal} onSchedule={() => openModal('schedule')} />
            )}
            {activeModal === 'confirmBudget' && (
                <ConfirmBudgetModal items={cartItems} onClose={closeModal} onConfirm={closeModal} onSendLink={() => updateNotification('linkSent', true)} />
            )}
            {activeModal === 'anamnesis' && (
                <AnamnesisModal onClose={closeModal} onSave={() => { setHasAnamnesis(true); closeModal(); }} />
            )}
            {activeModal === 'gracePeriod' && modalService && (
                <GracePeriodModal service={modalService} onClose={closeModal} onSendLink={handleGracePaymentLink} onAddToBudget={handleGraceAddToBudget} />
            )}
            {activeModal === 'limitExceeded' && modalService && (
                <LimitExceededModal service={modalService} onClose={closeModal} onSendLink={handleLimitPaymentLink} onAddToBudget={handleLimitAddToBudget} />
            )}
            {activeModal === 'noCoverage' && modalService && (
                <NoCoverageModal service={modalService} onClose={closeModal} onUpgrade={handleUpgradeLink} onAuthorize={() => { }} />
            )}
            {activeModal === 'serviceDetails' && (
                <ServiceDetailsModal onClose={closeModal} onAddService={closeModal} onFinalize={() => openModal('finalize')} cartItems={cartItems} />
            )}

        </div>
    );
};

export default App;
