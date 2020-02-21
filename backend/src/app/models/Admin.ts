import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

interface IAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

class Admin extends Model<IAdmin> {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public password_hash!: string;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static init(sequelize: any) {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (admin: Admin) => {
      if (admin.password) {
        admin.password_hash = await bcrypt.hash(admin.password, 8);
      }
    });

    return this;
  }

  checkPassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Admin;
