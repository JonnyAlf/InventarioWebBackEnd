import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';
import { Request, Response } from 'express';
import { Usuario, usuarioModel } from '../models/usuarioModel';

const insertUsuario = (req: Request, res: Response) => {
    const usuario = req.body as Usuario;

    if (!usuario)
        return badRequest(res, "Usuario inválido");
    if (!usuario.nome)
        return badRequest(res, 'Informe o seu nome.');
    if (!usuario.email)
        return badRequest(res, 'E-mail incoreto, tente novamente!');
    if (!usuario.senha)
        return badRequest(res, 'SENHA INVALIDA!!');

    usuarioModel.insertUsuario(usuario)
        .then(id => res.json({ id }))
        .catch(err => internalServerError(res, err));
}

const listUsuario = (req: Request, res: Response) => {
    usuarioModel.listUsuario()
        .then(usuario => res.json(usuario))
        .catch(err => internalServerError(res, err));
};

const getUsuario = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, 'ID inválido');

    usuarioModel.getUsuario(id)
        .then(usuario => {
            if (usuario) {
                return res.json(usuario);
            }
            return notFound(res, 'Usuario não encontrado');
        })
        .catch(err => internalServerError(res, err));
};

const deleteUsuario = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, 'ID inválido');

    usuarioModel.deleteUsuario(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
};

export const usuarioControllers = {
  insertUsuario,
  listUsuario,
  getUsuario,
  deleteUsuario
};

