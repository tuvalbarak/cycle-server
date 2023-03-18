import { Router } from 'express';

import driversHandler from './drivers/main';
import vehiclesMetaHandler from './vehicles/main'

const cycleHandler = Router();

cycleHandler.use('/drivers', driversHandler);
cycleHandler.use('/vehiclesMeta', vehiclesMetaHandler);

export default cycleHandler;

//to deploy - 
// git push cycle-server HEAD:master
// 


// brew tap heroku/brew && brew install heroku