import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const listar = async (acesso=undefined) => {
  try {
    const where = acesso ? `WHERE eh_publica = ?` : '';
    let cmdSql = `SELECT * FROM permissoes ${where} ORDER BY modulo, recurso, metodo, rota_template;`;
    const [dados] = await pool.execute(cmdSql, acesso ? [acesso] : []);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar permissões',
      reason: `Falha na execução do SELECT na tabela 'permissoes'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};


export const listarPermissoesPorUsuario = async (usuarioId) => {
  try {
    const sql = `
      SELECT DISTINCT
        p.*
      FROM (
          SELECT 
            permissoes.*
          FROM usuario_perfis
          JOIN perfis
              ON usuario_perfis.perfil_id = perfis.id
          JOIN perfis_permissoes
              ON perfis.id = perfis_permissoes.perfil_id
          JOIN permissoes
              ON perfis_permissoes.permissao_id = permissoes.id
          WHERE usuario_perfis.usuario_id = ?

          UNION ALL

          SELECT
            permissoes.*
          FROM permissoes
          WHERE eh_publica = 1
      ) p
      ORDER BY p.modulo, p.recurso, p.metodo, p.rota_template;
    `;

    const [dados] = await pool.execute(sql, [usuarioId]);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar permissões por usuário',
      reason: `Falha na execução da consulta JOIN entre 'usuario_perfis', 'perfis_permissoes' e 'permissoes' para o usuário informado; verifique a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};
