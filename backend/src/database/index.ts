import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

const models = [];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
  }
}

export default new Database();
