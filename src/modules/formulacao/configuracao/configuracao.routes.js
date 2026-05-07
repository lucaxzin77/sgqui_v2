import * as configuracao from './configuracao.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createConfiguracaoSchema, updateConfiguracaoSchema } from './configuracao.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo:'config:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'configuracao',
		middlewares: [autenticar, autorizar, validate(createConfiguracaoSchema)],
		functionExec: configuracao.cadastrar,
		recurso: 'Configurações',
		descricao: 'Cadastrar configuração',
		ehPublica: false
	},
	{
		codigo:'config:consultar',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'configuracao',
		middlewares: [autenticar, autorizar],
		functionExec: configuracao.consultar,
		recurso: 'Configurações',
		descricao: 'Listar configurações',
		ehPublica: false
	},
	{
		codigo:'config:consultarPorId',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'configuracao/:key',
		middlewares: [autenticar, autorizar],
		functionExec: configuracao.consultarPorKey,
		recurso: 'Configurações',
		descricao: 'Obter configuração por KEY',
		ehPublica: false
	},
	{
		codigo:'config:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'configuracao/:key',
		middlewares: [autenticar, autorizar, validate(updateConfiguracaoSchema)],
		functionExec: configuracao.alterar,
		recurso: 'Configurações',
		descricao: 'Alterar configuração por KEY',
		ehPublica: false
	},
	{
		codigo:'config:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'configuracao/:key',
		middlewares: [autenticar, autorizar],
		functionExec: configuracao.deletar,
		recurso: 'Configurações',
		descricao: 'Deletar configuração por KEY',
		ehPublica: false
	}
];
