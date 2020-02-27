import Sequelize, { Model } from 'sequelize';

interface IOrder {
  name: string;
  path: string;
  url: string;
}

class Order extends Model<IOrder> {
  public id!: number;

  public recipient_id!: number;

  public deliveryman_id!: number;

  public signature_id!: number;

  public product!: string;

  public canceled_at!: Date;

  public start_date!: Date;

  public end_date!: Date;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static init(sequelize: any) {
    super.init.call(
      this,
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static associate(models: any) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Order;
