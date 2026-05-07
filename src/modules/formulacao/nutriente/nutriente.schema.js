import { z } from 'zod';

export const createNutrienteSchema = z.object({
  nome:    z.string().trim().min(2, 'O campo nome não pode ser vazio ou conter apenas espaços em branco').max(100),
  formula: z.string().trim().min(1, 'O campo formula não pode ser vazio ou conter apenas espaços em branco').max(100),
  visivel: z.boolean('Um valor booleano é obrigatório').optional(),  // DEFAULT 'true' (1) no banco de dados
});

export const updateNutrienteSchema = createNutrienteSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado'
  });