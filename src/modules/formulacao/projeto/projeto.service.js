import * as projetoModel from './projeto.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (projetoData={}, loginId=0) => {
    const data = await projetoModel.cadastrar(projetoData, loginId);
    if (!data) {
        throw new AppError({
            message: 'Erro ao cadastrar projeto',
            reason: 'Ocorreu um erro ao tentar cadastrar o projeto no banco de dados. Verifique os dados fornecidos e tente novamente.',
            code: 500
        });
    }
    return data;
};


export const duplicar = async (id, loginId) => {
    const data = await projetoModel.duplicar(id, loginId);
    if (!data) {
        throw new AppError({
            message: 'Erro ao duplicar projeto',
            reason: 'Ocorreu um erro ao tentar duplicar o projeto no banco de dados. Verifique se o ID do projeto origem existe e se a procedure está criada.',
            code: 500
        });
    }
    return data;
};


export const addResultado = async (projetoId, responsavelId, resultado={}) => {
    if(projetoId == null || projetoId.trim() === ''){
        throw new AppError({
            message: 'ID do projeto é obrigatório',
            reason: "O parâmetro 'projetoId' não foi fornecido ou está vazio; é necessário identificar o projeto ao qual o resultado será vinculado",
            code: 400
        });
    }
    if(resultado == null || typeof resultado !== 'object'){
        throw new AppError({
            message: 'Resultado deve ser um objeto',
            reason: "O campo 'resultado' deve ser um objeto com os dados do resultado a ser adicionado ao projeto",
            code: 400
        });
    }
    resultado.id_responsavel = responsavelId;        
    return await projetoModel.addResultado(projetoId, resultado);        
};

export const consultar = async (filtro = '') => {
    return await projetoModel.consultar(filtro);
};

export const consultarDeletados = async () => {
    return await projetoModel.consultarDeletados();
};

export const consultarFiltroAvacado = async (filtro = []) => {
    return await projetoModel.consultarFiltroAvacado(filtro);
};


export const consultarPorId = async (id) => {
    return await projetoModel.consultarPorId(id);
};

export const consultarPorCodigo = async (codigo) => {
    return await projetoModel.consultarPorCodigo(codigo);
};

export const consultarPorData = async (data_inicio="", data_termino="") => {
    return await projetoModel.consultarPorData(data_inicio, data_termino);
};

export const consultarPorStatus = async (status='') => {
    return await projetoModel.consultarPorStatus(status);
};

export const deletar = async (id, loginId) => {
    const cacheProjetoDeletado = await consultaDetalhada(id);
    const result = await projetoModel.deletar(id, loginId);
    if(result === false){
        throw new AppError({
            message: 'Erro ao deletar projeto',
            reason: 'Ocorreu um erro ao tentar deletar o projeto no banco de dados. Verifique se o projeto possui etapas ou resultados vinculados e tente novamente.',
            code: 500
        });
    }
    if(result){
        await projetoModel.auditarProjetoDelete(cacheProjetoDeletado, loginId);
    }
    return result;
};

export const consultaDetalhada = async (id) => {
    const data = await projetoModel.consultaDetalhada(id);
    if (data.length === 0) {
        throw new AppError({
            message: 'Projeto não encontrado',
            reason: 'Não existe um projeto com o ID fornecido. Verifique o ID e tente novamente.',
            code: 404
        });
    }
    return estruturarProjeto(data);
};

