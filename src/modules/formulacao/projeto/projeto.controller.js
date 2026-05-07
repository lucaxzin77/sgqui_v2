import * as projetoService from './projeto.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    let projeto = req.body;
    const novoProjeto = await projetoService.cadastrar(projeto,req.loginId);
    return responses.created(res, { message: 'Projeto cadastrado com sucesso', data: novoProjeto });
});

export const consultar = asyncHandler(async (req, res, next) => {
    let nome = req.query.nome;
    let status = req.query.status;
    let filtro_avancado = req.query.filtro_avancado;
    let data;
    if(!filtro_avancado){
        if(nome){
            data = await projetoService.consultar(nome);
        }
        else if(status){
            data = await projetoService.consultarPorStatus(status);
        }
        else{
            data = await projetoService.consultar('');
        }
    }
    else{
        data = await projetoService.consultarFiltroAvacado(filtro_avancado);
    }
    return responses.success(res, { data });
});

export const consultarDeletados = asyncHandler(async (req, res, next) => {
    const data = await projetoService.consultarDeletados();
    return responses.success(res, { data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {    
    let id = req.params.id;
    const data = await projetoService.consultarPorId(id);
    return responses.success(res, { data });
});

export const consultarPorCodigo = asyncHandler(async (req, res, next) => {    
    let codigo = req.params.codigo;
    const data = await projetoService.consultarPorCodigo(codigo);
    return responses.success(res, { data });
});

export const duplicar = asyncHandler(async (req, res, next) => {    
    let id = req.params.id;
    const data = await projetoService.duplicar(id, req.loginId);
    return responses.success(res, { message: 'Projeto duplicado com sucesso', data });
});

export const consultarPorData = asyncHandler(async (req, res, next) => {    
    let inicio = req.params.inicio;
    let termino = req.params.termino;
    const data = await projetoService.consultarPorData(inicio,termino);
    return responses.success(res, { data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    const data = await projetoService.deletar(id, req.loginId);
    return responses.success(res, { message: 'Projeto deletado com sucesso', data });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let projeto = req.body;
    projeto.id = req.params.id;
    const projetoAlterado = await projetoService.alterar(projeto,req.loginId);
    return responses.success(res, { data: projetoAlterado });
});

export const addResultado = asyncHandler(async (req, res, next) => {
    const resultado = req.body;
    const projetoId = req.params.id;
    const responsavelId = req.loginId;

    const data = await projetoService.addResultado(projetoId, responsavelId, resultado);

    return responses.success(res, { data });
});

// *************** Consultas Entre vária entidades ***********************
export const consultaDetalhada = asyncHandler(async (req, res, next) => {    
    let id = req.params.id;               
    const data = await projetoService.consultaDetalhada(id);
    return responses.success(res, { message: 'Detalhes do projeto consultados com sucesso', data });
});
