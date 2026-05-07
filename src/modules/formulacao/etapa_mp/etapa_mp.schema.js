import { z } from 'zod';

export const createEtapaMpSchema = z.object({
  etapa:          z.number().int().positive(),          // NOT NULL FK
  mp:             z.number().int().positive(),          // NOT NULL FK
  percentual:     z.number().min(0),                   // NOT NULL double
  tempo_agitacao: z.string().trim().max(8).optional(), // TIME HH:MM:SS, default '00:00:00'
  observacao:     z.string().trim().max(1000),          // NOT NULL
  ordem:          z.number().int(),                    // NOT NULL tinyint
  lote:           z.string().trim().max(20).optional(),// DEFAULT ''
});

export const updateEtapaMpSchema = createEtapaMpSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
