import { z } from 'zod';

export const createConfiguracaoSchema = z.object({
  key:    z.string().trim().min(1).max(100),
  value:  z.any(),              // json NOT NULL
  status: z.any().optional(),  // json DEFAULT NULL
});

export const updateConfiguracaoSchema = createConfiguracaoSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
