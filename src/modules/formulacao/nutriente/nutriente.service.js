import * as NutrienteModel from './nutriente.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome='', formula='', visivel=true }) => {
    const novoNutriente = await NutrienteModel.cadastrar({ nome, formula, visivel });
    if (!novoNutriente) {
        throw new AppError({
            message: 'Erro ao cadastrar nutriente',
            reason: 'Ocorreu um erro ao tentar cadastrar o nutriente no banco de dados.',
            code: 500
        });
    }
    novoNutriente.visivel = novoNutriente.visivel == 1; // Converter para booleano
    return novoNutriente;
};

export const alterar = async (id, nutriente={}) => {    
    const result = await NutrienteModel.alterar(id, nutriente);
    if (!result) {
        throw new AppError({
            message: 'Nutriente não encontrado',
            reason: 'O nutriente com o ID especificado não foi encontrado.',
            code: 404
        });
    }
    result.visivel = result.visivel == 1; // Converter para booleano
    return result;
};

export const consultar = async (filtro = '') => {
    return await NutrienteModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    if (id == null || id.trim() === '') {
        throw new AppError({
            message: 'ID do nutriente é obrigatório',
            reason: "O parâmetro 'id' não foi fornecido ou está vazio; é necessário identificar o nutriente",
            code: 400
        });
    }
    const data = await NutrienteModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            message: 'Nutriente não encontrado',
            reason: 'O nutriente com o ID especificado não foi encontrado.',
            code: 404
        });
    }
    return data;
};

export const consultarPorNome = async (nome) => {
    return await NutrienteModel.consultarPorNome(nome);
};

export const consultarPorFormula = async (formula) => {
    return await NutrienteModel.consultarPorFormula(formula);
};

export const deletar = async (id) => {
    const result = await NutrienteModel.deletar(id);
    if (!result) {
        throw new AppError({
            message: 'Nutriente não encontrado',
            reason: 'O nutriente com o ID especificado não foi encontrado.',
            code: 404
        });
    }
    return result;
};
