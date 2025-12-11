import { z } from 'zod';

export const ServiceCategorySchema = z.enum(['Consulta', 'Vacina', 'Exame', 'Cirurgia', 'Internação']);
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;

export const ServiceTagTypeSchema = z.enum(['success', 'warning', 'error', 'neutral']);
export const ServiceTagIconSchema = z.enum(['check', 'x', 'clock']).optional();

export const ServiceTagSchema = z.object({
    label: z.string(),
    type: ServiceTagTypeSchema,
    icon: ServiceTagIconSchema,
});
export type ServiceTag = z.infer<typeof ServiceTagSchema>;

export const ServiceActionTypeSchema = z.enum(['cart', 'forward', 'none', 'upgrade']);
export type ServiceActionType = z.infer<typeof ServiceActionTypeSchema>;

export const ServiceSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    category: ServiceCategorySchema,
    price: z.number().min(0),
    copay: z.number().min(0),
    tags: z.array(ServiceTagSchema),
    warning: z.string().optional(),
    disabled: z.boolean().optional(),
    actionType: ServiceActionTypeSchema,
});

export type Service = z.infer<typeof ServiceSchema>;
