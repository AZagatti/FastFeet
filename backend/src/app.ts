import express from 'express';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.routes();
    this.middleware();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
