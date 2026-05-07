import * as produtos from '../controllers/produtos.controllers.js';

export default [
  {
    codigo: 'produtos:consultar',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'produtos',
    functionExec: produtos.listarFormulacoesLiberadas,
    recurso: 'Produtos',
    descricao: 'Fistar formulação liberadas para cadastro',
    ehPublica: false
  },
  // {
  //   codigo: 'projeto:consultarPorId',
  //   metodo: 'GET',
  //   modulo: 'formulacao',
	//	rota: 'projeto/:id',
  //   functionExec: projeto.consultarPorId,
  //   recurso: 'Projetos',
  //   descricao: 'Consultar um projeto pelo seu ID',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:consultarPorCodigo',
  //   metodo: 'GET',
  //   modulo: 'formulacao',
	//	rota: 'projeto/codigo/:codigo',
  //   functionExec: projeto.consultarPorCodigo,
  //   recurso: 'Projetos',
  //   descricao: 'Consultar um projeto pelo seu código',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:consultarDetalhado',
  //   metodo: 'GET',
  //   modulo: 'formulacao',
	//	rota: 'projeto/detalhado/:id',
  //   functionExec: projeto.consultaDetalhada,
  //   recurso: 'Projetos',
  //   descricao: 'Visualizar a formulação detalhada de um projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:consultarPorData',
  //   metodo: 'GET',
  //   modulo: 'formulacao',
	//	rota: 'projeto/data/:inicio/:termino',
  //   functionExec: projeto.consultarPorData,
  //   recurso: 'Projetos',
  //   descricao: 'Listar projetos por período',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:cadastrar',
  //   metodo: 'POST',
  //   modulo: 'formulacao',
	//	rota: 'projeto',
  //   functionExec: projeto.cadastrar,
  //   recurso: 'Projetos',
  //   descricao: 'Cadastrar projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:duplicar',
  //   metodo: 'POST',
  //   modulo: 'formulacao',
	//	rota: 'projeto/:id',
  //   functionExec: projeto.duplicar,
  //   recurso: 'Projetos',
  //   descricao: 'Duplicar projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:alterar',
  //   metodo: 'PUT',
  //   modulo: 'formulacao',
	//	rota: 'projeto/:id',
  //   functionExec: projeto.alterar,
  //   recurso: 'Projetos',
  //   descricao: 'Alterar projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:addResultado',
  //   metodo: 'PUT',
  //   modulo: 'formulacao',
	//	rota: 'projeto/:id/resultado',
  //   functionExec: projeto.addResultado,
  //   recurso: 'Projetos',
  //   descricao: 'Cadastrar resultados (Acompanhamento)',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:deletar',
  //   metodo: 'DELETE',
  //   modulo: 'formulacao',
	//	rota: 'projeto/:id',
  //   functionExec: projeto.deletar,
  //   recurso: 'Projetos',
  //   descricao: 'Deletar projeto',
  //   ehPublica: false
  // }

];