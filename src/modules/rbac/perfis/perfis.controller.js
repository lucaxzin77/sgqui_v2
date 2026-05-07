import * as perfisService from './perfis.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';


export const cadastrar = asyncHandler(async (req, res, next) => {
    const result = await perfisService.cadastrar(req.body);
    responses.created(res, {
        message: 'Perfil cadastrado com sucesso',
        data: result
    })
});

export const listar = asyncHandler(async (req, res, next) => {
    const result = await perfisService.listar();
    responses.success(res, { 
        message: 'Perfis consultados com sucesso', 
        data: result 
    });
});

export const listarPorId = asyncHandler(async (req, res, next) => {
    const result = await perfisService.listarPorId(req.params.id);    
    responses.success(res, { 
        message: 'Perfil consultado com sucesso', 
        data: result 

    });
});

export const listarPorNome = asyncHandler(async (req, res, next) => {
    const result = await perfisService.listarPorNome(req.params.value);
    responses.success(res, { 
        message: 'Perfil consultado com sucesso', 
        data: result 

    });
});

export const alterar = asyncHandler(async (req, res, next) => {
    const result = await perfisService.alterar(req.params.id, req.body);
    responses.success(res, { 
        message: 'Perfil alterado com sucesso', 
        data: result 
    });
});

export const remover = asyncHandler(async (req, res, next) => {
    await perfisService.remover(req.params.id);
    responses.noContent(res, { message: 'Perfil removido com sucesso' });
});
