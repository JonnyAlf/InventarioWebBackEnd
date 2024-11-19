import { transacaoController } from '../controllers/transacaoController';
import { Router } from 'express';

const transacaoRouter = Router();

transacaoRouter.post('/add', transacaoController.insertTransacao);
transacaoRouter.get('/get', transacaoController.listTransacao);
transacaoRouter.get('/:id', transacaoController.getTransacao);
transacaoRouter.delete('/:id', transacaoController.deleteTransacao);

export { transacaoRouter };
