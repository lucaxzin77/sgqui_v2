import * as usuarioService from './usuario.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';


export const login = asyncHandler(async (req, res, next) => {

    const result = await usuarioService.login(req.body);

    return responses.success(res, {  
        message: "Login realizado com sucesso", 
        data: result
    });
   
});


export const consultarPorId = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        const data = await usuarioService.consultarPorId(id);
        return responses.success(res, {
            message: "Usuário consultado com sucesso",
            data 
        });
});

export const deletar = asyncHandler(async (req, res, next)=>{
    await usuarioService.deletar(req.params.id);
    return responses.noContent(res, {message: "Usuário deletado com sucesso"}); 
});

export const deletarPerfil = asyncHandler(async (req, res, next)=>{
    const id = req.loginId;
    await usuarioService.deletar(id);
    return responses.noContent(res, {message: "Usuário deletado com sucesso" });
});

export const consultarLogado = asyncHandler(async (req, res, next)=>{
        const id = req.loginId;
        const data = await usuarioService.consultarPorId(id);
        return responses.success(res, {message: "Usuário logado consultado com sucesso", data });
});

export const consultar = asyncHandler(async (req, res, next)=>{
    const data = await usuarioService.consultar(req.query);
    return responses.success(res, {message: "Usuários consultados com sucesso", data });
});

export const cadastrar = asyncHandler(async (req, res, next)=>{
    const data = await usuarioService.cadastrar(req.body);
    return responses.created(res, {message: "Usuário cadastrado com sucesso", data });

});

export const alterarPerfil = asyncHandler(async (req, res, next)=>{
    let id = req.loginId;
    let usuario = req.body;        
    const data = await usuarioService.alterar(id, usuario);
    return responses.success(res, {message: "Usuário alterado com sucesso", data });

});

export const alterar = asyncHandler(async (req, res, next)=>{
    let id = req.params.id;
    let usuario = req.body;
    const data = await usuarioService.alterar(id, usuario);
    return responses.success(res, {message: "Usuário alterado com sucesso", data });
});
