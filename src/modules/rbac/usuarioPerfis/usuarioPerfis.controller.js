import * as usuarioService from './usuarioPerfis.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

// Vincular um perfil com permissoões de acesso ja definidas a um usuario
export const vincular = asyncHandler(async (req, res, next) => { 
  const { usuarioId, perfilId } = req.body;
  const resultado = await usuarioService.vincular(usuarioId, perfilId);
  return responses.success(res, { message: 'Perfil vinculado ao usuário com sucesso', data: resultado });
});

// Desvincular um perfil de um usuário
export const desvincular = asyncHandler(async (req, res, next) => { 
  const vinculoID = req.params.vinculoID;
  const resultado = await usuarioService.desvincular(vinculoID);
  return responses.success(res, { message: 'Usuário desvinculado do perfil com sucesso', data: resultado });
});

// Listar todos os perfis e quais usuários estão vinculados a eles
export const listar = asyncHandler(async (req, res, next) => { 
  const dados = await usuarioService.listar();
  return responses.success(res, { message: 'Perfis e usuários vinculados consultados com sucesso', data: dados });
});

// Listar os perfis vinculados a um usuário específico
export const listarDoUsuarioLogado = asyncHandler(async (req, res, next) => { 
  const usuarioId = req.loginId;
  const dados = await usuarioService.listarPerfisPorUsuario(usuarioId);
  return responses.success(res, { message: 'Perfis do usuário consultados com sucesso', data: dados });
});

// Listar os perfis vinculados a um usuário específico
export const listarPerfisPorUsuario = asyncHandler(async (req, res, next) => { 
  const usuarioId = req.params.usuarioId;
  const dados = await usuarioService.listarPerfisPorUsuario(usuarioId);
  return responses.success(res, { message: 'Perfis do usuário consultados com sucesso', data: dados });
});

// Listar os usuários vinculados a um perfil específico
export const listarUsuariosPorPerfil = asyncHandler(async (req, res, next) => { 
  const perfilId = req.params.perfilId;
  const dados = await usuarioService.listarUsuariosPorPerfil(perfilId);
  return responses.success(res, { message: 'Usuários do perfil consultados com sucesso', data: dados });
});
