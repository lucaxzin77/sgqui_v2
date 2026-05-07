import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const listarFormulacoesLiberadas = async (filtro = '') => {
    try {  
        // const cmdSql = 'SELECT * FROM projeto WHERE nome LIKE ? or descricao LIKE ? ORDER BY updatedAt DESC;';
        const cmdSql = `
        SELECT DISTINCT
            projeto.*,
            IF(produtos.projeto IS NULL, 'true', 'false') AS pendente
        FROM
            produtos
            RIGHT JOIN
            projeto ON produtos.projeto = projeto.id
        WHERE 
        	JSON_EXTRACT(JSON_EXTRACT(projeto.status, '$[0]'),'$.status') = 'Liberado' 
            AND
            (projeto.nome LIKE ? OR projeto.descricao LIKE ?)
        ORDER BY 
            pendente DESC, projeto.updatedAt DESC;
        `;
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao listar formulações liberadas',
            reason: `Falha na execução do SELECT com JOIN entre 'produtos' e 'projeto' para listar formulações com status 'Liberado'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
