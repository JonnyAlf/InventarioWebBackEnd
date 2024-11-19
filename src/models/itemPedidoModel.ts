import { dbQuery, dbQueryFirst } from "../services/db";

export type ItemPedido = {
    id: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
};

const insertItemPedido = async (item: ItemPedido) => {
    await dbQuery(
        `INSERT INTO item_pedido (pedidoId, produtoId, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`,
        [item.pedidoId, item.produtoId, item.quantidade, item.precoUnitario]
    );
    return getItemPedido(item.id);
};

const updateItemPedido = async (item: ItemPedido) => {
    await dbQuery(
        `UPDATE item_pedido SET pedidoId = ?, produtoId = ?, quantidade = ?, precoUnitario = ? WHERE id = ?`,
        [item.pedidoId, item.produtoId, item.quantidade, item.precoUnitario, item.id]
    );
    return getItemPedido(item.id);
};

const listItemPedido = async () => {
    const retorno = await dbQuery(`SELECT * FROM item_pedido`);
    return retorno as ItemPedido[];
};

const getItemPedido = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM item_pedido WHERE id = ?`, [id]);
    return retorno as ItemPedido | undefined;
};

const deleteItemPedido = async (id: number) => {
    await dbQuery(`DELETE FROM item_pedido WHERE id = ?`, [id]);
};

export const itemPedidoModel = {
    insertItemPedido,
    updateItemPedido,
    listItemPedido,
    getItemPedido,
    deleteItemPedido,
};
