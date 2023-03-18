import { Router } from 'express';

import driversHandler from './drivers/main';

const cycleHandler = Router();

cycleHandler.use('/users', driversHandler);

export default cycleHandler;