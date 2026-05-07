// Importa todos os métodos do módulo 'Etapa' da service Etapa.js e os associa ao objeto 'Etapa'.
import * as Etapa from './etapa.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

// Define e exporta uma função assíncrona chamada 'cadastrar' para cadastrar uma nova etapa.
export const cadastrar = asyncHandler(async (req, res, next) => {
    // Obtém o corpo da requisição, que deve conter os dados da nova etapa.
    const etapa = req.body;
    
    // Chama a função 'cadastrar' do módulo 'Etapa' com os dados da nova etapa e aguarda a conclusão.
    const novoEtapa = await Etapa.cadastrar(etapa);
    
    return responses.created(res, { data: novoEtapa });
});

// Define e exporta uma função assíncrona chamada 'consultarPorId' para consultar uma etapa por ID.
export const consultarPorId = asyncHandler(async (req, res, next) => {
    // Obtém o ID dos parâmetros da requisição.
    let id = req.params.id;
    
    // Chama a função 'consultarPorId' do módulo 'Etapa' com o ID e aguarda a conclusão.
    const data = await Etapa.consultarPorId(id);
    
    return responses.success(res, { data });
});

// Define e exporta uma função assíncrona chamada 'consultarPorProjeto' para consultar etapas por ID do projeto.
export const consultarPorProjeto = asyncHandler(async (req, res, next) => {
    // Obtém o ID do projeto dos parâmetros da requisição.
    let id_projeto = req.params.id;
    
    // Chama a função 'consultarPorProjeto' do módulo 'Etapa' com o ID do projeto e aguarda a conclusão.
    const data = await Etapa.consultarPorProjeto(id_projeto);
    
    return responses.success(res, { data });
});

// Define e exporta uma função assíncrona chamada 'deletar' para deletar uma etapa por ID.
export const deletar = asyncHandler(async (req, res, next) => {
    // Obtém o ID dos parâmetros da requisição.
    let id = req.params.id;
    
    // Chama a função 'deletar' do módulo 'Etapa' com o ID e aguarda a conclusão.
    const data = await Etapa.deletar(id);
    
    return responses.success(res, { data });
});

// Define e exporta uma função assíncrona chamada 'alterar' para alterar uma etapa existente.
export const alterar = asyncHandler(async (req, res, next) => {
    // Obtém os dados da etapa do corpo da requisição.
    let etapa = req.body;
    
    // Define o ID da etapa a ser alterada a partir dos parâmetros da requisição.
    etapa.id = req.params.id;
    
    // Chama a função 'alterar' do módulo 'Etapa' com os novos dados da etapa e aguarda a conclusão.
    const etapaAlterada = await Etapa.alterar(etapa);
    
    return responses.success(res, { data: etapaAlterada });
});

// Define e exporta uma função assíncrona chamada 'alterarOrdem' para alterar a ordem das etapas de um projeto.
export const alterarOrdem = asyncHandler(async (req, res, next) => {
    // Obtém um array com a nova ordem das etapas do projeto a partir do corpo da requisição.
    // Exemplo de dados recebidos: {"etapas":[{"id": 2, "ordem": 3}, {"id": 1, "ordem": 2}, {"id": 3, "ordem": 1}]}
    const ordemEtapa = req.body;

    // Chama a função 'alterarOrdem' do módulo 'Etapa' com os dados da nova ordem e aguarda a conclusão.
    const etapasReordenadas = await Etapa.alterarOrdem(ordemEtapa);
    
    const message = Array.isArray(etapasReordenadas) && etapasReordenadas.length === 0
        ? "Nenhuma alteração realizada"
        : undefined;
    return responses.success(res, { data: etapasReordenadas, ...(message ? { message } : {}) });
});
