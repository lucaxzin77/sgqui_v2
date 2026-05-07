import { z } from 'zod';

export const createUsuarioPerfisSchema = z.object({
  usuarioId: z.number().int().positive(),
  perfilId:  z.number().int().positive(),
});

export const updateUsuarioPerfisSchema = createUsuarioPerfisSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
});
