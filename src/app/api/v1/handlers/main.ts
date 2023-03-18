import { Router } from 'express';

import driversHandler from './drivers/main';
import vehiclesMetaHandler from './vehicles/main'

const cycleHandler = Router();

cycleHandler.use('/users', driversHandler);
cycleHandler.use('/vehiclesMeta', vehiclesMetaHandler);

export default cycleHandler;