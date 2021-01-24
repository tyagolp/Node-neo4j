import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: 'https://pedantic-mahavira-711b0f.netlify.app',
      })
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
