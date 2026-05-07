import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

// Vincular uma lista de permissões a um perfil
export const vincular = async (perfilId, permissoesIds = []) => {
  try {    
    // Apagar vinculos antigos antes de revincular
    const cmdDelete = `DELETE FROM perfis_permissoes WHERE perfil_id = ?;`;
    await pool.execute(cmdDelete, [perfilId]);

    const values = permissoesIds.map(() => '(?, ?)').join(', ');
    const params = [];
    for (const permissaoId of permissoesIds) {
      params.push(perfilId, permissaoId);
    }

    const cmdSql = `INSERT IGNORE INTO perfis_permissoes (perfil_id, permissao_id) VALUES ${values};`;
    const [result] = await pool.execute(cmdSql, params);
    return result.affectedRows;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao vincular permissões ao perfil',
      reason: `Falha ao sincronizar permissões do perfil; o DELETE das vinculações antigas ou o INSERT das novas falhou no banco de dados — verifique se o perfil e as permissões informadas existem. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

// Listar as permissões vinculadas a um perfil específico
export const listarVinculos = async (perfilId) => {
  try {
    let cmdSql = `
      SELECT    
        permissoes.*
      FROM
        perfis_permissoes
        JOIN
        permissoes ON perfis_permissoes.permissao_id = permissoes.id
      WHERE perfis_permissoes.perfil_id = ?
      ORDER BY 
        permissoes.recurso, permissoes.metodo, permissoes.rota_template;
    `;
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar permissões de perfil',
      reason: `Falha na execução do SELECT com JOIN entre 'perfis_permissoes' e 'permissoes' para o perfil informado; verifique a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};


export const permissoesPerfilAcessos = async (perfilId) => {
  try {
    const sql = `
      SELECT DISTINCT
        p.*
      FROM (
          SELECT 
            permissoes.*
          FROM 
            perfis_permissoes
              JOIN 
            permissoes ON perfis_permissoes.permissao_id = permissoes.id
          WHERE 
            perfis_permissoes.perfil_id = ?

          UNION ALL

          SELECT
            permissoes.*
          FROM permissoes
          WHERE eh_publica = 1
      ) p
      ORDER BY p.metodo, p.rota_template;
    `;

    const [dados] = await pool.execute(sql, [perfilId]);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar acessos de permissões do perfil',
      reason: `Falha na execução da consulta UNION entre permissões vinculadas ao perfil e permissões públicas; verifique a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};
