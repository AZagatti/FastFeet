import Sequelize, { Model } from 'sequelize';

interface RecipientInterface {
  id: number;
  name: string;
  street: string;
  number: number;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
  created_at: Date;
  updated_at: Date;
}

class Recipient extends Model<RecipientInterface> {
  public id!: number;

  public name!: string;

  public street!: string;

  public number!: number;

  public complement!: string;

  public state!: string;

  public city!: string;

  public zip_code!: string;

  public created_at!: Date;

  public updated_at!: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static init(sequelize: any) {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Recipient;
