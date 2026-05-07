import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const cadastrar = async (usuario) => {
    try{
        const keys = Object.keys(usuario);
        const values = Object.values(usuario);
        const setCollumns = keys.join(', ');
        const setClause = keys.map(k => `?`).join(', ');

        const cmdSql = `INSERT INTO usuario (${setCollumns}) VALUES (${setClause});`;
        const [result] = await pool.execute(cmdSql, values);

        return await consultarPorId(result.insertId);
    }
    catch(error){
        throw new AppError({
            message: 'Erro ao cadastrar usuário',
            reason: `Falha na execução do INSERT na tabela 'usuario'; verifique se já existe um usuário com o mesmo e-mail ou se os dados fornecidos são inválidos. Detalhe: ${error.message}`,
            code: 500
        });
    }

};

export const alterar = async (id, usuario) => {
    try {
        const keys = Object.keys(usuario);
        const values = Object.values(usuario);
        const setClause = keys.map(k => `${k} = ?`).join(', ');

        const sql = `
            UPDATE usuario
            SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ? `;

        await pool.execute(sql, [...values, id]);
        return consultarPorId(id);
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar usuário',
            reason: `Falha na execução do UPDATE na tabela 'usuario'; o ID pode ser inválido ou os dados fornecidos são incompatíveis com o esquema. Detalhe: ${error.message}`,
            code: 500
        });
    }

};

export const consultarPorEmail = async (email) => {
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE email = ?;';
        const [dados] = await pool.execute(cmdSql, [email]);
        return dados[0];
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar usuário por email',
            reason: `Falha na execução do SELECT na tabela 'usuario' filtrando por e-mail; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }

};

export const consultar = async (filtro = '') => {
    try {
        const cmdSql = 'SELECT id, nome, email,  avatar, status, createdAt, updatedAt FROM usuario WHERE nome LIKE ?;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar usuários',
            reason: `Falha na execução do SELECT na tabela 'usuario'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }

};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar usuário por ID',
            reason: `Falha na execução do SELECT na tabela 'usuario' filtrando por ID; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};


export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar usuário',
            reason: `Falha na execução do DELETE na tabela 'usuario'; o registro pode possuir dependências em outras tabelas que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
