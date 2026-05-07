// Inicializa um array vazio para armazenar sessões
let sessoes = [];

/**
 * Adicionar um sessão em uso ao cache de sessoes
 *
 * @param {number} id - Id da sessão
 * @param {number} usuario - Id do usuário na sessão
 * @param {string} token - token de 128 bit da sessão do usuário logado.
 * @returns {void} Sem retorno
 */

export function addSessao(id, usuario, token, { perfis = [], permissoes = [] } = {}) {
  sessoes.push({
    id,
    usuario,
    token,
    perfis,
    permissoes,
    criadoEm: Date.now()
  });
}

// Compatibilidade: versões anteriores do middleware chamavam este nome.
export function addSessaoComRbac(id, usuario, token, { perfis = [], permissoes = [] } = {}) {
  return addSessao(id, usuario, token, { perfis, permissoes });
}


/**
 * Busca sessão por id e usuario
 *
 * @param {number} id - Id da sessão
 * @param {number} usuario - Id do usuário * 
 * @param {string} token - token a ser validado.
 * @returns {Object||null} - Se existente retorna a sessão do usuario, caso contrário null
 */
export function buscarSessao( id, usuario, token) {
  return sessoes.find(s => (s.id === id && s.usuario === usuario && s.token === token));
}

// Função para limpar sessões expiradas
function limparSessoes() {
  const agora = Date.now();
  const umaHora = 60 * 60 * 1000; // 1 hora em ms

  sessoes = sessoes.filter(session => (agora - session.criadoEm) < umaHora);

  console.log(`[CLEANUP] Sessões ativas: ${sessoes.length}`);
}

// Configura execução automática a cada 1h
setInterval(limparSessoes, 60 * 60 * 1000); // 1h

