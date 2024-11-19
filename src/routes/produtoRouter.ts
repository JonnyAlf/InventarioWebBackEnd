import { produtoController } from '../controllers/produtoController';
import { Router } from 'express';

const produtoRouter = Router();
produtoRouter.post('/add', produtoController.insertProduto);
produtoRouter.get('/get', produtoController.listProdutos);
produtoRouter.get('/:id', produtoController.getProduto);
produtoRouter.delete('/:id', produtoController.deleteProduto);

export { produtoRouter }
