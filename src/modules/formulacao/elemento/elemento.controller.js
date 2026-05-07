import * as Elemento from './elemento.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';



export const consultar = asyncHandler(async (req, res, next)=>{
        const query = req.query;
        let data = await Elemento.consultar(query);
        return responses.success(res, { message: 'Elementos consultados com sucesso', data });
});

export const consultarPorId = asyncHandler(async (req, res, next)=>{
        let id = req.params.id;
        let data = await Elemento.consultarPorId(id);
        return responses.success(res, { message: 'Elemento consultado com sucesso', data });
});

export const consultarPorSimbolo = asyncHandler(async (req, res, next)=>{
        let simbolo = req.params.simbolo;
        let data = await Elemento.consultarPorSimbolo(simbolo);
        return responses.success(res, { message: 'Elemento consultado com sucesso', data });
});

