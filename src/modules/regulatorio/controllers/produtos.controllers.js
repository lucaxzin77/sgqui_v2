import * as produtosService from '../services/produtos.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const listarFormulacoesLiberadas = asyncHandler(async (req, res, next) => {
    const data = await produtosService.listarFormulacoesLiberadas();
    return responses.success(res, { data });
});


// export const consultarPorId = async (req, res)=>{    
//     try {
//         let id = req.params.id;
//         const data = await Projeto.consultarPorId(id);
//         return responses.success(res, { data });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

// export const consultarPorCodigo = async (req, res)=>{    
//     try {
//         let codigo = req.params.codigo;
//         const data = await Projeto.consultarPorCodigo(codigo);
//         return responses.success(res, { data });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

// export const duplicar = async (req, res)=>{    
//     try {
//         let id = req.params.id;
//         const data = await Projeto.duplicar(id);
//         const message = Array.isArray(data) && data.length === 0
//             ? "Projeto base não encontrado"
//             : undefined;
//         return responses.success(res, { data, ...(message ? { message } : {}) });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

// export const consultarPorData = async (req, res)=>{    
//     try {
//         let inicio = req.params.inicio;
//         let termino = req.params.termino;
//         const data = await Projeto.consultarPorData(inicio,termino);
//         return responses.success(res, { data });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

// export const deletar = async (req, res)=>{
//     try {
//         let id = req.params.id;
//         const data = await Projeto.deletar(id);
//         return responses.success(res, { data });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

// export const cadastrar = async (req, res)=>{
//     try {
//         let projeto = req.body;
//         const novoProjeto = await Projeto.cadastrar(projeto,req.loginId);
//         return responses.created(res, { data: novoProjeto });
//     } catch (error) {
//         return responses.error(res,{ message: error.message });
//     }
// }

// export const alterar = async (req, res)=>{
//     try {
//         let projeto = req.body;
//         projeto.id = req.params.id;
//         const projetoAlterado = await Projeto.alterar(projeto,req.loginId);
//         return responses.success(res, { data: projetoAlterado });
//     } catch (error) {
//         return responses.error(res,{ message: error.message });
//     }
// }



// // *************** Consultas Entre vária entidades ***********************
// export const consultaDetalhada = async (req, res)=>{    
//     try {
//         let id = req.params.id;               
//         const data = await Projeto.consultaDetalhada(id);
//         return responses.success(res, { data });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

