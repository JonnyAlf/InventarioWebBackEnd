import { clienteController } from '../controllers/clienteController';
import { Router } from 'express';

const clienteRouter = Router();
clienteRouter.post('/add', clienteController.insertCliente);
clienteRouter.get('/get', clienteController.listCliente);
clienteRouter.get('/:id', clienteController.getCliente);
clienteRouter.delete('/:id', clienteController.deleteCliente);
clienteRouter.put('/:id', clienteController.updateCliente);

export { clienteRouter };
