import * as etapa from './etapa.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createEtapaSchema, updateEtapaSchema } from './etapa.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'etapa:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'etapa',
		middlewares: [autenticar, autorizar, validate(createEtapaSchema)],
		functionExec: etapa.cadastrar,
		recurso: 'Projetos',
		descricao: 'Cadastrar etapas para um projeto',
		ehPublica: false
	},
	{
		codigo: 'etapa:consultarPorId',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'etapa/:id',
		middlewares: [autenticar, autorizar],
		functionExec: etapa.consultarPorId,
		recurso: 'Projetos',
		descricao: 'Visualizar detalhes das etapas de um projeto',
		ehPublica: false
	},
	{
		codigo: 'etapa:consultarPorProjeto',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'etapa/projeto_id/:id',
		middlewares: [autenticar, autorizar],
		functionExec: etapa.consultarPorProjeto,
		recurso: 'Projetos',
		descricao: 'Listar as etapas de um projeto',
		ehPublica: false
	},
	{
		codigo: 'etapa:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'etapa/:id',
		middlewares: [autenticar, autorizar, validate(updateEtapaSchema)],
		functionExec: etapa.alterar,
		recurso: 'Projetos',
		descricao: 'Alterar dados das etapas de um projeto',
		ehPublica: false
	},
	{
		codigo: 'etapa:alterarOrdem',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'etapa/projeto/ordenar/',
		middlewares: [autenticar, autorizar],
		functionExec: etapa.alterarOrdem,
		recurso: 'Projetos',
		descricao: 'Reordenar as etapas de um projeto',
		ehPublica: false
	},
	{
		codigo: 'etapa:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'etapa/:id',
		middlewares: [autenticar, autorizar],
		functionExec: etapa.deletar,
		recurso: 'Projetos',
		descricao: 'Remover etapas de um projeto',
		ehPublica: false
	}
];
