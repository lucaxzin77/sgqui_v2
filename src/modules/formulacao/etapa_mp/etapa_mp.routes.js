import * as etapa_mp from './etapa_mp.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createEtapaMpSchema, updateEtapaMpSchema } from './etapa_mp.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
	{
		codigo: 'etapa_mp:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'etapa_mp',
		middlewares: [autenticar, autorizar, validate(createEtapaMpSchema)],
		functionExec: etapa_mp.cadastrar,
		recurso: 'Projetos',
		descricao: 'Adicionar matéria-prima à etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:consultarPorId',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'etapa_mp/:id',
		middlewares: [autenticar, autorizar],
		functionExec: etapa_mp.consultarPorId,
		recurso: 'Projetos',
		descricao: 'Visualizar uma matéria-prima especifica presente na etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:consultarPorEtapa',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'etapa_mp/etapa/:id',
		middlewares: [autenticar, autorizar],
		functionExec: etapa_mp.consultarPorEtapa,
		recurso: 'Projetos',
		descricao: 'Visualizar as matérias-primas de uma etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'etapa_mp/:id',
		middlewares: [autenticar, autorizar, validate(updateEtapaMpSchema)],
		functionExec: etapa_mp.alterar,
		recurso: 'Projetos',
		descricao: 'Alterar dados de uma matéria-prima presente em uma etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:alterarOrdem',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'etapa_mp/ordenar/m_p/',
		middlewares: [autenticar, autorizar],
		functionExec: etapa_mp.alterarOrdem,
		recurso: 'Projetos',
		descricao: 'Alterar a ordem das matérias-primas presentes na etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'etapa_mp/:id',
		middlewares: [autenticar, autorizar],
		functionExec: etapa_mp.deletar,
		recurso: 'Projetos',
		descricao: 'Remover matérias-primas de uma etapa',
		ehPublica: false
	}
];
