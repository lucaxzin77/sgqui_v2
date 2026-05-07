import * as sessoesService from '../../modules/rbac/sessoes/sessoes.service.js';
import * as sessoesCache from '../utils/sessoesCache.js';
import * as responses from '../utils/responses.js'
import * as helpers from '../utils/helpers.js';
import * as upService from '../../modules/rbac/usuarioPerfis/usuarioPerfis.service.js';
import * as pService from '../../modules/rbac/permissoes/permissoes.service.js';

export default async function autenticar(req, res, next) {
    try {        
        const authorizationHeader = req.headers['authorization'];
        
        if (!authorizationHeader) {
            // return responses.error(res,{statusCode: 498, message:"Token de autenticação não fornecido"});    
            return responses.invalidToken(res,{message:"Token de autenticação não fornecido"});
        }
        const [bearer, token] = authorizationHeader.split(' ');
        
        if (bearer !== 'Bearer' || !token) {
            // return responses.error(res,{statusCode: 498, message:"Formato de token inválido"});   
            return responses.invalidToken(res,{message:"Formato de token inválido"});         
        }

        const tokenAtributos = helpers.deconstructToken(token);
        const sessaoId = parseInt(tokenAtributos.id, 10);
        const sessaoUsuario = parseInt(tokenAtributos.usuario, 10);
        const sessaoToken = tokenAtributos.token;

       
        let sessao_usuario = sessoesCache.buscarSessao(sessaoId, sessaoUsuario, sessaoToken);

        if(sessao_usuario){
            req.loginId = sessaoUsuario;
            req.perfis = sessao_usuario.perfis ?? [];
            req.permissoes = new Set(sessao_usuario.permissoes ?? []);
            next();
            return;
        }
        
        // Buscar a sessão no banco de dados ************************************************************

        sessao_usuario = await sessoesService.buscarSessao({ sessoes_id: sessaoId, sessoes_usuario: sessaoUsuario, token: sessaoToken });
        console.log("Sessão encontrada no banco de dados:", sessao_usuario);
        
        if(!sessao_usuario){
            return responses.invalidToken(res,{message:'Token de autenticação inválido'});
        }

        if(sessao_usuario.validade < new Date()){
            return responses.invalidToken(res,{message:'Token de autenticação expirou'});
        }

        const horaAtual = new Date();
        const tempoParaExpirar = (sessao_usuario.validade.getTime() - horaAtual.getTime())/60000;
        if(tempoParaExpirar < 60){
            const t_ex = await sessoesService.extender(sessaoId,24);
            if(t_ex) console.log("Token Extendico por mais 24 para o ID"+sessaoUsuario);
        }

        const perfis = await upService.listarPerfisDoUsuarioAutenticado(sessaoUsuario).then((perfis) => perfis.map((p) => p.nome));
        const permissoes = await pService.listarPermissoesChavePorUsuario(sessaoUsuario);



        sessoesCache.addSessaoComRbac(sessao_usuario.id, sessao_usuario.usuario, sessao_usuario.token, { perfis, permissoes });
        req.loginId = sessaoUsuario;
        req.perfis = perfis;
        req.permissoes = new Set(permissoes);
        next();
        return;
               
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);
        return responses.error(res,{statusCode:500,message:`Erro interno do servidor: ${error}`})        
    }
};