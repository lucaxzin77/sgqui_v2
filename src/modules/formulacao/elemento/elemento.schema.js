import { z } from 'zod';

export const createElementoSchema = z.object({
  simbolo:                 z.string().trim().min(1).max(3),
  nome:                    z.string().trim().min(1).max(50),       // NOT NULL
  numero_atomico:          z.number().int().optional(),
  massa_atomica:           z.number().optional(),
  grupo:                   z.number().int().optional(),
  periodo:                 z.number().int().optional(),
  ponto_de_fusao:          z.number().optional(),
  ponto_de_ebulicao:       z.number().optional(),
  densidade:               z.number().optional(),
  estado_padrao:           z.string().trim().max(20).optional(),
  configuracao_eletronica: z.string().trim().max(50).optional(),
  propriedades:            z.string().trim().optional(),
});

export const updateElementoSchema = createElementoSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
