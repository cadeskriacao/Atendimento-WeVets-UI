import { Service, ServiceSchema } from '../models/service.model';
import { MOCK_SERVICES } from '../../infrastructure/api/mockData';
import { z } from 'zod';

export interface IServiceService {
    getServices(): Promise<Service[]>;
    searchServices(query: string): Promise<Service[]>;
}

const LATENCY_MS = 300;

export class ServiceService implements IServiceService {
    async getServices(): Promise<Service[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Validation ensures our mock data is correct
                const validServices = z.array(ServiceSchema).parse(MOCK_SERVICES);
                resolve(validServices);
            }, LATENCY_MS);
        });
    }

    async searchServices(query: string): Promise<Service[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerQuery = query.toLowerCase();
                const filtered = MOCK_SERVICES.filter(s =>
                    s.name.toLowerCase().includes(lowerQuery) ||
                    s.code.toLowerCase().includes(lowerQuery)
                );
                resolve(filtered);
            }, LATENCY_MS);
        });
    }
}

export const serviceService = new ServiceService();
