import { z } from 'zod';

export const createPerfisPermissoesSchema = z.object({
  perfilId:    z.number().int().positive(),
  permissoesIds: z.array(z.number().int().positive()).min(1),
});
