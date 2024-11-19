import { dbQuery, dbQueryFirst } from "../services/db";

export type Cliente = {
    id: number;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
}

const insertCliente = async (cliente: Cliente) => {
    await dbQuery(`INSERT INTO cliente (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)`,
        [cliente.nome, cliente.cpf_cnpj, cliente.contato, cliente.endereco]);
    return getCliente(cliente.id);
}

const updateCliente = async (cliente: Cliente) => {
    await dbQuery(`UPDATE cliente SET nome = ?, cpf_cnpj = ?, contato = ?, endereco = ? WHERE id = ?`,
        [cliente.nome, cliente.cpf_cnpj, cliente.contato, cliente.endereco, cliente.id]);
    return getCliente(cliente.id);
}

const listCliente = async () => {
    const retorno = await dbQuery(`SELECT * FROM cliente`);
    console.log(retorno);
    return retorno as Cliente[];
}

const getCliente = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM cliente where id = ?`, [id]);
    console.log(retorno);
    return retorno as Cliente | undefined;
}

const deleteCliente = async (id: number) => {
    await dbQueryFirst(`DELETE FROM cliente where id = ?`, [id]);
}

export const clienteModel = {
    insertCliente,
    listCliente,
    getCliente,
    deleteCliente,
    updateCliente
}
