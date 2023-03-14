import express from "express";
import connect from './config/initializers/database';

import configRouter from "./app/api/main";

// create a new database connection
export const connection = connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(configRouter);

export default app;
