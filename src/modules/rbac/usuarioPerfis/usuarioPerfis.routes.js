import * as usuarioPerfisController from './usuarioPerfis.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createUsuarioPerfisSchema } from './usuarioPerfis.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'usuario_perfis:vincular',
		metodo: 'POST',
		modulo: 'rbac',
		rota: 'usuario_perfis',
		middlewares: [autenticar, autorizar, validate(createUsuarioPerfisSchema)],
		functionExec: usuarioPerfisController.vincular,
		recurso: 'Usuários-perfis',
		descricao: 'Vincular usuario a perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:desvincular',
		metodo: 'DELETE',
		modulo: 'rbac',
		rota: 'usuario_perfis/:vinculoID',
		middlewares: [autenticar, autorizar],
		functionExec: usuarioPerfisController.desvincular,
		recurso: 'Usuários-perfis',
		descricao: 'Desvincular usuario de perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis',
		middlewares: [autenticar, autorizar],
		functionExec: usuarioPerfisController.listar,
		recurso: 'Usuários-perfis',
		descricao: 'Listar os vínculos entre usuários e perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listarDoUsuarioLogado',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis/usuario/perfis',
		middlewares: [autenticar],
		functionExec: usuarioPerfisController.listarDoUsuarioLogado,
		recurso: 'Usuários-perfis',
		descricao: 'Listar os perfis vinculados a um usuário logado',
		ehPublica: true
	},
	{
		codigo: 'usuario_perfis:listarPerfisPorUsuario',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis/usuario/:usuarioId/perfis',
		middlewares: [autenticar, autorizar],
		functionExec: usuarioPerfisController.listarPerfisPorUsuario,
		recurso: 'Usuários-perfis',
		descricao: 'Listar perfis vinculados a um usuário',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listarUsuariosPorPerfil',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis/perfil/:perfilId/usuarios',
		middlewares: [autenticar, autorizar],
		functionExec: usuarioPerfisController.listarUsuariosPorPerfil,
		recurso: 'Usuários-perfis',
		descricao: 'Listar usuários vinculados a um perfil',
		ehPublica: false
	}
];
