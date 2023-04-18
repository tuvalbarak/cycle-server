import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv'
dotenv.config()

export default class DatabaseConnection extends Sequelize {
  constructor(credentials: any) {

    const config = {
      ...credentials,
      define: {
        underscored: true,
      },
      models: [path.join(__dirname, '..', 'app', 'models', '**')],
    };

    let connection
    if (config.use_env_variable) {
      connection = super(process.env[config.use_env_variable], config);
    } else {
      connection = super(
        config.database,
        config.username,
        config.password,
        config
      );
    }

    return connection;
  }

  async connectAndSync() {
    await this.sync({ force: true });
    await this.authenticate();
  }
}
