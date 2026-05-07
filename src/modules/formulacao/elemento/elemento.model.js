import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (query={}) => {
    try {
        let cmdSql = 'SELECT * FROM elemento;';
        const keys = Object.keys(query);
        const values = Object.values(query);
        const placeholders = keys.map(key => {
            return `${key} LIKE ?`;
        });

        if(placeholders.length > 0){
            cmdSql = `SELECT * FROM elemento WHERE ${placeholders.join(' OR ')};`;
        }
        console.log(cmdSql, values.map(value => `%${value}%`));  
        const [dados] = await pool.execute(cmdSql, values.map(value => `%${value}%`));
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar elementos',
            reason: `Falha na execução do SELECT na tabela 'elementos'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM elemento WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar elemento por ID',
            reason: `Falha na execução do SELECT na tabela 'elementos' filtrando por ID; verifique se o ID fornecido é válido e a conectividade com o banco. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorSimbolo = async (simbolo) => {
    try {
        const cmdSql = 'SELECT * FROM elemento WHERE simbolo = ?;';
        const [dados] = await pool.execute(cmdSql, [simbolo]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar elemento por símbolo',
            reason: `Falha na execução do SELECT na tabela 'elementos' filtrando pelo símbolo químico; verifique se o símbolo fornecido é válido. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

// export const consultarPorNome = async (nome) => {
//     try {
//         const cmdSql = 'SELECT * FROM elemento WHERE nome like ?;';
//         const [dados] = await pool.execute(cmdSql, [nome]);
//         return dados;
//     } 
//     catch (error) {
//         throw error;
//     }
// };

// export const consultarPorSimbolo = async (simbolo) => {
//     try {
//         const cmdSql = 'SELECT * FROM elemento WHERE simbolo like ?;';
//         const [dados] = await pool.execute(cmdSql, [simbolo]);
//         return dados;
//     } 
//     catch (error) {
//         throw error;
//     }
// };


// export const cadastrar = async (elemento={}) => {    
//     try {
//         let valores = [];
//         let campos = '';
//         let placeholders = '';
        
//         for(const key in elemento){
//             campos += `${key},`;            
//             placeholders += '?,';
//             valores.push(elemento[key]);            
//         }
//         campos = campos.slice(0, -1);
//         placeholders = placeholders.slice(0, -1);
//         const cmdSql = `INSERT INTO elemento (${campos}) VALUES (${placeholders});`;        
//         await pool.execute(cmdSql, valores);

//         const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
//         const lastId = result[0].lastId;

//         const [dados] = await pool.execute('SELECT * FROM elemento WHERE id = ?;', [lastId]);
//         return dados;
//     } 
//     catch (error) {
//         throw error;
//     }
// };

// export const alterar = async (elemento={}) => {
//     try {
//         let valores = [];
//         let cmdSql = 'UPDATE elemento SET ';

//         for(const key in elemento){
//             valores.push(elemento[key]);
//             cmdSql += `${key} = ?, `;
//         }

//         cmdSql = cmdSql.replace(', id = ?,', '');
//         cmdSql += 'WHERE id = ?;';
//         const [execucao] = await pool.execute(cmdSql, valores);
//         if(execucao.affectedRows > 0){
//             const [dados] = await pool.execute('SELECT * FROM elemento WHERE id = ?;', elemento.id);
//             return dados;
//         }
//         return [];

//     }
//     catch (error) {
//         throw error;
//     }
// };


// export const deletar = async (id) => {
//     try {
//         const cmdSql = 'DELETE FROM elemento WHERE id = ?;';
//         const [dados] = await pool.execute(cmdSql, [id]);
//         return dados;
//     } 
//     catch (error) {
//         throw error;
//     }
// };
