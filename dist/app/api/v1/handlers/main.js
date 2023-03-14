"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("./users/main"));
const cycleHandler = (0, express_1.Router)();
cycleHandler.use('/users', main_1.default);
exports.default = cycleHandler;
//# sourceMappingURL=main.js.map