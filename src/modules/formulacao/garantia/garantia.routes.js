import * as garantia from './garantia.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createGarantiaSchema, updateGarantiaSchema } from './garantia.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'garantia:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'garantia',
		middlewares: [autenticar, autorizar, validate(createGarantiaSchema)],
		functionExec: garantia.cadastrar,
		recurso: 'Garantias',
		descricao: 'Cadastrar uma nova garantia de nutriente para uma matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'garantia:consultarPorMateria_prima',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'garantia/materia_prima/:materia_primaId',
		middlewares: [autenticar, autorizar],
		functionExec: garantia.consultarPorMateria_prima,
		recurso: 'Garantias',
		descricao: 'Listar as garantias de nutrientes de uma determinada matéria-prima',
		ehPublica: false
	},	
	{
		codigo: 'garantia:consultarPorNutriente',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'garantia/nutriente/:nutrienteId',
		middlewares: [autenticar, autorizar],
		functionExec: garantia.consultarPorNutriente,
		recurso: 'Garantias',
		descricao: 'Listar as materiais-primas que possuem de um determinado nutriente',
		ehPublica: false
	},
	{
		codigo: 'garantia:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'garantia/:id',
		middlewares: [autenticar, autorizar, validate(updateGarantiaSchema)],
		functionExec: garantia.alterar,
		recurso: 'Garantias',
		descricao: 'Atualizar uma garantia de nutriente para uma matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'garantia:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'garantia/:id',
		middlewares: [autenticar, autorizar],
		functionExec: garantia.deletar,
		recurso: 'Garantias',
		descricao: 'Remover garantia de nutriente para uma matéria-prima',
		ehPublica: false
	}
];
