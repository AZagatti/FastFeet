import Sequelize, { Model } from 'sequelize';

interface IDeliveryProblem {
  id: number;
  delivery_id: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

class DeliveryProblem extends Model<IDeliveryProblem> {
  public id: number;

  public delivery_id: number;

  public description: string;

  public created_at: Date;

  public updated_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static init(sequelize: any) {
    super.init.call(
      this,
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static associate(models: any) {
    this.belongsTo(models.Order, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}

export default DeliveryProblem;