const estruturarProjeto = (dados) => {
    let projetos = [];
    const addProjeto = (projeto = {}) => {
        let projetoExistente = projetos.find(p => p.id === projeto.projeto_id);
        if (!projetoExistente) {
            projetoExistente = {
                "id": projeto.projeto_id,
                "codigo": projeto.projeto_codigo,
                "nome": projeto.projeto_nome,
                "cliente": projeto.projeto_cliente,
                "descricao": projeto.projeto_descricao,
                "data_inicio": projeto.projeto_data_inicio,
                "data_termino": projeto.projeto_data_termino,
                "densidade": projeto.projeto_densidade,
                "ph": projeto.projeto_ph,
                "tipo": projeto.projeto_tipo,
                "aplicacao": projeto.projeto_aplicacao,
                "natureza_fisica": projeto.projeto_natureza_fisica,
                "status": projeto.projeto_status,
                "resultado": projeto.projeto_resultado,
                "etapas": [],
                "nutrientes": [],
                "percentual_concluido": 0,
                "dencidade_estimada": 0,
                "createdAt": projeto.projeto_createdAt,
                "updatedAt": projeto.projeto_updatedAt

            };
            projetos.push(projetoExistente);
        }
        return projetoExistente;
    }

    const addEtapasProjeto = (etapa, projeto) => {       
        let etapaExistente = projeto.etapas.find(e => e.id === etapa.etapa_id);
        if (!etapaExistente) {
            etapaExistente = {
                "id": etapa.etapa_id,
                "nome": etapa.etapa_nome,
                "descricao": etapa.etapa_descricao,
                "ordem": etapa.etapa_ordem,
                "etapa_mp": []
            };
            if(etapaExistente.id){
                projeto.etapas.push(etapaExistente);    
            }
        }
        return etapaExistente;        
    }

    const addEtapa_MpEtapas = (etapa_mp, etapa, projeto) => {
        if (etapa_mp.etapa_mp_id) {
            let etapa_MpExistente = etapa.etapa_mp.find(e_mp => e_mp.id === etapa_mp.etapa_mp_id);
            if (!etapa_MpExistente) {
                etapa.etapa_mp.push({
                    "id": etapa_mp.etapa_mp_id,
                    "mp_id": etapa_mp.materia_prima_id,
                    "mp_codigo": etapa_mp.materia_prima_codigo,
                    "materia_prima": etapa_mp.materia_prima_nome,
                    "percentual": etapa_mp.etapa_mp_percentual,
                    "tempo_agitacao": etapa_mp.etapa_mp_tempo_agitacao,
                    "observacao": etapa_mp.etapa_mp_observacao,
                    "lote": etapa_mp.etapa_mp_lote,
                    "ordem": etapa_mp.etapa_mp_ordem
                });
                projeto.dencidade_estimada += etapa_mp.parcial_densidade || 0;
            }
        }
    }

    const addNutrientes = (nutriente, projeto) => {
        if (nutriente.nutriente_id) {
            let index_nutriente = projeto.nutrientes.findIndex(n => n.id === nutriente.nutriente_id);
            if (index_nutriente === -1) {
                projeto.nutrientes.push({
                    "id": nutriente.nutriente_id,
                    "nome": nutriente.nutriente_nome,
                    "formula": nutriente.nutriente_formula,
                    "visivel": nutriente.nutriente_visivel,
                    "percentual": nutriente.percentual_origem,
                    "origem": [{
                        "mp": nutriente.materia_prima_nome,
                        "percentual": nutriente.percentual_origem
                    }]
                });
            } else {
                projeto.nutrientes[index_nutriente].percentual += nutriente.percentual_origem;
                projeto.nutrientes[index_nutriente].origem.push({
                    "mp": nutriente.materia_prima_nome,
                    "percentual": nutriente.percentual_origem
                });
            }
        }
    };

    if (dados) {
        for (const elemento of dados) {
            let projeto_referenciado = addProjeto(elemento);
            let etapa_referenciada = addEtapasProjeto(elemento, projeto_referenciado);
            addEtapa_MpEtapas(elemento, etapa_referenciada, projeto_referenciado);
            addNutrientes(elemento, projeto_referenciado);
            // Atualizar percentual_concluido e densidade_estimada
            projeto_referenciado.percentual_concluido = projeto_referenciado.etapas.reduce((total, etapa) => 
                total + etapa.etapa_mp.reduce((subtotal, mp) => subtotal + mp.percentual, 0), 0);
        }
    }
    return projetos[0] || {};
};
