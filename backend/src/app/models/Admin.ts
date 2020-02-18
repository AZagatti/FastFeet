import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

class User extends Model<UserInterface> {
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

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
