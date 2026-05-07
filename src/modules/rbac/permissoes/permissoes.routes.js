import * as permissoesController from './permissoes.controller.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'permissoes:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes',
		middlewares: [autenticar, autorizar],
		functionExec: permissoesController.listarTodas,
		recurso: 'Permissões',
		descricao: 'Listar permissões do sistema',
		ehPublica: false
	},
	{
		codigo: 'permissoes:listarDoUsuarioLogado',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes/usuario',
		middlewares: [autenticar],
		functionExec: permissoesController.listarDoUsuarioLogado,
		recurso: 'Permissões',
		descricao: 'Listar permissões do usuário logado',
		ehPublica: true
	},
	{
		codigo: 'permissoes:listarDisponiveisParaVinculacao',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes/disponiveis_vinculacao',
		middlewares: [autenticar],
		functionExec: permissoesController.listarDisponiveisParaVinculacao,
		recurso: 'Permissões',
		descricao: 'Listar permissões disponíveis para vinculação',
		ehPublica: true
	},
	{
		codigo: 'permissoes:listarPorUsuario',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes/usuario/:usuarioId',
		middlewares: [autenticar, autorizar],
		functionExec: permissoesController.listarPermissoesPorUsuario,
		recurso: 'Permissões',
		descricao: 'Listar permissões por usuário',
		ehPublica: false
	}
];
