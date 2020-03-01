import 'dotenv/config';
import express from 'express';
import path from 'path';

import routes from './routes';
import './database';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
    );
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
