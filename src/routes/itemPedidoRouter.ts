import { itemPedidoController } from '../controllers/itemPedidoController';
import { Router } from 'express';

const itemPedidoRouter = Router();

itemPedidoRouter.post('/add', itemPedidoController.insertItemPedido);
itemPedidoRouter.get('/get', itemPedidoController.listItemPedido);
itemPedidoRouter.get('/:id', itemPedidoController.getItemPedido);
itemPedidoRouter.delete('/:id', itemPedidoController.deleteItemPedido);

export { itemPedidoRouter };
