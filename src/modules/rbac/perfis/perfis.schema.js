import { z } from 'zod';

export const createPerfisSchema = z.object({
  nome:      z.string().trim().min(2,'Nome deve ter no mínimo 2 caracteres').max(50),        // NOT NULL UNIQUE
  descricao: z.string().trim().max(255).optional(),  // NULL
});

export const updatePerfisSchema = createPerfisSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
