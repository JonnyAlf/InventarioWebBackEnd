import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';
import { Request, Response } from 'express';
import { Pedido, pedidoModel } from '../models/pedidoModal';

const insertPedido = (req: Request, res: Response) => {
    const pedido = req.body as Pedido;

    if (!pedido)
        return badRequest(res, "Pedido inválido");
    if (!pedido.data)
        return badRequest(res, "Informe a data do pedido");
    if (!pedido.clienteId)
        return badRequest(res, "Informe o cliente associado ao pedido");
    if (!pedido.status)
        return badRequest(res, "Informe o status do pedido");
    if (!pedido.total)
        return badRequest(res, "Informe o valor total do pedido");

    pedidoModel.insertPedido(pedido)
        .then(id => res.json({ id }))
        .catch(err => internalServerError(res, err));
};

const listPedido = (req: Request, res: Response) => {
    pedidoModel.listPedido()
        .then(pedidos => res.json(pedidos))
        .catch(err => internalServerError(res, err));
};

const getPedido = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, "ID inválido");

    pedidoModel.getPedido(id)
        .then(pedido => {
            if (pedido) return res.json(pedido);
            return notFound(res, "Pedido não encontrado");
        })
        .catch(err => internalServerError(res, err));
};

const deletePedido = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, "ID inválido");

    pedidoModel.deletePedido(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
};

export const pedidoController = {
    insertPedido,
    listPedido,
    getPedido,
    deletePedido,
};
