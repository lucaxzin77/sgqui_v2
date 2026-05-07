import configuracaoRoutes from './configuracao/configuracao.routes.js';
import elementoRoutes from './elemento/elemento.routes.js';
import etapa_mpRoutes from './etapa_mp/etapa_mp.routes.js';
import etapaRoutes from './etapa/etapa.routes.js';
import garantiaRoutes from './garantia/garantia.routes.js';
import materia_primaRoutes from './materia_prima/materia_prima.routes.js';
import nutrienteRoutes from './nutriente/nutriente.routes.js';
import projetoRoutes from './projeto/projeto.routes.js';

  
export default [
  ...configuracaoRoutes,
  ...elementoRoutes,
  ...etapa_mpRoutes,
  ...etapaRoutes,
  ...garantiaRoutes,
  ...materia_primaRoutes,
  ...nutrienteRoutes,
  ...projetoRoutes
];
