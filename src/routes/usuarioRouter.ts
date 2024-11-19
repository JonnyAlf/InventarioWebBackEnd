import { usuarioControllers } from '../controllers/usuarioController';
import { Router } from 'express';

const usuarioRouters = Router();
usuarioRouters.post('/add', usuarioControllers.insertUsuario);
usuarioRouters.get('/get', usuarioControllers.listUsuario);
usuarioRouters.get('/:id', usuarioControllers.getUsuario);
usuarioRouters.delete('/:id', usuarioControllers.deleteUsuario);

export { usuarioRouters }
