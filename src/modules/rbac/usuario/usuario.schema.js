import { z } from 'zod';

// CREATE
export const createUsuarioSchema = z.object({
  nome: z.string()
    .trim()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100),

  email: z.string()
    .trim()
    .email('Email inválido')
    .max(100),

  senha: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(255),

  avatar: z.string()
    .trim()
    .url('Avatar deve ser uma URL válida')
    .optional(),

  status: z.boolean().optional()
});

export const updateUsuarioSchema = createUsuarioSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
});