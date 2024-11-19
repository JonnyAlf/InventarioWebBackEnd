import { dbQuery, dbQueryFirst } from "../services/db";

export type Pedido = {
    id: number;
    data: Date;
    clienteId: number;
    status: string;
    total: number;
};

const insertPedido = async (pedido: Pedido) => {
    await dbQuery(
        `INSERT INTO pedido (data, clienteId, status, total) VALUES (?, ?, ?, ?)`,
        [pedido.data, pedido.clienteId, pedido.status, pedido.total]
    );
    return getPedido(pedido.id);
};

const updatePedido = async (pedido: Pedido) => {
    await dbQuery(
        `UPDATE pedido SET data = ?, clienteId = ?, status = ?, total = ? WHERE id = ?`,
        [pedido.data, pedido.clienteId, pedido.status, pedido.total, pedido.id]
    );
    return getPedido(pedido.id);
};

const listPedido = async () => {
    const retorno = await dbQuery(`SELECT * FROM pedido`);
    return retorno as Pedido[];
};

const getPedido = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM pedido WHERE id = ?`, [id]);
    return retorno as Pedido | undefined;
};

const deletePedido = async (id: number) => {
    await dbQuery(`DELETE FROM pedido WHERE id = ?`, [id]);
};

export const pedidoModel = {
    insertPedido,
    updatePedido,
    listPedido,
    getPedido,
    deletePedido,
};
