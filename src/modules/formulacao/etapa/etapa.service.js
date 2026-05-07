import * as EtapaModel from './etapa.model.js';

export const cadastrar = async (etapa={}) => {
    return await EtapaModel.cadastrar(etapa);
};

export const alterar = async (etapa={}) => {
    return await EtapaModel.alterar(etapa);
};

export const consultar = async (filtro = '') => {
    return await EtapaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await EtapaModel.consultarPorId(id);
};

export const consultarPorNome = async (nome) => {
    return await EtapaModel.consultarPorNome(nome);
};

export const consultarPorProjeto = async (projeto_id) => {
    return await EtapaModel.consultarPorProjeto(projeto_id);
};

export const deletar = async (id) => {
    return await EtapaModel.deletar(id);
};
