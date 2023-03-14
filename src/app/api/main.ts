import { Router } from "express";
import { specs } from "./v1/main";
import swaggerUI from "swagger-ui-express";

import v1ApiRouter from "./v1/main";

const configRouter = Router();

// mount apis
configRouter.use("/api/v1", v1ApiRouter);

// mount swagger
configRouter.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default configRouter;
