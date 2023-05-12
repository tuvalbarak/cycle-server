import * as dotenv from "dotenv"
dotenv.config();

import { seedChargingStations } from './tasks/seedChargingStations';

import repl from 'repl';
import connect from "./config/initializers/database";


// create a new database connection
const connection = connect();
const replServer = repl.start();

const models = connection.models;
for (let key in models) {
    replServer.context[key] = models[key];
};

replServer.context.seedChargingStations = seedChargingStations;
