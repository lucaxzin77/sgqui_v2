import * as serviceMateriaPrima from './materia_prima.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const consultar = asyncHandler(async (req, res, next) => {
    const query = req.query;
    let data = await serviceMateriaPrima.consultar(query);           
    return responses.success(res, { message: "Consulta realizada com sucesso", data });
});



export const consultarPorId = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = await serviceMateriaPrima.consultarPorId(id);
    return responses.success(res, { message: "Consulta realizada com sucesso", data });
});

export const consultarMP_precentual_nutriente = asyncHandler(async (req, res, next) => {
    const nutriente = req.params.nutriente
    const percentual = req.params.percentual;
    const data = await serviceMateriaPrima.consultarMP_precentual_nutriente(nutriente,percentual);
    return responses.success(res, { message: "Consulta realizada com sucesso", data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await serviceMateriaPrima.deletar(id);
    if(!result){
        return responses.notFound(res, { message: "Matéria-prima não encontrada para remoção" });
    }
    return responses.success(res, { message: "Matéria-prima removida com sucesso", data: null });
});

export const cadastrar = asyncHandler(async (req, res, next) => {
    const materia_prima = req.body; 
    const novoMateria_prima= await serviceMateriaPrima.cadastrar(materia_prima);
    return responses.created(res, { message: "Matéria-prima cadastrada com sucesso", data: novoMateria_prima });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let materia_prima = req.body;
    materia_prima.id = req.params.id;
    const materia_primaAlterado = await serviceMateriaPrima.alterar(materia_prima);
    return responses.success(res, { message: "Matéria-prima alterada com sucesso", data: materia_primaAlterado });
});
