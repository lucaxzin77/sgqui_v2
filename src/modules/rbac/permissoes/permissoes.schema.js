import { z } from 'zod';

export const createPermissoesSchema = z.object({
  codigo:        z.string().trim().min(1).max(50),   // NOT NULL UNIQUE
  modulo:        z.string().trim().min(1).max(50),   // NOT NULL
  recurso:       z.string().trim().min(1).max(50),   // NOT NULL
  metodo:        z.string().trim().min(1).max(10),   // NOT NULL
  rota_template: z.string().trim().min(1).max(255),  // NOT NULL
  descricao:     z.string().trim().min(1).max(255),  // NOT NULL
  eh_publica:    z.boolean(),                        // NOT NULL tinyint(1)
});

export const updatePermissoesSchema = createPermissoesSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
