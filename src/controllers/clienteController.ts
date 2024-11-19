import { Request, Response } from "express";
import { clienteModel, Cliente } from "../models/clienteModel";

const insertCliente = async (req: Request, res: Response) => {
    const cliente = req.body as Cliente;
    try {
        const newCliente = await clienteModel.insertCliente(cliente);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao inserir cliente", error });
    }
}

const updateCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const cliente = req.body as Cliente;
    cliente.id = id;
    try {
        const updatedCliente = await clienteModel.updateCliente(cliente);
        res.status(200).json(updatedCliente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cliente", error });
    }
}

const listCliente = async (_req: Request, res: Response) => {
    try {
        const clientes = await clienteModel.listCliente();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar clientes", error });
    }
}

const getCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const cliente = await clienteModel.getCliente(id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter cliente", error });
    }
}

const deleteCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await clienteModel.deleteCliente(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar cliente", error });
    }
}

export const clienteController = {
    insertCliente,
    updateCliente,
    listCliente,
    getCliente,
    deleteCliente
};
