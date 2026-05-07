import { AppError } from "../../../core/utils/AppError.js";
import * as PermissoesModel from './permissoes.model.js';

export const listarTodas = async (acesso=undefined) => {    
    
  const permissoes = await PermissoesModel.listar(acesso);

  const resultado = [];

  let moduloAtual = null;
  let recursoAtual = null;

  for (const perm of permissoes) {
    const {
      id,
      codigo,
      modulo,
      recurso,
      metodo,
      rota_template,
      descricao,
      eh_publica
    } = perm;

    if (!moduloAtual || moduloAtual.modulo !== modulo) {
      moduloAtual = {
        modulo,
        recursos: []
      };

      resultado.push(moduloAtual);
      recursoAtual = null;
    }

    if (!recursoAtual || recursoAtual.recurso !== recurso) {
      recursoAtual = {
        recurso,
        permissoes: []
      };

      moduloAtual.recursos.push(recursoAtual);
    }

    recursoAtual.permissoes.push({
      id,
      codigo,
      metodo,
      rota_template,
      descricao,
      eh_publica: eh_publica === 1
    });
  }

  return resultado;

}

export const listarPermissoesPorUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError({
            message: 'ID do usuário inválido',
            code: 400
        });
    }
    const permissoesUsuario = await PermissoesModel.listarPermissoesPorUsuario(usuarioIdNumber);
    const todasPermissoes = await PermissoesModel.listar();

    let permissoes = []
    todasPermissoes.forEach(perm => {
        const possuiPermissao = permissoesUsuario.some(userPerm => userPerm.id === perm.id);
        possuiPermissao ? perm.concedida = true : perm.concedida = false;
        permissoes.push(perm);
    });   

 
   const resultado = {};

    for (const perm of permissoes) {
      const { codigo, modulo, concedida } = perm;
      if (!resultado[modulo]) resultado[modulo] = {};
      resultado[modulo][codigo] = concedida;
    }

    return resultado;
};

export const listarPermissoesPorUsuarioDetalhada = async (usuarioId) => {
  const usuarioIdNumber = Number(usuarioId);
  if (!usuarioIdNumber) {
      throw new AppError({
          message: 'ID do usuário inválido',
          code: 400
      });
  }
  const permissoesUsuario = await PermissoesModel.listarPermissoesPorUsuario(usuarioIdNumber);
  const todasPermissoes = await PermissoesModel.listar();

  let permissoes = []
  todasPermissoes.forEach(perm => {
      const possuiPermissao = permissoesUsuario.some(userPerm => userPerm.id === perm.id);
      possuiPermissao ? perm.concedida = true : perm.concedida = false;
      permissoes.push(perm);
  });   
   
  const resultado = [];

  let moduloAtual = null;
  let recursoAtual = null;

  for (const perm of permissoes) {
    const {
      id,
      codigo,
      modulo,
      recurso,
      metodo,
      rota_template,
      descricao,
      concedida,
      eh_publica
    } = perm;

    if (!moduloAtual || moduloAtual.modulo !== modulo) {
      moduloAtual = {
        modulo,
        recursos: []
      };

      resultado.push(moduloAtual);
      recursoAtual = null;
    }

    if (!recursoAtual || recursoAtual.recurso !== recurso) {
      recursoAtual = {
        recurso,
        permissoes: []
      };

      moduloAtual.recursos.push(recursoAtual);
    }

    recursoAtual.permissoes.push({
      id,
      codigo,
      metodo,
      rota_template,
      descricao,
      eh_publica: eh_publica === 1,
      concedida
    });
  }

  return resultado;
};


export const listarPermissoesChavePorUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError({
            message: 'ID do usuário inválido',
            code: 400
        });
    }
    const permissoes = await PermissoesModel.listarPermissoesPorUsuario(usuarioIdNumber);
    const result = permissoes.map((r) => `${String(r.metodo).toUpperCase()} ${r.rota_template}`);
    return result;
};
