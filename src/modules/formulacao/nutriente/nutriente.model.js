import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome='', formula='', visivel=true }) => {    
    try {
        const cmdSql = 'INSERT INTO nutriente (nome, formula, visivel) VALUES (?, ?, ?);';
        const [result] = await pool.execute(cmdSql, [nome, formula, visivel]);
        return await consultarPorId(result.insertId);   
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar nutriente',
            reason: `Falha na execução do INSERT na tabela 'nutrientes'; verifique se há duplicidade de nome ou fórmula, ou se os dados fornecidos são inválidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (id, nutriente={}) => {
    try {

        const keys = Object.keys(nutriente);
        const values = Object.values(nutriente);
        const setClause = keys.map(k => `${k} = ?`).join(', ');

        const sql = `
        UPDATE nutriente
        SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ? `;  
        
        const [result] = await pool.execute(sql, [...values, id]);
        if(result.affectedRows === 0){
            return null;
        }

        return await consultarPorId(id);

    } catch (error) {
        throw new AppError({
            message: 'Erro ao alterar nutriente',
            reason: `Falha na execução do UPDATE na tabela 'nutrientes'; verifique se o ID fornecido existe e se os dados são compatíveis com o esquema. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM nutriente WHERE nome LIKE ? or formula LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar nutrientes',
            reason: `Falha na execução do SELECT na tabela 'nutrientes'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar nutriente por ID',
            reason: `Falha na execução do SELECT na tabela 'nutrientes' filtrando por ID; verifique se o ID fornecido é válido. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar nutriente por nome',
            reason: `Falha na execução do SELECT na tabela 'nutrientes' filtrando pelo nome; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorFormula = async (formula) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE formula like ?;';
        const [dados] = await pool.execute(cmdSql, [formula]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar nutriente por fórmula',
            reason: `Falha na execução do SELECT na tabela 'nutrientes' filtrando pela fórmula química; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM nutriente WHERE id = ?;';
        const [result] = await pool.execute(cmdSql, [id]);
        return result.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar nutriente',
            reason: `Falha na execução do DELETE na tabela 'nutrientes'; o registro pode não existir ou possuir garantias vinculadas que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
