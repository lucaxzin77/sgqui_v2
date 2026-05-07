import * as EtapaMPModel from './etapa_mp.model.js';

export const cadastrar = async (etapa_mp={}) => {
    return await EtapaMPModel.cadastrar(etapa_mp);
};

export const alterar = async (etapa_mp={}) => {
    return await EtapaMPModel.alterar(etapa_mp);
};

export const consultar = async (filtro = '') => {
    return await EtapaMPModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await EtapaMPModel.consultarPorId(id);
};

export const consultarPorEtapa = async (etapa_id) => {
    return await EtapaMPModel.consultarPorEtapa(etapa_id);
};

export const deletar = async (id) => {
    return await EtapaMPModel.deletar(id);
};
