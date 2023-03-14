"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
class DatabaseConnection extends sequelize_typescript_1.Sequelize {
    constructor(credentials) {
        const config = {
            ...credentials,
            define: {
                underscored: true,
            },
            models: [path_1.default.join(__dirname, '..', 'app', 'models', '**')],
        };
        const connection = super(config.database, config.username, config.password, config);
        return connection;
    }
    async connectAndSync() {
        await this.sync();
        await this.authenticate();
    }
}
exports.default = DatabaseConnection;
//# sourceMappingURL=connection.js.map