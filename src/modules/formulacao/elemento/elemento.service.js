import * as ElementoModel from './elemento.model.js';

export const consultar = async (query={}) => {
    return await ElementoModel.consultar(query);
};

export const consultarPorId = async (id) => {
    return await ElementoModel.consultarPorId(id);
};

export const consultarPorSimbolo = async (simbolo) => {
    return await ElementoModel.consultarPorSimbolo(simbolo);
};
