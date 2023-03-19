import { Router } from 'express';

import driversHandler from './drivers/main';
import vehiclesMetaHandler from './vehicles/main'
import batteriesaHandler from './batteries/main'

const cycleHandler = Router();

cycleHandler.use('/drivers', driversHandler);
cycleHandler.use('/vehiclesMeta', vehiclesMetaHandler);
cycleHandler.use('/batteries', batteriesaHandler);

export default cycleHandler;

//to deploy - 
// git push cycle-server HEAD:master
// 


// brew tap heroku/brew && brew install heroku