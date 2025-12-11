import { useState, useEffect, useMemo } from 'react';
import { Service } from '../domain/models/service.model';
import { serviceService } from '../domain/services/service.service';

export function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Local filtering state
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        async function fetchServices() {
            try {
                setLoading(true);
                const data = await serviceService.getServices();
                setServices(data);
            } catch (err) {
                setError('Failed to load services');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    const filteredServices = useMemo(() => {
        return services.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.code.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = activeCategory === 'all' ||
                (activeCategory === 'consultas' && s.category === 'Consulta') ||
                (activeCategory === 'vacinas' && s.category === 'Vacina') ||
                (activeCategory === 'exames' && s.category === 'Exame');

            return matchesSearch && matchesCategory;
        });
    }, [services, searchTerm, activeCategory]);

    return {
        services: filteredServices,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        activeCategory,
        setActiveCategory
    };
}
