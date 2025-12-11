import { useState, useCallback } from 'react';
import { Service } from '../domain/models/service.model';

export type ModalType =
    | 'serviceDetails'
    | 'confirmBudget'
    | 'finalize'
    | 'cancelAttendance'
    | 'schedule'
    | 'budgetDetails'
    | 'search'
    | 'petSelection'
    | 'anamnesis'
    | 'gracePeriod'
    | 'limitExceeded'
    | 'noCoverage'
    | null;

export function useCheckout() {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const openModal = useCallback((modal: ModalType, service?: Service) => {
        if (service) setSelectedService(service);
        setActiveModal(modal);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setSelectedService(null);
    }, []);

    return {
        activeModal,
        openModal,
        closeModal,
        selectedService
    };
}
