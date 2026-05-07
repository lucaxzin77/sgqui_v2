import * as perfisPermissoes from "./perfisPermissoes.service.js";
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

// Vincular permissões a um perfil
export const vincular = asyncHandler(async (req, res, next) => {
    const { perfilId, permissoesIds } = req.body;
    const data = await perfisPermissoes.vincular(perfilId, permissoesIds);
    responses.success(res, {
        message: 'Permissões vinculadas ao perfil com sucesso',
        data
    } );
});

export const listarVinculos = asyncHandler(async (req, res, next) => {
    const perfilId = req.params.perfilId;
    const data = await perfisPermissoes.listarVinculos(perfilId);
    responses.success(res, {
        message: 'Permissões listadas com sucesso',
        data
    } );
});

export const permissoesPerfilAcessos = asyncHandler(async (req, res, next) => {
    const perfilId = req.params.perfilId;
    const data = await perfisPermissoes.permissoesPerfilAcessos(perfilId);
    responses.success(res, {
        message: 'Permissões listadas com sucesso',
        data
    } );
});
