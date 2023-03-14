import path from 'path';
import { Sequelize } from 'sequelize-typescript';

export default class DatabaseConnection extends Sequelize {
  constructor(credentials: any) {

    const config = {
      ...credentials,
      define: {
        underscored: true,
      },
      models: [path.join(__dirname, '..', 'app', 'models', '**')],
    };

    const connection: any = super(
      config.database,
      config.username,
      config.password,
      config
    );

    return connection;
  }

  async connectAndSync() {
    await this.sync();
    await this.authenticate();
  }

}
