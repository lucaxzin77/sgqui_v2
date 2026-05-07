import { z } from 'zod';

export const createEtapaSchema = z.object({
  projeto:   z.number().int().positive(),           // NOT NULL FK
  nome:      z.string().trim().min(1).max(255),     // NOT NULL
  descricao: z.string().trim().max(255),            // NOT NULL
  ordem:     z.number().int(),                     // NOT NULL tinyint
});

export const updateEtapaSchema = createEtapaSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
