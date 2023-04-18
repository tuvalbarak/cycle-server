import { Router } from 'express';

import authHandler from './auth/main';
import usersHandler from './users/main';
import batteriesaHandler from './batteries/main';
import vehiclesMetaHandler from './vehicles_meta/main';
import electricVehiclesHandler from './electric_vehicles/main';

const cycleHandler = Router();

cycleHandler.use('/auth', authHandler);
cycleHandler.use('/users', usersHandler);
cycleHandler.use('/batteries', batteriesaHandler);
cycleHandler.use('/vehiclesMeta', vehiclesMetaHandler);
cycleHandler.use('/electricVehicles', electricVehiclesHandler);

export default cycleHandler;
