"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class DatabaseConnection extends sequelize_typescript_1.Sequelize {
    constructor(credentials) {
        const config = {
            ...credentials,
            define: {
                underscored: true,
            },
            models: [path_1.default.join(__dirname, '..', 'app', 'models', '**')],
        };
        let connection;
        if (config.use_env_variable) {
            connection = super(process.env[config.use_env_variable], config);
        }
        else {
            connection = super(config.database, config.username, config.password, config);
        }
        return connection;
    }
    async connectAndSync() {
        await this.sync();
        await this.authenticate();
    }
}
exports.default = DatabaseConnection;
//# sourceMappingURL=connection.js.map