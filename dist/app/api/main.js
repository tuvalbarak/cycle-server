"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("./v1/main");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const main_2 = __importDefault(require("./v1/main"));
const configRouter = (0, express_1.Router)();
// mount apis
configRouter.use("/api/v1", main_2.default);
// mount swagger
configRouter.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(main_1.specs));
exports.default = configRouter;
//# sourceMappingURL=main.js.map