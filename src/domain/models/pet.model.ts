import { z } from 'zod';

export const PetSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    breed: z.string(),
    gender: z.string(),
    birthDate: z.string(),
    age: z.string(),
    weight: z.string().optional(),
    image: z.string(), // Allow relative paths
    plan: z.string().optional(),
    hasAppointment: z.boolean().optional(),
    appointmentInfo: z.string().optional(),
});

export type Pet = z.infer<typeof PetSchema>;

export const TutorSchema = z.object({
    name: z.string(),
    phone: z.string(),
    cpf: z.string(),
});

export type Tutor = z.infer<typeof TutorSchema>;
