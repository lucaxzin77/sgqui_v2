import { z } from 'zod';

export const createMateriaPrimaSchema = z.object({
  codigo:     z.string().trim().min(1).max(50),         // NOT NULL UNIQUE
  nome:       z.string().trim().min(1).max(100),        // NOT NULL UNIQUE
  formula:    z.string().trim().min(1).max(50),         // NOT NULL
  cas_number: z.string().trim().min(1).max(50),         // NOT NULL
  densidade:  z.number().min(0),                       // NOT NULL double UNSIGNED
  descricao:  z.string().trim().max(1000).optional(),  // NULL
});

export const updateMateriaPrimaSchema = createMateriaPrimaSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
