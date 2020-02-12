import { Sequelize, Options } from 'sequelize';

import databaseConfig from 'config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';

const models = [User, Recipient];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig as Options);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
