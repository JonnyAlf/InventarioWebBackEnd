import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';
import { Request, Response } from 'express';
import { Fornecedor, fornecedorModel } from '../models/fornecedorModel';

const insertFornecedor = (req: Request, res: Response) => {
    const fornecedor = req.body as Fornecedor;

    if (!fornecedor)
        return badRequest(res, "Fornecedor inválido");
    if (!fornecedor.nome)
        return badRequest(res, 'Informe a razão social do fornecedor');
    if (!fornecedor.cnpj)
        return badRequest(res, 'Informe o CNPJ do fornecedor');
    if (!fornecedor.contato)
        return badRequest(res, 'Informe o telefone de contato do fornecedor');
    if (!fornecedor.endereco)
        return badRequest(res, 'Informe o endereço do fornecedor');

    fornecedorModel.insertFornecedor(fornecedor)
        .then(id => res.json({ id }))
        .catch(err => internalServerError(res, err));
}

const listFornecedor = (req: Request, res: Response) => {
    fornecedorModel.listFornecedor()
        .then(fornecedores => res.json(fornecedores))
        .catch(err => internalServerError(res, err));
};

const getFornecedor = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, 'ID inválido');

    fornecedorModel.getFornecedor(id)
        .then(fornecedor => {
            if (fornecedor) {
                return res.json(fornecedor);
            }
            return notFound(res, 'Fornecedor não encontrado');
        })
        .catch(err => internalServerError(res, err));
};

const deleteFornecedor = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id))
        return badRequest(res, 'ID inválido');

    fornecedorModel.deleteFornecedor(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
};


export const fornecedorController = {
    insertFornecedor,
    listFornecedor,
    getFornecedor,
    deleteFornecedor
};
