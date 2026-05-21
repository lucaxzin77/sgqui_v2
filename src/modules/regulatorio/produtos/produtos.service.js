// import * as projetoModel from '../../formulacao/models/Projeto.model.js';
// import { AppError } from '../../../core/utils/AppError.js';

// export const listarFormulacoesLiberadas = async () => {

// };

// export const cadastrar = async ({ nome, descricao = null }) => {
//     if(nome == null || nome.trim() === ''){
//         throw new AppError('Nome do perfil é obrigatório', 400);
//     }
//     return await perfisModel.cadastrar({ nome: nome.trim(), descricao });
// };

// export const addResultado = async (projetoId, responsavelId, resultado={}) => {
//     if(projetoId == null || projetoId.trim() === ''){
//         throw new AppError('ID do projeto é obrigatório', 400);
//     }
//     if(resultado == null || typeof resultado !== 'object'){
//         throw new AppError('Resultado deve ser um objeto', 400);
//     }
//     resultado.id_responsavel = responsavelId;        
//     return await projetoModel.addResultado(projetoId, resultado);        
// };