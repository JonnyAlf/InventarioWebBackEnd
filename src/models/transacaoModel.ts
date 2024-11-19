import { dbQuery, dbQueryFirst } from "../services/db";

export type Transacao = {
    id: number;
    data: Date;
    tipo: string;
    valor: number;
    produtoId?: number;
    pedidoId?: number;
};

const insertTransacao = async (transacao: Transacao) => {
    await dbQuery(
        `INSERT INTO transacao (data, tipo, valor, produtoId, pedidoId) VALUES (?, ?, ?, ?, ?)`,
        [transacao.data, transacao.tipo, transacao.valor, transacao.produtoId, transacao.pedidoId]
    );
    return getTransacao(transacao.id);
};

const updateTransacao = async (transacao: Transacao) => {
    await dbQuery(
        `UPDATE transacao SET data = ?, tipo = ?, valor = ?, produtoId = ?, pedidoId = ? WHERE id = ?`,
        [transacao.data, transacao.tipo, transacao.valor, transacao.produtoId, transacao.pedidoId, transacao.id]
    );
    return getTransacao(transacao.id);
};

const listTransacao = async () => {
    const retorno = await dbQuery(`SELECT * FROM transacao`);
    return retorno as Transacao[];
};

const getTransacao = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM transacao WHERE id = ?`, [id]);
    return retorno as Transacao | undefined;
};

const deleteTransacao = async (id: number) => {
    await dbQuery(`DELETE FROM transacao WHERE id = ?`, [id]);
};

export const transacaoModel = {
    insertTransacao,
    updateTransacao,
    listTransacao,
    getTransacao,
    deleteTransacao,
};
