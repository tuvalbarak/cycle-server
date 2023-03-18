import { Router, Response, Request, NextFunction } from 'express';
import { asyncHandler } from '../../helpers/routing';

import VehicleMeta from '../../../../models/VehiclesMeta';
import { ApiError, HttpStatus } from '../../helpers/error';

const vehiclesMetaHandler = Router();

/**
 * @swagger
 *  /vehiclesMeta:
 *  get:
 *    tags:
 *      - Vehicles Meta
 *    responses:
 *      200:
 *        description: Ok
 *
 */

vehiclesMetaHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const vehicles = <VehicleMeta[]>(await VehicleMeta.findAll());

    res.json({ code: 200, message: 'ok', data: vehicles });
}));

/**
 * @swagger
 *  /vehiclesMeta/{id}:
 *  get:
 *    tags:
 *      - Vehicles Meta
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid vehicle id
 *        required: true
 *        in: path
 *    responses:
 *      200:
 *        description: Ok
 *
 */

vehiclesMetaHandler.get('/:id', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const vehicleId = req.params.id;

    const vehicle = await VehicleMeta.findByPk(vehicleId);

    if (!vehicle) throw new ApiError(HttpStatus.BAD_REQUEST, `Vehicle ${vehicleId} not found`);

    res.json({ code: 200, message: 'ok', data: vehicle });
}));

export default vehiclesMetaHandler