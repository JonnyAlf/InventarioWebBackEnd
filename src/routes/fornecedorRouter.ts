import { fornecedorController } from '../controllers/fornecedorController';
import { Router } from 'express';

const fornecedorRouter = Router();
fornecedorRouter.post('/add', fornecedorController.insertFornecedor);
fornecedorRouter.get('/get', fornecedorController.listFornecedor);
fornecedorRouter.get('/:id', fornecedorController.getFornecedor);
fornecedorRouter.delete('/:id', fornecedorController.deleteFornecedor);

export { fornecedorRouter }
