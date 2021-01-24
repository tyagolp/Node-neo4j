import { Router } from 'express';
import ClienteController from './app/controllers/ClienteController';

const routes = new Router();

routes.post('/cliente', ClienteController.store);
routes.put('/cliente', ClienteController.update);
routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.findOne);
routes.post('/deleteCliente', ClienteController.destroy);

export default routes;
