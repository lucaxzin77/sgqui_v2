import * as perfisModel from './perfis.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome, descricao = null }) => {
    if(nome == null || nome.trim() === ''){
        throw new AppError({
            message: 'Nome do perfil é obrigatório',
            reason: 'O campo "nome" é obrigatório e não pode ser vazio. Verifique os dados fornecidos e tente novamente.',
            code: 400
        });
    }
    return await perfisModel.cadastrar({ nome: nome.trim(), descricao });
};

export const listar = async () => {
    const perfis = await perfisModel.listar();
    if(!perfis || perfis.length === 0){
        throw new AppError({
            message: 'Nenhum perfil encontrado',
            reason: 'Não há perfis cadastrados no sistema.',
            code: 404
        });
    }
    return perfis;
};


export const listarPorId = async (perfilId) => {
    const perfilIdNumber = Number(perfilId);
    if (!perfilIdNumber) {
        throw new AppError({
            message: 'perfilId inválido',
            reason: 'O ID do perfil é inválido. Verifique os dados fornecidos e tente novamente.',
            code: 400
        });
    }
    const perfil = await perfisModel.listarPorId(perfilIdNumber);
    if(!perfil){
        throw new AppError({
            message: 'Perfil não encontrado',
            reason: `Nenhum perfil encontrado com o ID '${perfilIdNumber}'. Verifique se o ID está correto e tente novamente.`,
            code: 404
        });
    }
    return perfil;
};

export const listarPorNome = async (perfilNome) => {
    if (!perfilNome || perfilNome.trim() === '') {
        throw new AppError({
            message: 'Nome do perfil inválido',
            reason: 'O nome do perfil é inválido. Verifique os dados fornecidos e tente novamente.',
            code: 400
        });
    }
    const perfil = await perfisModel.listarPorNome(perfilNome.trim());
    if(!perfil){
        throw new AppError({
            message: 'Perfil não encontrado',
            reason: `Nenhum perfil encontrado com o nome '${perfilNome.trim()}'. Verifique se o nome está correto e tente novamente.`,
            code: 404
        });
    }
    return perfil;
};

export const alterar = async (perfilId, dados = { nome:'', descricao:''}) => {
    const perfilIdNumber = Number(perfilId);
    const nome = dados.nome.trim() ?? undefined;
    const descricao = dados.descricao.trim() ?? undefined; 

    if (!perfilIdNumber) {
        throw new AppError({
            message: 'perfilId inválido',
            reason: 'O ID do perfil é inválido. Verifique os dados fornecidos e tente novamente.',
            code: 400
        });
    }
    
    const atualizado = await perfisModel.alterar(perfilIdNumber, { nome, descricao });
    if(!atualizado){
        throw new AppError({
            message: 'Perfil não encontrado',
            reason: `Nenhum perfil encontrado com o ID '${perfilIdNumber}'. Verifique se o ID está correto e tente novamente.`,
            code: 404
        });
    }
    return atualizado;
};

export const remover = async (perfilId) => {
    const perfilIdNumber = Number(perfilId); 
    if (!perfilIdNumber) {
        throw new AppError({
            message: 'perfilId inválido',
            reason: 'O ID do perfil é inválido. Verifique os dados fornecidos e tente novamente.',
            code: 400
        });
    }
    const removido = await perfisModel.remover(perfilIdNumber);
    if(!removido){
        throw new AppError({
            message: 'Perfil não encontrado',
            reason: `Nenhum perfil encontrado com o ID '${perfilIdNumber}'. Verifique se o ID está correto e tente novamente.`,
            code: 404
        });
    }
    return removido;
};
