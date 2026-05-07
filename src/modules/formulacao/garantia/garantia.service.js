import * as GarantiaModel from './garantia.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (garantia={}) => {
    const data = await GarantiaModel.cadastrar(garantia);
    if (!data) {
        throw new AppError({
            message: 'Erro ao cadastrar garantia',
            reason: 'Nenhuma garantia foi cadastrada; verifique os dados enviados e tente novamente.',
            code: 400
        });
    }
    return data;
};

export const consultarPorMateria_prima = async (materia_primaId) => {
    if(isNaN(materia_primaId) || materia_primaId <= 0) {
        throw new AppError({
            message: 'ID da matéria-prima inválido',
            reason: 'O ID da matéria-prima deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.consultarPorMateria_prima(materia_primaId);
    if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhuma garantia encontrada para a matéria-prima informada',
            reason: 'Não há garantias cadastradas para a matéria-prima especificada.',
            code: 404
        });
    }
    return data;
};

export const consultarPorNutriente = async (nutrienteId) => {
    if(isNaN(nutrienteId) || nutrienteId <= 0) {
        throw new AppError({
            message: 'ID do nutriente inválido',
            reason: 'O ID do nutriente deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.consultarPorNutriente(nutrienteId);
    if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhuma garantia encontrada para o nutriente informado',
            reason: 'Não há materiais-primas cadastradas com garantias para o nutriente especificado.',
            code: 404
        });
    }
    return data;
};



export const alterar = async (garantia={}) => {
    if(isNaN(garantia.id) || garantia.id <= 0) {
        throw new AppError({
            message: 'ID da garantia inválido',
            reason: 'O ID da garantia deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.alterar(garantia);
    if (!data) {
        throw new AppError({
            message: 'Erro ao alterar garantia',
            reason: 'Não foi possível alterar a garantia especificada. Verifique se o ID é válido e se a garantia existe.',
            code: 400
        });
    }
    return data;
};

export const consultar = async (filtro = '') => {
    return await GarantiaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await GarantiaModel.consultarPorId(id);
};

export const consultarPorMP = async (mp_id) => {
    if(isNaN(mp_id) || mp_id <= 0) {
        throw new AppError({
            message: 'ID da matéria-prima inválido',
            reason: 'O ID da matéria-prima deve ser um número inteiro positivo.',
            code: 400
        });
    }
    return await GarantiaModel.consultarPorMP(mp_id);
};

export const deletar = async (id) => {
    if(isNaN(id) || id <= 0) {
        throw new AppError({
            message: 'ID da garantia inválido',
            reason: 'O ID da garantia deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.deletar(id);
    if (!data) {
        throw new AppError({
            message: 'Erro ao deletar garantia',
            reason: 'Não foi possível deletar a garantia especificada. Verifique se o ID é válido e se a garantia existe.',
            code: 400
        });
    }
    return data;
};
