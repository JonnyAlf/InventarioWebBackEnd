import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';
import { Request, Response } from 'express';
import { ItemPedido, itemPedidoModel } from '../models/itemPedidoModel';

const insertItemPedido = (req: Request, res: Response) => {
    const item = req.body as ItemPedido;

    if (!item)
        return badRequest(res, "Item do pedido inválido");
    if (!item.pedidoId)
        return badRequest(res, "Informe o ID do pedido");
    if (!item.produtoId)
        return badRequest(res, "Informe o ID do produto");
    if (!item.quantidade)
        return badRequest(res, "Informe a quantidade do produto");
    if (!item.precoUnitario)
        return badRequest(res, "Informe o preço unitário do produto");

    itemPedidoModel.insertItemPedido(item)
        .then(id => res.json({ id }))
        .catch(err => internalServerError(res, err));
};

const listItemPedido = (req: Request, res: Response) => {
    itemPedidoModel.listItemPedido()
        .then(items => res.json(items))
        .catch(err => internalServerError(res, err));
};

const getItemPedido = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, "ID inválido");

    itemPedidoModel.getItemPedido(id)
        .then(item => {
            if (item) return res.json(item);
            return notFound(res, "Item do pedido não encontrado");
        })
        .catch(err => internalServerError(res, err));
};

const deleteItemPedido = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, "ID inválido");

    itemPedidoModel.deleteItemPedido(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
};

export const itemPedidoController = {
    insertItemPedido,
    listItemPedido,
    getItemPedido,
    deleteItemPedido,
};
