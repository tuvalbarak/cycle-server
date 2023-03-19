import { asyncHandler } from '../../helpers/routing';
import { ApiError, HttpStatus } from '../../helpers/error';
import { Router, Response, Request, NextFunction } from 'express';
import Battery from '../../../../models/Battery';

const batteriesHandler = Router();


/**
 * @swagger
 *  /Batteries:
 *  get:
 *    tags:
 *      - Batteries
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Battery'
 *          
 */

batteriesHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const batteries = <Battery[]>(await Battery.findAll());

    res.json({ code: 200, message: 'ok', data: batteries });
}));

/**
 * @swagger
 *  /Batteries:
 *  post:
 *    tags:
 *      - Batteries
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              range_capacity:
 *                type: number
 *              battery_capacity:
 *                type: number
 *              consumption_per_km:
 *                type: number
 *              percentage:
 *                type: number
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VehiclesMeta'
 */

batteriesHandler.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const payload = {
        rangeCapacity: req.body.range_capacity,
        batteryCapacity: req.body.battery_capacity,
        consumptionPerKm: req.body.consumption_per_km,
        percentage: req.body.percentage,
      };
      
      if (!payload.rangeCapacity) { throw new ApiError(HttpStatus.BAD_REQUEST, 'rangeCapacity is required') };
      if (!payload.batteryCapacity) { throw new ApiError(HttpStatus.BAD_REQUEST, 'batteryCapacity is required') };
      if (!payload.consumptionPerKm) { throw new ApiError(HttpStatus.BAD_REQUEST, 'consumptionPerKm is required') };
  
      const battery = await Battery.create(payload);
  
      res.json({ code: 200, message: 'ok', data: battery.dataValues})
    })
  );
  


export default batteriesHandler;