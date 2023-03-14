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

    let connection
    if (config.use_env_variable) {
      connection = super(`postgres://wqaifsxtzyosjs:f7e81474e50bd495e3dd1b8422acec615523ba01e4fc7a53b8725d108734334d@ec2-3-208-74-199.compute-1.amazonaws.com:5432/d6f6hjo5tinpcu
      `, config);
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
    await this.sync();
    await this.authenticate();
  }

}
