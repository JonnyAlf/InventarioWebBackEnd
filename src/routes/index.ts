import { Application, Router } from "express";
import { fornecedorRouter } from "./fornecedorRouter";
import { usuarioRouters } from "./usuarioRouter";
import { produtoRouter } from "./produtoRouter";
import { clienteRouter } from "./clienteRouter";
import { pedidoRouter } from "./pedidoRouter";
import { itemPedidoRouter } from "./itemPedidoRouter";
import { transacaoRouter } from "./transacaoRouter";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/fornecedor', fornecedorRouter);
    apiRouter.use('/usuario',usuarioRouters);
    apiRouter.use('/produto',produtoRouter);
    apiRouter.use('/cliente',clienteRouter);
    apiRouter.use('/pedido',pedidoRouter);
    apiRouter.use('/itemPedido',itemPedidoRouter);
    apiRouter.use('/transacao',transacaoRouter);
    apiRouter.use('/pedido',pedidoRouter);
    
    
    app.use('/api/v1', apiRouter);
}
