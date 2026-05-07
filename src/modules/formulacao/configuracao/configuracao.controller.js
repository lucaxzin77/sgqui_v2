import * as Configuracao from './configuracao.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';


export const cadastrar = asyncHandler(async (req, res, next) => {
    const configuracao = req.body; 
    const result = await Configuracao.cadastrar(configuracao);
    return responses.created(res, { data: result });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let configuracao = req.body;
    configuracao.key = req.params.key;

    const result = await Configuracao.alterar(configuracao, req.loginId);
    return responses.success(res, { data: result });
});

export const consultarPorKey = asyncHandler(async (req, res, next) => {
    const key = req.params.key;
    const result = await Configuracao.consultarPorKey(key);
    return responses.success(res, { data: result });
});

export const consultar = asyncHandler(async (req, res, next) => {
    const key = req.query.key;
    let result;
    if(key){
        result = await Configuracao.consultarPorKey(key);
    }
    else{
        result = await Configuracao.consultar();
    }
    return responses.success(res, { data: result });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let key = req.params.key;
    const result = await Configuracao.deletar(key);
    if(!result){
        return responses.notFound(res, { message: 'Configuração não encontrada' });
    }
    return responses.success(res, { message: 'Configuração deletada com sucesso', data: [] });
});
