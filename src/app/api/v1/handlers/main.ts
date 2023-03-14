import { Router } from 'express';

import usersHandler from './users/main';

const cycleHandler = Router();

cycleHandler.use('/users', usersHandler);

export default cycleHandler;