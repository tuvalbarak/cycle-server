import { asyncHandler } from '../../helpers/routing';
import { ApiError, HttpStatus } from '../../helpers/error';
import { Router, Response, Request, NextFunction } from 'express';

import Battery from '../../../../models/Battery';
import VehicleMeta from '../../../../models/VehiclesMeta';

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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VehiclesMeta'
 *          
 */

vehiclesMetaHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const vehicles = <VehicleMeta[]>(await VehicleMeta.findAll({ 
      include: [{
        association: 'vehicles',
        include: [ { association: 'currentBattery' } ]
      }]
     }));

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

    const vehicle = await VehicleMeta.findByPk(vehicleId, {
      include: [{
        association: 'vehicles',
        include: [{ association: 'currentBattery' }]
      }]
    });

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
 *              manufacturer_battery_id:
 *                type: number
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
 *                  
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VehiclesMeta'
 */

vehiclesMetaHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      manufactureBatteryId: req.body.manufacturer_battery_id,
      brand: req.body.brand,
      model: req.body.model,
      image: req.body.image,
      year: req.body.year,
    };
    
    if (!payload.manufactureBatteryId) { throw new ApiError(HttpStatus.BAD_REQUEST, 'Battery is required') };

    const battery = await Battery.findByPk(payload.manufactureBatteryId);
    
    if (!battery) { throw new ApiError(HttpStatus.BAD_REQUEST, `Battery ${payload.manufactureBatteryId} not found`) };

    const vehicleMeta = await VehicleMeta.create(payload);

    res.json({ code: 200, message: 'ok', data: vehicleMeta.dataValues})
  })
);


export default vehiclesMetaHandler