import { Router } from 'express';
import { isAuth } from '../../helpers/authentication/jwt';

import authHandler from './auth/main';
import usersHandler from './users/main';
import batteriesaHandler from './batteries/main';
import vehiclesMetaHandler from './vehicles_meta/main';
import electricVehiclesHandler from './electric_vehicles/main';
import chargingStationsHandler from './charging_stations/main';

const cycleHandler = Router();

cycleHandler.use('/auth', authHandler);
cycleHandler.use('/users', isAuth(), usersHandler);
cycleHandler.use('/batteries', isAuth(), batteriesaHandler);
cycleHandler.use('/vehiclesMeta', isAuth(), vehiclesMetaHandler);
cycleHandler.use('/electricVehicles', isAuth(), electricVehiclesHandler);
cycleHandler.use('/chargingStations', isAuth(), chargingStationsHandler);

export default cycleHandler;
