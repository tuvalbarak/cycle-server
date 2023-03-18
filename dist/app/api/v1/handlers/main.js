"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("./drivers/main"));
const main_2 = __importDefault(require("./vehicles/main"));
const cycleHandler = (0, express_1.Router)();
cycleHandler.use('/drivers', main_1.default);
cycleHandler.use('/vehiclesMeta', main_2.default);
exports.default = cycleHandler;
//to deploy - 
// git push cycle-server HEAD:master
// 
// brew tap heroku/brew && brew install heroku
//# sourceMappingURL=main.js.map