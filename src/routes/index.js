import { Router } from 'express';
import { AppError } from '../core/utils/AppError.js';
import * as info from '../modules/rbac/info/info.controller.js';
import allRoutesMaps from './allRoutes.maps.js';

const routes = Router();

routes.get('/', info.obterInfoSistema);

allRoutesMaps.forEach((map) => {
	const middlewares = map.middlewares || [];
	const path = `/${map.modulo}/${map.rota}`.replace(/\/+/g, '/');
	routes[map.metodo.toLowerCase()](
		path,
		...middlewares, 
		map.functionExec
	);
});


// Middleware para tratar rotas inválidas (deve ser o último middleware de rota)
// Encaminha para o middleware global de erro padronizar a resposta.
routes.use((req, res, next) => {
	return next(new AppError({
		message: 'Rota não encontrada',
		code: 404
	}));
});


export default routes;