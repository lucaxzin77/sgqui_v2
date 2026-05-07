import * as info from './info.controller.js';

export default [
	{
		codigo: 'endpoints:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'endpoints',
		functionExec: info.endpoints,
		recurso: 'Info',
		descricao: 'Obtém a lista de endpoints da API.',
		ehPublica: true
	}
];
