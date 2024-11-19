import { dbQuery, dbQueryFirst } from "../services/db";

export type Produto = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: string;
    fornecedorId: number;
}

const insertProduto = async (produto: Produto) => {
    await dbQuery(
        `INSERT INTO produto (nome, descricao, preco, quantidade, imagem, fornecedorId) VALUES (?, ?, ?, ?, ?, ?)`,
        [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.imagem, produto.fornecedorId]
    );
    return getProduto(produto.id);
}

const updateProduto = async (produto: Produto) => {
    await dbQuery(
        `UPDATE produto SET nome = ?, descricao = ?, preco = ?, quantidade = ?, imagem = ?, fornecedorId = ? WHERE id = ?`,
        [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.imagem, produto.fornecedorId, produto.id]
    );
    return getProduto(produto.id);
}

const listProdutos = async () => {
    const retorno = await dbQuery(`SELECT * FROM produto`);
    console.log(retorno);
    return retorno as Produto[];
}

const getProduto = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM produto WHERE id = ?`, [id]);
    console.log(retorno);
    return retorno as Produto | undefined;
}

const deleteProduto = async (id: number) => {
    await dbQueryFirst(`DELETE FROM produto WHERE id = ?`, [id]);
}

export const produtoModel = {
    insertProduto,
    updateProduto,
    listProdutos,
    getProduto,
    deleteProduto
}
