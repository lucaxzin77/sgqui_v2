import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in etapa){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(etapa[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO etapa (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM etapa WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar etapa',
            reason: `Falha na execução do INSERT na tabela 'etapas'; verifique se o projeto informado existe e se os dados fornecidos são válidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (etapa={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE etapa SET ';

        for(const key in etapa){
            valores.push(etapa[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM etapa WHERE id = ?;', etapa.id);
            return dados;
        }
        return [];

    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar etapa',
            reason: `Falha na execução do UPDATE na tabela 'etapas'; verifique se o registro existe e se os dados fornecidos são compatíveis com o esquema. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM etapa WHERE nome LIKE ? or descricao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapas',
            reason: `Falha na execução do SELECT na tabela 'etapas'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapa por ID',
            reason: `Falha na execução do SELECT na tabela 'etapas' filtrando por ID; verifique se o ID fornecido é válido e a conectividade com o banco. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapa por nome',
            reason: `Falha na execução do SELECT na tabela 'etapas' filtrando pelo nome; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorProjeto = async (projeto_id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE projeto_id = ?;';
        const [dados] = await pool.execute(cmdSql, [projeto_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapas por projeto',
            reason: `Falha na execução do SELECT na tabela 'etapas' filtrando pelo ID do projeto; verifique se o projeto informado existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar etapa',
            reason: `Falha na execução do DELETE na tabela 'etapas'; o registro pode não existir ou possuir etapas de matéria-prima vinculadas que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
