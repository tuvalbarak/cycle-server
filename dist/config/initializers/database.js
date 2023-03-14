"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const connection_1 = __importDefault(require("../../db/connection"));
let main_connection;
function connect() {
    if (main_connection) {
        return main_connection;
    }
    const credentials = require(__dirname + '/../database.json')[env_1.default];
    if (process.env.DB_POOL) {
        credentials.pool = { ...credentials.pool, max: Number.parseInt(process.env.DB_POOL) };
    }
    main_connection = new connection_1.default(credentials);
    main_connection.connectAndSync();
    return main_connection;
}
exports.default = connect;
//# sourceMappingURL=database.js.map