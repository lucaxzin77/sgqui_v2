import * as responses from '../utils/responses.js';




export default async function autorizar(req, res, next) { 

  const concederPermissao = ( endpoint, permissoes ) => {
    // Se não houver permissões definidas, negar acesso
    if (!permissoes) return false;
    
    // Verifica se o endpoint requerido está nas permissões do usuário
    if (permissoes instanceof Set) return permissoes.has(endpoint);
    
    // Verifica se o endpoint requerido está nas permissões do usuário
    if (Array.isArray(permissoes)) return permissoes.includes(endpoint);

    return false;
  };
  
  const metodo = req.method.toUpperCase();
  const rotaTemplate = req.route.path; // ← mágica acontece aqui

  const endpoint = `${metodo} ${rotaTemplate}`;

  if (!concederPermissao(endpoint, req.permissoes)) {
    return responses.forbidden(res, { message: 'Acesso negado' });
  }
  return next();
};
