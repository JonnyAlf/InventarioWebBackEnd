import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';
import { Request, Response } from 'express';
import { Produto, produtoModel } from '../models/produtoModel';

const insertProduto = (req: Request, res: Response) => {
    const produto = req.body as Produto;

    if (!produto)
        return badRequest(res, "Produto inválido");
    if (!produto.nome)
        return badRequest(res, 'Informe o nome do produto');
    if (!produto.descricao)
        return badRequest(res, 'Informe a descrição do produto');
    if (!produto.preco || produto.preco <= 0)
        return badRequest(res, 'Informe um preço válido para o produto');
    if (!produto.quantidade || produto.quantidade < 0)
        return badRequest(res, 'Informe a quantidade do produto');
    if (!produto.imagem)
        return badRequest(res, 'Informe a URL da imagem do produto');
    if (!produto.fornecedorId)
        return badRequest(res, 'Informe o ID do fornecedor do produto');

    produtoModel.insertProduto(produto)
        .then(id => res.json({ id }))
        .catch(err => internalServerError(res, err));
}

const listProdutos = (req: Request, res: Response) => {
    produtoModel.listProdutos()
        .then(produtos => res.json(produtos))
        .catch(err => internalServerError(res, err));
};

const getProduto = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, 'ID inválido');

    produtoModel.getProduto(id)
        .then(produto => {
            if (produto) {
                return res.json(produto);
            }
            return notFound(res, 'Produto não encontrado');
        })
        .catch(err => internalServerError(res, err));
};

const deleteProduto = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, 'ID inválido');

    produtoModel.deleteProduto(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
};

export const produtoController = {
    insertProduto,
    listProdutos,
    getProduto,
    deleteProduto
};
