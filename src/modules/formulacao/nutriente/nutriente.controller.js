import * as nutrienteService from './nutriente.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrada = asyncHandler(async (req, res, next) => {
    const nutriente = req.body; 
    const novoNutriente = await nutrienteService.cadastrar(nutriente);
    return responses.created(res, { data: novoNutriente });
});

export const consultar = asyncHandler(async (req, res, next) => {
    let nome = req.query.nome;
    nome = nome?nome:'';
    const data = await nutrienteService.consultar(nome);
    return responses.success(res, { data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    const data = await nutrienteService.consultarPorId(id);
    return responses.success(res, { data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    const data = await nutrienteService.deletar(id);
    return responses.success(res, { data });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let nutriente = req.body;
    let id = req.params.id;
    const nutrienteAlterado = await nutrienteService.alterar(id, nutriente);
    return responses.success(res, { data: nutrienteAlterado });
});
