import * as perfisController from './perfis.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createPerfisSchema, updatePerfisSchema } from './perfis.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'perfis:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfis',
		middlewares: [autenticar, autorizar],
		functionExec: perfisController.listar,
		recurso: 'Perfis',
		descricao: 'Listar perfis cadastrados',
		ehPublica: false
	},
	{
		codigo: 'perfis:consultarPorId',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfis/:id',
		middlewares: [autenticar, autorizar],
		functionExec: perfisController.listarPorId,
		recurso: 'Perfis',
		descricao: 'Visualizar detalhes dos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis:consultarPorNome',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfis/nome/:value',
		middlewares: [autenticar, autorizar],
		functionExec: perfisController.listarPorNome,
		recurso: 'Perfis',
		descricao: 'Consultar/Filtrar perfis por nome',
		ehPublica: false
	},
	{
		codigo: 'perfis:cadastrar',
		metodo: 'POST',
		modulo: 'rbac',
		rota: 'perfis',
		middlewares: [autenticar, autorizar, validate(createPerfisSchema)],
		functionExec: perfisController.cadastrar,
		recurso: 'Perfis',
		descricao: 'Cadastrar novo perfil',
		ehPublica: false
	},
	{
		codigo: 'perfis:alterar',
		metodo: 'PUT',
		modulo: 'rbac',
		rota: 'perfis/:id',
		middlewares: [autenticar, autorizar, validate(updatePerfisSchema)],
		functionExec: perfisController.alterar,
		recurso: 'Perfis',
		descricao: 'Alterar informações dos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis:remover',
		metodo: 'DELETE',
		modulo: 'rbac',
		rota: 'perfis/:id',
		middlewares: [autenticar, autorizar],
		functionExec: perfisController.remover,
		recurso: 'Perfis',
		descricao: 'Remover perfis',
		ehPublica: false
	}
];
