import { Router } from 'express';

import driversHandler from './drivers/main';
import batteriesaHandler from './batteries/main'
import vehiclesMetaHandler from './vehicles_meta/main'
import electricVehiclesHandler from './electric_vehicles/main';

const cycleHandler = Router();

cycleHandler.use('/drivers', driversHandler);
cycleHandler.use('/batteries', batteriesaHandler);
cycleHandler.use('/vehiclesMeta', vehiclesMetaHandler);
cycleHandler.use('/electricVehicles', electricVehiclesHandler);

export default cycleHandler;

//to deploy - 
// git push cycle-server HEAD:master
// 


// brew tap heroku/brew && brew install heroku