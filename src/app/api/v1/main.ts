import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { handleErrorMessage } from './helpers/error';
import * as OpenApiValidator from 'express-openapi-validator';

import cycleHandler from './handlers/main';

const options: swaggerJsDoc.Options = {
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
  apis: process.env.NODE_ENV === "production"
  ? [__dirname + '/handlers/**/*.js', __dirname + '/entities/**/*.js']
  : [__dirname + '/handlers/**/*.ts', __dirname + '/entities/**/*.ts']
};

export const specs = swaggerJsDoc(options) as any;

const apiRouter = Router();

// swagger validator
apiRouter.use(
  OpenApiValidator.middleware({
    apiSpec: specs,
    validateRequests: {
      removeAdditional: true,
    },
    validateApiSpec: false,
    ignoreUndocumented: true,
    validateSecurity: false,
    validateResponses: false,
  })
);

// mount api handlers
apiRouter.use('/', cycleHandler);
// apiRouter.use('/api/v1/admin', adminHandler);

// handle errors using custom middleware
apiRouter.use((err: any, req: any, res: any, next: any) => {
  // TODO: Hide the information about the error in production
  const message = handleErrorMessage(err);
  res.status(err.status || 500).json({
    status: err.status,
    message,
  });
});

export default apiRouter;
