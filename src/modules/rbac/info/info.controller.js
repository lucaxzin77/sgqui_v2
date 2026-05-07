import { listarTodas } from '../permissoes/permissoes.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const obterInfoSistema = asyncHandler(async (req, res, next) => {
    const rootDomain = req.protocol + '://' + req.get('host');
    const data ={
        status_server: '(DEV - v2) ok - API SGQUI v2.5',
        dominio_raiz : rootDomain,
        atualização: '01/05/2026',
        endpoints_disponiveis: `${rootDomain}/rbac/endpoints`,
        
    };
    return responses.success(res, { data });
});

export const endpoints = asyncHandler(async (req, res, next) => {
    const endpoints = await listarTodas();
    return responses.success(res, { message: 'Lista de endpoints', data: endpoints });
});
