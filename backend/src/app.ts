import 'dotenv/config';
import express, { Request, Response, Errback, NextFunction } from 'express';
import path from 'path';
import Youch from 'youch';

import 'express-async-errors';

import routes from './routes';
import './database';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
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

  exceptionHandler() {
    this.server.use(
      async (
        err: Errback,
        req: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction,
      ): Promise<Response> => {
        const { NODE_ENV } = process.env;
        if (NODE_ENV === 'development') {
          const errors = await new Youch(err, res).toJSON();

          return res.status(500).json(errors);
        }

        return res.status(500).json({ error: 'Internal server error' });
      },
    );
  }
}

export default new App().server;
