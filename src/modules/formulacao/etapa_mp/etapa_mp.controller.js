import * as Etapa_MP from './etapa_mp.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    const etapa_mp = req.body;
    
    const novoEtapa_MP = await Etapa_MP.cadastrar(etapa_mp);
    
    return responses.created(res, { data: novoEtapa_MP });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let etapa_mp = req.body;
    
    etapa_mp.id = req.params.id;
    
    const etapa_mpAlterada = await Etapa_MP.alterar(etapa_mp);
    
    return responses.success(res, { data: etapa_mpAlterada });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    
    const data = await Etapa_MP.consultarPorId(id);
    
    return responses.success(res, { data });
});

export const consultarPorEtapa = asyncHandler(async (req, res, next) => {
    let id_projeto = req.params.id;
    
    const data = await Etapa_MP.consultarPorEtapa(id_projeto);
    
    return responses.success(res, { data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    
    const data = await Etapa_MP.deletar(id);
    
    return responses.success(res, { data });
});

export const alterarOrdem = asyncHandler(async (req, res, next) => {
    const ordemetapa_mp = req.body;
    const ordemetapa_mpReordenadas = await Etapa_MP.alterarOrdem(ordemetapa_mp);        
    const message = Array.isArray(ordemetapa_mpReordenadas) && ordemetapa_mpReordenadas.length === 0
        ? "Nenhuma alteração realizada"
        : undefined;
    return responses.success(res, { data: ordemetapa_mpReordenadas, ...(message ? { message } : {}) });
});
