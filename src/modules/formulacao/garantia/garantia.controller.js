import * as serviceGarantia from './garantia.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const consultarPorNutriente = asyncHandler(async (req, res, next) => {
    const nutrienteId = req.params.nutrienteId;
    const data = await serviceGarantia.consultarPorNutriente(nutrienteId);
    return responses.success(res, { data });
});

export const consultarPorMateria_prima = asyncHandler(async (req, res, next) => {
    const materia_primaId = req.params.materia_primaId;
    const data = await serviceGarantia.consultarPorMateria_prima(materia_primaId);
    return responses.success(res, { data });
});

export const cadastrar = asyncHandler(async (req, res, next) => {
    const garantia = req.body;
    const data = await serviceGarantia.cadastrar(garantia);
    return responses.created(res, {message: 'Garantia cadastrada com sucesso', data });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let garantia = req.body;
    garantia.id = req.params.id;
    const data = await serviceGarantia.alterar(garantia);
    return responses.success(res, {message: 'Garantia atualizada com sucesso', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = await serviceGarantia.deletar(id);
    return responses.success(res, {message: 'Garantia deletada com sucesso', data });
});
