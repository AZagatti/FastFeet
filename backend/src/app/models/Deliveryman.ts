import Sequelize, { Model } from 'sequelize';

interface IAssociable {
  associate: (model: any) => void;
}

interface IDeliveryman {
  id: number;
  name: string;
  avatar_id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
}

class Deliveryman extends Model<IDeliveryman> {
  public id: number;

  public name: string;

  public avatar_id: number;

  public email: string;

  public created_at: Date;

  public updated_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static init(sequelize: any) {
    super.init.call(
      this,
      {
        id: Sequelize.NUMBER,
        name: Sequelize.STRING,
        avatar_id: Sequelize.NUMBER,
        email: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  public static associate(models: any) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
