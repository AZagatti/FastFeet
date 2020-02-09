import { Sequelize, Options } from 'sequelize';

import databaseConfig from 'config/database';
import User from '../app/models/User';

const models = [User];

const { database, username, password } = databaseConfig;

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(
      database,
      username,
      password,
      databaseConfig as Options,
    );

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
