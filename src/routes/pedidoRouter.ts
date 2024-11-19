import { pedidoController } from '../controllers/pedidoController';
import { Router } from 'express';

const pedidoRouter = Router();

pedidoRouter.post('/add', pedidoController.insertPedido);
pedidoRouter.get('/get', pedidoController.listPedido);
pedidoRouter.get('/:id', pedidoController.getPedido);
pedidoRouter.delete('/:id', pedidoController.deletePedido);

export { pedidoRouter };
