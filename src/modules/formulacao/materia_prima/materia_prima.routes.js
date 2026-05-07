import * as materia_prima from './materia_prima.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createMateriaPrimaSchema, updateMateriaPrimaSchema } from './materia_prima.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'materia_prima:consultar',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'materia_prima',
		middlewares: [autenticar, autorizar],
		functionExec: materia_prima.consultar,
		recurso: 'Matérias-primas',
		descricao: 'Listar matérias-primas cadastradas',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:consultarPorId',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'materia_prima/:id',
		middlewares: [autenticar, autorizar],
		functionExec: materia_prima.consultarPorId,
		recurso: 'Matérias-primas',
		descricao: 'Visualizar dados detalhados de uma matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:consultarMP_percentual_nutriente',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'materia_prima/compor_projeto/:nutriente/:percentual',
		middlewares: [autenticar, autorizar],
		functionExec: materia_prima.consultarMP_precentual_nutriente,
		recurso: 'Matérias-primas',
		descricao: 'Listar matérias-primas que possuam um percentual de um nutriente desejado',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'materia_prima/:id',
		middlewares: [autenticar, autorizar],
		functionExec: materia_prima.deletar,
		recurso: 'Matérias-primas',
		descricao: 'Remover matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'materia_prima',
		middlewares: [autenticar, autorizar, validate(createMateriaPrimaSchema)],
		functionExec: materia_prima.cadastrar,
		recurso: 'Matérias-primas',
		descricao: 'Cadastrar matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'materia_prima/:id',
		middlewares: [autenticar, autorizar, validate(updateMateriaPrimaSchema)],
		functionExec: materia_prima.alterar,
		recurso: 'Matérias-primas',
		descricao: 'Alterar os dados de uma matéria-prima',
		ehPublica: false
	}
];
