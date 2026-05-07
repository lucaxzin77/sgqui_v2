import * as perfisPermissoesController from './perfisPermissoes.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createPerfisPermissoesSchema } from './perfisPermissoes.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'perfis_permissoes:vincular',
		metodo: 'POST',
		modulo: 'rbac',
		rota: 'perfil_permissoes',
		middlewares: [autenticar, autorizar, validate(createPerfisPermissoesSchema)],
		functionExec: perfisPermissoesController.vincular,
		recurso: 'Perfis-Permissões',
		descricao: 'Atribuir permissões aos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis_permissoes:listarVinculos',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfil_permissoes/:perfilId/',
		middlewares: [autenticar, autorizar],
		functionExec: perfisPermissoesController.listarVinculos,
		recurso: 'Perfis-Permissões',
		descricao: 'Listar permissões concedidas aos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis_permissoes:permissoesPerfilAcessos',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfil_permissoes/acessos/:perfilId',
		middlewares: [autenticar],
		functionExec: perfisPermissoesController.permissoesPerfilAcessos,
		recurso: 'Perfis-Permissões',
		descricao: 'Controla os acessos do perfil com base nas permissões concedidas a ele',
		ehPublica: true
	}
];
