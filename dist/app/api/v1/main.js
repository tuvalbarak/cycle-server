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
exports.specs = void 0;
const express_1 = require("express");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const error_1 = require("./helpers/error");
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const main_1 = __importDefault(require("./handlers/main"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cycle Server',
            version: '1.0.0',
            description: '',
        },
        servers: [
            {
                url: "/api/v1",
                description: 'Development server'
            },
        ],
        components: {
        // securitySchemes: {
        //   token: {
        //     type: 'apiKey',
        //     in: 'header',
        //     name: 'X-Auth-Token',
        //   },
        // },
        },
        // security: [{ token: [] }],
    },
    apis: [__dirname + '/handlers/**/*.ts', __dirname + '/entities/**/*.ts'],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
const apiRouter = (0, express_1.Router)();
// swagger validator
apiRouter.use(OpenApiValidator.middleware({
    apiSpec: exports.specs,
    validateRequests: {
        removeAdditional: true,
    },
    validateApiSpec: false,
    ignoreUndocumented: true,
    validateSecurity: false,
    validateResponses: false,
}));
// mount api handlers
apiRouter.use('/', main_1.default);
// apiRouter.use('/api/v1/admin', adminHandler);
// handle errors using custom middleware
apiRouter.use((err, req, res, next) => {
    // TODO: Hide the information about the error in production
    const message = (0, error_1.handleErrorMessage)(err);
    res.status(err.status || 500).json({
        status: err.status,
        message,
    });
});
exports.default = apiRouter;
//# sourceMappingURL=main.js.map