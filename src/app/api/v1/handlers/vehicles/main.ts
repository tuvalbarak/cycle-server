import { Router, Response, Request, NextFunction } from 'express';
import { asyncHandler } from '../../helpers/routing';

import ElectricVehicle from '../../../../models/ElectricVehicle';
import { ApiError, HttpStatus } from '../../helpers/error';
import VehicleMeta from '../../../../models/VehiclesMeta';

const vehiclesHandler = Router();

/**
 * @swagger
 *  /Meta:
 *  get:
 *    tags:
 *      - Vehicles Meta
 *    responses:
 *      200:
 *        description: Ok
 *
 */

vehiclesHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const vehicles = <VehicleMeta[]>(await VehicleMeta.findAll());

    res.json({ code: 200, message: 'ok', data: vehicles });
}));
