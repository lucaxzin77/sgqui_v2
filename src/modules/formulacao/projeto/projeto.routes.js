import * as projeto from './projeto.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createProjetoSchema, updateProjetoSchema } from './projeto.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
  {
    codigo: 'projeto:consultar',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'projeto',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.consultar,
    recurso: 'Projetos',
    descricao: 'Visualizar todos os projetos',
    ehPublica: false
  },
  {
    codigo: 'projeto:consultarPorId',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'projeto/:id',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.consultarPorId,
    recurso: 'Projetos',
    descricao: 'Consultar um projeto pelo seu ID',
    ehPublica: false
  },
  {
    codigo: 'projeto:consultarPorCodigo',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'projeto/codigo/:codigo',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.consultarPorCodigo,
    recurso: 'Projetos',
    descricao: 'Consultar um projeto pelo seu código',
    ehPublica: false
  },
  {
    codigo: 'projeto:consultarDetalhado',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'projeto/detalhado/:id',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.consultaDetalhada,
    recurso: 'Projetos',
    descricao: 'Visualizar a formulação detalhada de um projeto',
    ehPublica: false
  },
  {
    codigo: 'projeto:consultarPorData',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'projeto/data/:inicio/:termino',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.consultarPorData,
    recurso: 'Projetos',
    descricao: 'Listar projetos por período',
    ehPublica: false
  },
  {
    codigo: 'projeto:consultarDeletados',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'projeto/list/deletados',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.consultarDeletados,
    recurso: 'Projetos',
    descricao: 'Listar projetos deletados',
    ehPublica: false
  },
  {
    codigo: 'projeto:cadastrar',
    metodo: 'POST',
    modulo: 'formulacao',
		rota: 'projeto',
    middlewares: [autenticar, autorizar, validate(createProjetoSchema)],
    functionExec: projeto.cadastrar,
    recurso: 'Projetos',
    descricao: 'Cadastrar projeto',
    ehPublica: false
  },
  {
    codigo: 'projeto:duplicar',
    metodo: 'POST',
    modulo: 'formulacao',
		rota: 'projeto/:id',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.duplicar,
    recurso: 'Projetos',
    descricao: 'Duplicar projeto',
    ehPublica: false
  },
  {
    codigo: 'projeto:alterar',
    metodo: 'PUT',
    modulo: 'formulacao',
		rota: 'projeto/:id',
    middlewares: [autenticar, autorizar, validate(updateProjetoSchema)],
    functionExec: projeto.alterar,
    recurso: 'Projetos',
    descricao: 'Alterar projeto',
    ehPublica: false
  },
  {
    codigo: 'projeto:addResultado',
    metodo: 'PUT',
    modulo: 'formulacao',
		rota: 'projeto/:id/resultado',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.addResultado,
    recurso: 'Projetos',
    descricao: 'Cadastrar resultados (Acompanhamento)',
    ehPublica: false
  },
  {
    codigo: 'projeto:deletar',
    metodo: 'DELETE',
    modulo: 'formulacao',
		rota: 'projeto/:id',
    middlewares: [autenticar, autorizar],
    functionExec: projeto.deletar,
    recurso: 'Projetos',
    descricao: 'Deletar projeto',
    ehPublica: false
  }
];
