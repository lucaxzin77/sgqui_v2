import * as permissoesService from './permissoes.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const listarTodas = asyncHandler(async (req, res, next) => { 
  const data = await permissoesService.listarTodas();
  return responses.success(res, {
    message: 'Permissões consultadas com sucesso', 
    data 
  });
});

export const listarDisponiveisParaVinculacao = asyncHandler(async (req, res, next) => { 
  const data = await permissoesService.listarTodas("0");
  return responses.success(res, {
    message: 'Permissões consultadas com sucesso', 
    data 
  });
});

export const listarDoUsuarioLogado = asyncHandler(async (req, res, next) => { 
  const usuarioId = req.loginId;
  const data = await permissoesService.listarPermissoesPorUsuario(usuarioId);   
    return responses.success(res, {
        message: 'Permissões do usuário logado consultadas com sucesso',
        data
    });
});

export const listarPermissoesPorUsuario = asyncHandler(async (req, res, next) => { 
  const usuarioId = req.params.usuarioId;
  const data = await permissoesService.listarPermissoesPorUsuarioDetalhada(usuarioId);   
    return responses.success(res, {
        message: 'Permissões do usuário consultadas com sucesso',
        data
    });
});
