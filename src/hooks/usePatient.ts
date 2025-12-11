import { useState, useCallback } from 'react';
import { Pet } from '../domain/models/pet.model';
import { petService, SearchResult } from '../domain/services/pet.service';

export function usePatient() {
    const [activePet, setActivePet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchScenario, setSearchScenario] = useState<SearchResult['scenario']>('normal');
    const [searchResults, setSearchResults] = useState<Pet[]>([]);

    const searchPatient = useCallback(async (cpf: string) => {
        setLoading(true);
        try {
            const result = await petService.searchByCpf(cpf);
            setSearchScenario(result.scenario);
            setSearchResults(result.pets);

            // Auto-select if single pet and normal scenario (mimicking original behavior mostly)
            // But the original component handled strict scenarios. We'll expose the result.
            if (result.scenario !== 'multi_pet' && result.pets.length > 0) {
                setActivePet(result.pets[0] || null);
            } else {
                setActivePet(null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const selectPet = useCallback((pet: Pet) => {
        setActivePet(pet);
    }, []);

    const clearPatient = useCallback(() => {
        setActivePet(null);
        setSearchScenario('normal');
        setSearchResults([]);
    }, []);

    return {
        activePet,
        searchPatient,
        loading,
        searchScenario,
        searchResults,
        selectPet,
        clearPatient
    };
}
