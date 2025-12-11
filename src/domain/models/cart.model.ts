import { z } from 'zod';
import { ServiceSchema } from './service.model';

export const CartItemSchema = ServiceSchema.extend({
    quantity: z.number().int().min(1),
    anticipationFee: z.number().min(0).optional(),
    limitFee: z.number().min(0).optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
