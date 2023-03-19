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

/**
 * @swagger
 *  /vehiclesMeta:
 *  post:
 *    tags:
 *      - Vehicles Meta
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              manufacturer:
 *                type: Battery
 *                description: The vehicle's orinial manufacturer battery
 *              brand:
 *                type: string
 *                description: The vehicle's brand
 *              model:
 *                type: string
 *                description: The vehicle's model
 *              image:
 *                type: string
 *                description: The vehicle's image
 *              year:
 *                type: integer
 *                description: The vehicle's year
 *              vehicles:
 *                type: ElectricVehicle[]
 *                description: List of vehicles
 *    responses:
 *      200:
 *        description: Ok
 */

vehiclesMetaHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      manufactureBattery: req.body.manufactureBattery,
      brand: req.body.brand,
      model: req.body.model,
      image: req.body.image,
      year: req.body.year,
      vehicles: req.body.vehicles
    };

    const vehicleMeta = await VehicleMeta.create(payload);

    res.json({ code: 200, message: 'ok', data: vehicleMeta.dataValues})
  })
);


export default vehiclesMetaHandler