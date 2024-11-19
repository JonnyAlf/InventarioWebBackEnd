import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';
import { Request, Response } from 'express';
import { Transacao, transacaoModel } from '../models/transacaoModel';

const insertTransacao = (req: Request, res: Response) => {
    const transacao = req.body as Transacao;

    if (!transacao)
        return badRequest(res, "Transação inválida");
    if (!transacao.data)
        return badRequest(res, "Informe a data da transação");
    if (!transacao.tipo)
        return badRequest(res, "Informe o tipo da transação");
    if (!transacao.valor)
        return badRequest(res, "Informe o valor da transação");

    transacaoModel.insertTransacao(transacao)
        .then(id => res.json({ id }))
        .catch(err => internalServerError(res, err));
};

const listTransacao = (req: Request, res: Response) => {
    transacaoModel.listTransacao()
        .then(transacoes => res.json(transacoes))
        .catch(err => internalServerError(res, err));
};

const getTransacao = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, "ID inválido");

    transacaoModel.getTransacao(id)
        .then(transacao => {
            if (transacao) return res.json(transacao);
            return notFound(res, "Transação não encontrada");
        })
        .catch(err => internalServerError(res, err));
};

const deleteTransacao = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, "ID inválido");

    transacaoModel.deleteTransacao(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
};

export const transacaoController = {
    insertTransacao,
    listTransacao,
    getTransacao,
    deleteTransacao,
};
