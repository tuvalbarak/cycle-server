import { Router } from 'express';

import driversHandler from './users/main';

const cycleHandler = Router();

cycleHandler.use('/users', driversHandler);

export default cycleHandler;