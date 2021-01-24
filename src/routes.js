import { Router } from 'express';
// import cors from 'cors';

// import UsersController from './app/controllers/UsersController';
// import SessionController from './app/controllers/SessionController';
import ClienteController from './app/controllers/ClienteController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/cliente', ClienteController.store);
routes.put('/cliente', ClienteController.update);
routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.findOne);
routes.post('/deleteCliente', ClienteController.destroy);
routes.use(authMiddleware);

// routes.post('/users', UsersController.store);
// routes.post('/sessions', SessionController.store);

// const origins = [
//   'http://erp.iveloz.net',
//   'http://erp.iveloz.net.br',
//   'http://erp.edrelixnet.com.br',
//   'http://erp.flexfibra.com',
//   'http://erp.spfibras.com.br',
//   'http://erp.trendsis.com.br',
//   'http://erp.versete.com.br',
//   'http://colorado.edrelixnet.com.br',
// ];
// const corsOptions = {
//   origin(origin, callback) {
//     if (origins.indexOf(origin) !== -1) callback(null, true);
//     else callback(new Error('Not allowed by CORS'));
//   },
// };

// // const corsOptions = {};
// routes.post('/erp/users', cors(corsOptions), UsersController.store);
// routes.post('/erp/sessions', cors(corsOptions), SessionController.store);

// routes.post('/sessionsVerify', SessionController.getUserEnable);

// routes.get('/combo', ComboController.index);
// routes.post('/combo', ComboController.store);

// routes.get('/correio/:cep', CorreioController.index);

// routes.post('/adesao/find', AdesaoController.index);

export default routes;
