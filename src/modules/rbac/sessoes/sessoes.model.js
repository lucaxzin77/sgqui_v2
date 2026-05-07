import pool from "../../../core/database/data.js";
import { AppError } from '../../../core/utils/AppError.js';

export const criar = async ({ usuario = 0, validade = 0, token = '' }) => {
  try {
    const cmdSql = `INSERT INTO sessoes (usuario, token, validade) VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR));`;
    const [rows] = await pool.execute(cmdSql, [usuario, token, validade]);
    return await consultarPorId(rows.insertId);
  }
  catch (error) {
    throw new AppError({
      message: 'Erro ao criar sessão',
      reason: `Falha na execução do INSERT na tabela 'sessoes'; verifique se o usuário informado existe e se os dados de validade são válidos. Detalhe: ${error.message}`,
      code: 500
    });
  }

};


const consultarPorId = async (sessoes_id) => {
  try {
    const cmdSql = "SELECT * FROM sessoes WHERE id = ?;";
    const [rows] = await pool.execute(cmdSql, [sessoes_id]);
    return (rows.length > 0) ? rows[0] : null;
  }
  catch (error) {
    throw new AppError({
      message: 'Erro ao consultar sessão por ID',
      reason: `Falha na execução do SELECT na tabela 'sessoes' filtrando por ID; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

const consultarPorSessaoEUsuario = async (sessoes_id, sessoes_usuario) => {
  try {
    const cmdSql = "SELECT * FROM sessoes WHERE id = ? and usuario = ?;";
    const [rows] = await pool.execute(cmdSql, [sessoes_id, sessoes_usuario]);
    return (rows.length > 0) ? rows[0] : null;
  }
  catch (error) {
    throw new AppError({
      message: 'Erro ao consultar sessão por sessão e usuário',
      reason: `Falha na execução do SELECT na tabela 'sessoes' filtrando por ID de sessão e ID de usuário; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};

export const buscarSessao = async (sessoes_id, sessoes_usuario) => {
  try {
    const sessao = await consultarPorSessaoEUsuario(sessoes_id, sessoes_usuario);
    return sessao;
  }
  catch (error) {
    throw new AppError({
      message: 'Erro ao buscar sessão',
      reason: `Falha ao buscar a sessão ativa; a consulta combinada de ID de sessão e usuário retornou um erro inesperado no banco de dados. Detalhe: ${error.message}`,
      code: 500
    });
  }
};



export const extender = async (sessoes_id, tempo_em_horas) => {
  try {
    const cmdSql = "UPDATE sessoes SET validade = DATE_ADD(validade, INTERVAL ? HOUR) WHERE id = ?;";
    const [rows] = await pool.execute(cmdSql, [tempo_em_horas, sessoes_id]);
    return rows.affectedRows > 0;
  }
  catch (error) {
    throw new AppError({
      message: 'Erro ao extender sessão',
      reason: `Falha na execução do UPDATE na tabela 'sessoes' para extensão do prazo de validade; verifique se o ID de sessão é válido. Detalhe: ${error.message}`,
      code: 500
    });
  }
};
