import { z } from 'zod';

export const createGarantiaSchema = z.object({
  materia_prima: z.number('ID da matéria-prima deve ser um número inteiro positivo').int().positive(), // NOT NULL FK
  nutriente:     z.number('ID do nutriente deve ser um número inteiro positivo').int().positive(), // NOT NULL FK
  percentual:    z.number('Percentual deve ser um número real positivo').min(0,'Percentual deve ser um número real positivo'),           // NOT NULL double UNSIGNED
});

export const updateGarantiaSchema = createGarantiaSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
