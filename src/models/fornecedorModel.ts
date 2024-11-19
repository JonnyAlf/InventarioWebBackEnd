import { dbQuery, dbQueryFirst } from "../services/db";

export type Fornecedor = {
    id: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
}

const insertFornecedor = async (fornecedor: Fornecedor) => {
    await dbQuery(`INSERT INTO fornecedor (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)`,
        [fornecedor.nome, fornecedor.cnpj, fornecedor.contato, fornecedor.endereco]);
    return getFornecedor (fornecedor.id);
}

const updateFornecedor = async (fornecedor: Fornecedor) => {
    await dbQuery(`UPDATE fornecedor SET nome = ?, cnpj = ?, contato = ?, endereco = ? WHERE id = ?`,
        [fornecedor.nome, fornecedor.cnpj, fornecedor.contato, fornecedor.endereco, fornecedor.id]);
    return getFornecedor (fornecedor.id);
}

const listFornecedor = async () => {
    const retorno = await dbQuery(`SELECT * FROM fornecedor`);
    console.log(retorno);
    return retorno as Fornecedor[];
}

const getFornecedor = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM fornecedor where id = ?`, [id]);
    console.log(retorno);
    return retorno as Fornecedor | undefined;
}

const deleteFornecedor = async (id: number) => {
    await dbQueryFirst(`DELETE FROM fornecedor where id = ?`, [id]);
}

export const fornecedorModel = {
    insertFornecedor,
    listFornecedor,
    getFornecedor,
    deleteFornecedor,
    updateFornecedor
}