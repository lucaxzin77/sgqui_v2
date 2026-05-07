import * as nutriente from './nutriente.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createNutrienteSchema, updateNutrienteSchema } from './nutriente.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'nutriente:consultar',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'nutriente',
		middlewares: [autenticar, autorizar],
		functionExec: nutriente.consultar,
		recurso: 'Nutrientes',
		descricao: 'Listar nutrientes cadastrados',
		ehPublica: false
	},
	{
		codigo: 'nutriente:consultarPorId',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'nutriente/:id',
		middlewares: [autenticar, autorizar],
		functionExec: nutriente.consultarPorId,
		recurso: 'Nutrientes',
		descricao: 'Visualizar dados detalhados de um nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'nutriente/:id',
		middlewares: [autenticar, autorizar],
		functionExec: nutriente.deletar,
		recurso: 'Nutrientes',
		descricao: 'Remover nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'nutriente',
		middlewares: [autenticar, autorizar, validate(createNutrienteSchema)],
		functionExec: nutriente.cadastrada,
		recurso: 'Nutrientes',
		descricao: 'Cadastrar nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'nutriente/:id',
		middlewares: [autenticar, autorizar, validate(updateNutrienteSchema)],
		functionExec: nutriente.alterar,
		recurso: 'Nutrientes',
		descricao: 'Alterar dados de um nutriente',
		ehPublica: false
	}
];
