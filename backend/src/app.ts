import express from 'express';

import routes from './routes';
import './database';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.routes();
    this.middleware();
  }

  private middleware(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
