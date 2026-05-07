import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultarPorNutriente = async (nutrienteId) => {    
    try {
        const cmdSql = `SELECT 
            materia_prima.id as materia_prima_Id,
            materia_prima.nome as materia_prima_Nome,
            materia_prima.formula as materia_prima_Formula,
            materia_prima.densidade as materia_prima_Densidade,
            materia_prima.descricao as materia_prima_Descricao,
            materia_prima.cas_number as materia_prima_Cas_number,
            materia_prima.codigo as materia_prima_Codigo,
            garantia.id as garantia_Id,
            garantia.percentual as garantia_Percentual
        FROM 
            materia_prima
        JOIN
            garantia on materia_prima.id = garantia.materia_prima
        WHERE
            garantia.nutriente = ?;`;
        const [dados] = await pool.execute(cmdSql, [nutrienteId]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar garantias por nutriente',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando pelo ID do nutriente; verifique se o nutriente informado existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorMateria_prima = async (materia_primaId) => {
    try {
        const cmdSql = `SELECT
            nutriente.id as nutriente_Id,
            nutriente.nome as nutriente_Nome,
            nutriente.formula as nutriente_Formula,
            garantia.id as garantia_Id,
            garantia.percentual as garantia_Percentual
        FROM
            nutriente
            JOIN
            garantia ON nutriente.id = garantia.nutriente
        WHERE
            garantia.materia_prima = ?;`;
        const [dados] = await pool.execute(cmdSql, [materia_primaId]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar garantias por matéria-prima',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando pelo ID da matéria-prima; verifique se a matéria-prima informada existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const cadastrar = async (garantia={}) => {    
    try {
        const campos = Object.keys(garantia);
        const values = Object.values(garantia);

        const params_cmdSql = campos.join(', ');
        const values_cmdSql = campos.map(() => '?').join(', ');

        const cmdSql = `INSERT INTO garantia (${params_cmdSql}) VALUES (${values_cmdSql});`;
        const [execucao] = await pool.execute(cmdSql, values);
        const lastId = execucao.insertId;

        return await consultarPorId(lastId);
    } 
    catch (error) {
        
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError({
                message: 'Registro duplicado',
                reason: 'Já existe um registro cadastrado com os dados únicos informados.',
                code: 409
            });
        }

        throw new AppError({
            message: 'Erro ao cadastrar garantia',
            reason: `Falha na execução do INSERT na tabela 'garantia'; verifique se o nutriente e a matéria-prima informados existem e se os dados são válidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (garantia={}) => {
    try {

        const keys = Object.keys(garantia);
        const values = Object.values(garantia);
        const setClause = keys.map(k=> `${k} = ?`).join(', ');

        const sql = `UPDATE garantia SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?;`;

        const [result] = await pool.execute(sql, [...values, garantia.id]);
        if(result.affectedRows === 0){
            return null;
        }

        return await consultarPorId(garantia.id);
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar garantia',
            reason: `Falha na execução do UPDATE na tabela 'garantia'; verifique se o registro existe e se os dados fornecidos são compatíveis com o esquema. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultar = async () => {
    try {  
        const cmdSql = 'SELECT * FROM garantia ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar garantias',
            reason: `Falha na execução do SELECT na tabela 'garantia'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM garantia WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0] || null;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar garantia por ID',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando por ID; verifique se o ID fornecido é válido. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorMP = async (mp_id) => {
    try {
        const cmdSql = 'SELECT * FROM garantia WHERE mp_id = ?;';
        const [dados] = await pool.execute(cmdSql, [mp_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar garantia por matéria-prima',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando pelo ID da matéria-prima (consulta MP); verifique se a matéria-prima informada existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM garantia WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar garantia',
            reason: `Falha na execução do DELETE na tabela 'garantia'; o registro pode não existir ou possuir dependências que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
