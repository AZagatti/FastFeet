import { Sequelize } from 'sequelize';

import databaseConfig from 'config/database';

const models = [];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig,
    );
  }
}

export default new Database();
