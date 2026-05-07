import * as UsuarioPerfisModel from './usuarioPerfis.model.js';
import { AppError } from '../../../core/utils/AppError.js';

// Vincular um perfil com permissoões de acesso ja definidas a um usuario
export const vincular = async (usuarioId, perfilId) => {
  const usuarioIdNum = Number(usuarioId);
  const perfilIdNum = Number(perfilId); 
  const vinculou = await UsuarioPerfisModel.vincular(usuarioIdNum, perfilIdNum);
  if (!vinculou) {
    throw new AppError({
      message: 'Não foi possível vincular o usuário ao perfil, verifique se ambos existem e se o vínculo já não existe',
      code: 400
    });
  }
  return vinculou;
};

// Desvincular um perfil de um usuário
export const desvincular = async (vinculoID) => {
  const vinculoIdNum = Number(vinculoID);
  
  const desvinculou = await UsuarioPerfisModel.desvincular(vinculoIdNum);
  if (!desvinculou) {
    throw new AppError({
      message: 'Vínculo não encontrado',
      code: 404
    });
  }
  return desvinculou;
};

// Listar todos os perfis e quais usuários estão vinculados a eles
export const listar = async () => {
  const dados = await UsuarioPerfisModel.listar();
  if (!dados || dados.length === 0) {
    throw new AppError({
      message: 'Nenhum perfil vinculado a usuários encontrado',
      code: 404
    });
  }
  const resultado = dados.reduce((acc, item) => {
    const perfilId = item.perfil_id;
    if (!acc[perfilId]) {
      acc[perfilId] = {
        perfil: {
          id: item.perfil_id,
          nome: item.perfil_nome,
          descricao: item.perfil_descricao
        },
        usuarios: []
      };
    }
    acc[perfilId].usuarios.push({
      vinculoId: item.vinculo_id,
      usuarioId: item.usuario_id,
      nome: item.usuario_nome,
      email: item.usuario_email,
      avatar: item.usuario_avatar,
      status: item.usuario_status
    });
    return acc;
  }, {});

  return Object.values(resultado);
};

// Listar os perfis vinculados a um usuário específico
export const listarPerfisPorUsuario = async (usuarioId) => {
  const usuarioIdNum = Number(usuarioId);
  const dados = await UsuarioPerfisModel.listarPerfisPorUsuario(usuarioIdNum);
  if (!dados || dados.length === 0) {
    throw new AppError({
      message: 'Nenhum perfil vinculado ao usuário encontrado',
      code: 404
    });
  }
  return dados;
};

export const listarPerfisDoUsuarioAutenticado = async (usuarioId) => {
  const usuarioIdNum = Number(usuarioId);
  return await UsuarioPerfisModel.listarPerfisPorUsuario(usuarioIdNum);
};

export const listarNomesPerfisDoUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);    
    const perfis = await UsuarioPerfisModel.listarPerfisPorUsuario(usuarioIdNumber);
    return perfis.map((r) => r.nome);
};

// Listar os usuários vinculados a um perfil específico
export const listarUsuariosPorPerfil = async (perfilId) => {
  const perfilIdNum = Number(perfilId); 
  const dados = await UsuarioPerfisModel.listarUsuariosPorPerfil(perfilIdNum);
  if (!dados || dados.length === 0) {
    throw new AppError({
      message: 'Nenhum usuário vinculado ao perfil',
      code: 404
    });
  }
  return dados;
};
