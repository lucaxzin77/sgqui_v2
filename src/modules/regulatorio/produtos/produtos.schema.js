import { z } from 'zod';

export const createProdutosSchema = z.object({
  projeto:           z.number().int().positive(),          // NOT NULL FK
  n_desenvolvimento: z.string().trim().min(1).max(255),   // NOT NULL
  descricao:         z.string().trim().max(255).optional(),// NULL
  data_emissao:      z.string().trim().optional(),         // date NULL
  unid_medida:       z.string().trim().max(50).optional(), // NULL
  capacidade:        z.number().min(0).optional(),         // NULL decimal(10,4)
  grupo:             z.string().trim().max(100).optional(),// NULL
  subgrupo:          z.string().trim().max(100).optional(),// NULL
  classif_fiscal:    z.string().trim().max(50).optional(), // NULL
  classe:            z.number().int().optional(),           // NULL
  modelo:            z.string().trim().max(100).optional(),// NULL
  peso_liquido:      z.number().min(0).optional(),         // NULL decimal(10,4)
  peso_bruto:        z.number().min(0).optional(),         // NULL decimal(10,4)
  validade:          z.string().trim().max(50).optional(), // NULL
  n_registro:        z.string().trim().max(100).optional(),// NULL
  densidade:         z.number().min(0).optional(),         // NULL decimal(10,6) UNSIGNED
  garantias:         z.any().optional(),                   // json NULL
  tipo:              z.string().trim().max(100).optional(),// NULL
  natureza_fisica:   z.string().trim().max(100).optional(),// NULL
  aplicacao:         z.string().trim().max(255).optional(),// NULL
  formulacao:        z.any().optional(),                   // json NULL
  embalagens:        z.any().optional(),                   // json NULL
  status:            z.enum(['Rascunho', 'Aguardando', 'Liberado']).optional(),
});

export const updateProdutosSchema = createProdutosSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
