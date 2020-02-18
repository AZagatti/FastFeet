import Sequelize, { Model } from 'sequelize';

interface IFile {
  name: string;
  path: string;
  url: string;
}

class File extends Model<IFile> {
  public id!: number;

  public name!: string;

  public path!: string;

  public url!: string;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static init(sequelize: any) {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get(this: any): string {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default File;
