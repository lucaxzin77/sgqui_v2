import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const consultarPorId = async (id) => {
  try {
    const cmdSql = 'SELECT * FROM usuario_perfis WHERE id = ?;';
    const [rows] = await pool.execute(cmdSql, [id]);
    return rows[0];
  } catch (error) {
    throw new AppError({
      message: 'Erro ao consultar vínculo de usuário e perfil por ID',
      reason: `Falha na execução do SELECT na tabela 'usuario_perfis' filtrando por ID do vínculo; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

// Vincular um perfil com permissoões de acesso ja definidas ao usuario
export const vincular = async (usuarioId, perfilId) => {
  try {
    const cmdSql = 'INSERT IGNORE INTO usuario_perfis (usuario_id, perfil_id) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [usuarioId, perfilId]);
    return await consultarPorId(result.insertId);
  } catch (error) {
    throw new AppError({
      message: 'Erro ao vincular perfil ao usuário',
      reason: `Falha na execução do INSERT na tabela 'usuario_perfis'; verifique se o usuário e o perfil informados existem ou se o vínculo já existe. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

// Desvincular um perfil de um usuário
export const desvincular = async (vinculoID) => {
  try {
    const cmdSql = 'DELETE FROM usuario_perfis WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [vinculoID]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao desvincular perfil de usuário',
      reason: `Falha na execução do DELETE na tabela 'usuario_perfis'; verifique se o ID do vínculo é válido e existe na base de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

// Listar todos os perfis e quais usuários estão vinculados a eles
export const listar = async () => {
  try {
    const cmdSql = `
        SELECT
            up.id as vinculo_id,
            p.id as perfil_id,
            p.nome as perfil_nome,
            p.descricao as perfil_descricao,
            u.id as usuario_id, 
            u.nome as usuario_nome, 
            u.email as usuario_email, 
            u.avatar as usuario_avatar, 
            u.status as usuario_status     
        FROM
            usuario as u
            JOIN
            usuario_perfis as up ON u.id = up.usuario_id
            JOIN
            perfis as p ON up.perfil_id = p.id
            ORDER BY p.nome, u.nome; 
    `;
    const [dados] = await pool.execute(cmdSql);
    return dados;
  }
  catch (error) {
    throw new AppError({
      message: 'Erro ao listar vínculos de usuários por perfis',
      reason: `Falha na execução da consulta JOIN entre 'usuario', 'usuario_perfis' e 'perfis'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

// Listar os perfis vinculados a um usuário específico
export const listarPerfisPorUsuario = async (usuarioId) => {
  try {
    const cmdSql = `
      SELECT up.id as vinculo_id, p.id, p.nome, p.descricao
      FROM usuario_perfis up
      JOIN perfis p ON p.id = up.perfil_id
      WHERE up.usuario_id = ?
      ORDER BY p.nome;
    `;
    const [dados] = await pool.execute(cmdSql, [usuarioId]);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar perfis por usuário',
      reason: `Falha na execução do SELECT com JOIN entre 'usuario_perfis' e 'perfis' para o usuário informado; verifique a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

// Listar os usuários vinculados a um perfil específico
export const listarUsuariosPorPerfil = async (perfilId) => {
  try {
    const cmdSql = `
      SELECT up.id as vinculo_id, u.id, u.nome, u.email, u.avatar, u.status
      FROM usuario_perfis up
      JOIN usuario u ON u.id = up.usuario_id
      WHERE up.perfil_id = ?
      ORDER BY u.nome;
    `;
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar usuários por perfil',
      reason: `Falha na execução do SELECT com JOIN entre 'usuario_perfis' e 'usuario' para o perfil informado; verifique a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};
