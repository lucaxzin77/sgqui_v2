import { z } from 'zod';

export const createProjetoSchema = z.object({
  codigo:          z.string().trim().min(1).max(20),        // NOT NULL UNIQUE
  nome:            z.string().trim().min(1).max(255),       // NOT NULL
  cliente:         z.string().trim().max(255).optional(),   // NULL
  descricao:       z.string().trim().max(255).optional(),   // NULL
  data_inicio:     z.string().trim().min(1),                // NOT NULL date ISO
  data_termino:    z.string().trim().min(1).optional(),                // NULL date ISO
  densidade:       z.number().min(0).optional(),                       // NULL double UNSIGNED
  ph:              z.string().trim().min(0).max(255).optional(),       // NULL
  tipo:            z.string().trim().min(0).max(255).optional(),       // NULL
  aplicacao:       z.any().optional(),                      // json NULL
  natureza_fisica: z.string().trim().max(255).optional(),   // NULL
  status:          z.any().optional(),                      // json NULL
  resultado:       z.any().optional(),                      // json NULL
});

export const updateProjetoSchema = createProjetoSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
