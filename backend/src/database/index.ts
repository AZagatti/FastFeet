import { Sequelize, Options } from 'sequelize';

import databaseConfig from 'config/database';
import Admin from '../app/models/Admin';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';

const models = [Admin, Recipient, Deliveryman, File];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig as Options);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model: any) =>
          model.associate && model.associate(this.connection.models),
      );
  }
}

export default new Database();
