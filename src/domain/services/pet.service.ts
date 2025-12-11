import { Pet, PetSchema } from '../models/pet.model';
import { MOCK_PETS_LIST, MOCK_PET } from '../../infrastructure/api/mockData';
import { CPF_MULTI_PET, CPF_NO_PLAN, CPF_DELINQUENT, CPF_SAVED_BUDGET, CPF_ATTENDANCE } from '../../infrastructure/api/mockData';

export interface IPetService {
    getPetsByCpf(cpf: string): Promise<Pet[]>;
}

export interface SearchResult {
    pets: Pet[];
    scenario: 'normal' | 'multi_pet' | 'no_plan' | 'delinquent' | 'saved_budget' | 'attendance';
}

const LATENCY_MS_SEARCH = 600;

export class PetService implements IPetService {
    async getPetsByCpf(cpf: string): Promise<Pet[]> {
        // This is a simplified fetch, real implementation would handle scenarios differently
        return new Promise((resolve) => {
            setTimeout(() => {
                if (cpf === CPF_MULTI_PET) {
                    resolve(MOCK_PETS_LIST);
                } else {
                    resolve([MOCK_PET]);
                }
            }, LATENCY_MS_SEARCH);
        });
    }

    async searchByCpf(cpf: string): Promise<SearchResult> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let scenario: SearchResult['scenario'] = 'normal';
                let pets: Pet[] = [MOCK_PET];

                switch (cpf) {
                    case CPF_NO_PLAN:
                        scenario = 'no_plan';
                        break;
                    case CPF_MULTI_PET:
                        scenario = 'multi_pet';
                        pets = MOCK_PETS_LIST;
                        break;
                    case CPF_DELINQUENT:
                        scenario = 'delinquent';
                        break;
                    case CPF_SAVED_BUDGET:
                        scenario = 'saved_budget';
                        break;
                    case CPF_ATTENDANCE:
                        scenario = 'attendance';
                        break;
                    default:
                        scenario = 'normal';
                        break;
                }

                resolve({ pets, scenario });
            }, LATENCY_MS_SEARCH);
        });
    }
}

export const petService = new PetService();
