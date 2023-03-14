"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/initializers/database"));
const main_1 = __importDefault(require("./app/api/main"));
// create a new database connection
exports.connection = (0, database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(main_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map