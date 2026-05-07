import * as MateriaPrimaModel from './materia_prima.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (query = {}) => {
    const {
        nome,
        formula,
        codigo,
        cas_number,
        nutriente,
        percentual
    } = query;

    let data;

    if(nome){
        data = await MateriaPrimaModel.consultar(nome);
    }
    else if(formula){
        data = await consultarPorFormula(formula);            
    }
    else if(codigo){
        data = await consultarPorCodigo(codigo);
    }
    else if(cas_number){
        data = await consultarPorCas_number(cas_number);
    }
    else if(nutriente && percentual){
        data = await consultarMP_precentual_nutriente(nutriente,percentual);
    }
    else{
        data = await MateriaPrimaModel.consultar();
    }
     if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhuma matéria-prima encontrada',
            reason: 'Nenhuma matéria-prima foi encontrada para o filtro aplicado.',
            code: 404
        });
    }
    return data;
};


export const consultarPorId = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError({
            message: 'ID inválido',
            reason: 'O ID fornecido para consulta de matéria-prima é inválido. Certifique-se de que é um número inteiro positivo.',
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            message: 'Matéria-prima não encontrada',
            reason: `Nenhuma matéria-prima foi encontrada com o ID ${id} informado na base de dados.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorCodigo = async (codigo) => {
    if (!codigo) {
        throw new AppError({
            message: 'Código inválido',
            reason: 'O código fornecido para consulta de matéria-prima é inválido.',
            code: 400
        });
    }
    return await MateriaPrimaModel.consultarPorCodigo(codigo);
};

export const consultarPorCas_number = async (cas_number) => {
    if (!cas_number) {
        throw new AppError({
            message: 'CAS Number inválido',
            reason: 'O CAS Number fornecido para consulta de matéria-prima é inválido.',
            code: 400
        });
    }
    return await MateriaPrimaModel.consultarPorCas_number(cas_number);
};

export const consultarPorFormula = async (formula) => {
    if (!formula) {
        throw new AppError({
            message: 'Fórmula inválida',
            reason: 'A fórmula fornecida para consulta de matéria-prima é inválida.',
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarPorFormula(formula);
    if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhuma matéria-prima encontrada',
            reason: 'Nenhuma matéria-prima foi encontrada para o filtro aplicado.',
            code: 404
        });
    }
    return data;
};

export const consultarMP_precentual_nutriente = async (nutrienteID=0,percentual=0.0) => {
    if (!nutrienteID || isNaN(nutrienteID)) {
        throw new AppError({
            message: 'ID do nutriente inválido',
            reason: 'O ID do nutriente fornecido para consulta é inválido.',
            code: 400
        });
    }
    if (!percentual || isNaN(percentual)) {
        throw new AppError({
            message: 'Percentual inválido',
            reason: 'O percentual fornecido para consulta é inválido.',
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarMP_precentual_nutriente(nutrienteID, percentual);
    if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhuma matéria-prima encontrada',
            reason: 'Nenhuma matéria-prima foi encontrada para o filtro aplicado.',
            code: 404
        });
    }
    return data;
};

export const cadastrar = async (materia_prima) => {
    const novoMateria_prima = await MateriaPrimaModel.cadastrar(materia_prima);
    if (!novoMateria_prima) {
        throw new AppError({
            message: 'Erro ao cadastrar matéria-prima',
            reason: 'Não foi possível cadastrar a matéria-prima. Verifique os dados e tente novamente.',
            code: 500
        });
    }
    return novoMateria_prima;
};

export const alterar = async (materia_prima) => {
    const resultado = await MateriaPrimaModel.alterar(materia_prima);
    if (!resultado) {
        throw new AppError({
            message: 'Matéria-prima não encontrada para atualização',
            reason: `Nenhuma matéria-prima foi encontrada com o ID ${materia_prima.id} informado para atualização na base de dados.`,
            code: 404
        });
    }
    return resultado;
};

export const deletar = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError({
            message: 'ID inválido',
            reason: 'O ID fornecido para remoção de matéria-prima é inválido. Certifique-se de que é um número inteiro positivo.',
            code: 400
        });
    }
    const resultado = await MateriaPrimaModel.deletar(id);
    if (!resultado) {
        throw new AppError({
            message: 'Erro ao deletar matéria-prima',
            reason: 'Não foi possível deletar a matéria-prima. Verifique os dados e tente novamente.',
            code: 500
        });
    }
    return resultado;
};
