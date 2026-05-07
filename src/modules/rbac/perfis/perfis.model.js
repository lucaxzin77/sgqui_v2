import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const cadastrar = async ({ nome, descricao = null }) => {
  try {
    const cmdSql = 'INSERT INTO perfis (nome, descricao) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [nome, descricao]);
    return await listarPorId(result.insertId);
  } catch (error) {
    throw new AppError({
      message: 'Erro ao cadastrar perfil',
      reason: `Falha na execução do INSERT na tabela 'perfis'; verifique se já existe um perfil com o mesmo nome ou se os dados fornecidos são inválidos. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

export const listar = async () => {
  try {
    const cmdSql = 'SELECT * FROM perfis ORDER BY nome;';
    const [dados] = await pool.execute(cmdSql);
    return dados;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar perfis',
      reason: `Falha na execução do SELECT na tabela 'perfis'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};


export const listarPorId = async (perfilId) => {
  try {
    const cmdSql = 'SELECT * FROM perfis WHERE id = ?';
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados[0];
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar perfil por ID',
      reason: `Falha na execução do SELECT na tabela 'perfis' filtrando por ID; verifique se o ID fornecido é válido e a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

export const listarPorNome = async (perfilNome) => {
  try {
    const cmdSql = 'SELECT * FROM perfis WHERE nome = ?';
    const [dados] = await pool.execute(cmdSql, [perfilNome]);
    return dados[0];
  } catch (error) {
    throw new AppError({
      message: 'Erro ao listar perfil por nome',
      reason: `Falha na execução do SELECT na tabela 'perfis' filtrando por nome; verifique se o nome fornecido é válido e a conectividade com o banco. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

export const alterar = async (perfilId, dados = { nome:'', descricao:''}) => {
  try {

    const keys = Object.keys(dados);
    const values = Object.values(dados);
    const setClause = keys.map(k => `${k} = ?`).join(', ');

    const sql = `
    UPDATE perfis
    SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ? `;  
    
    await pool.execute(sql, [...values, perfilId]);
    return listarPorId(perfilId);

  } catch (error) {
    throw new AppError({
      message: 'Erro ao alterar perfil',
      reason: `Falha na execução do UPDATE na tabela 'perfis'; o perfil pode não existir ou os dados fornecidos são incompatíveis com o esquema. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

export const remover = async (perfilId) => {
  try {
    const cmdSql = 'DELETE FROM perfis WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [perfilId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new AppError({
      message: 'Erro ao remover perfil',
      reason: `Falha na execução do DELETE na tabela 'perfis'; o perfil pode possuir permissões ou usuários vinculados que impedem a exclusão. Detalhe: ${error.message}`,
      code: 500
    });
  }
};
