import { asyncHandler } from '../../helpers/routing';
import { ApiError, HttpStatus } from '../../helpers/error';
import { Router, Response, Request, NextFunction } from 'express';

import Battery from '../../../../models/Battery';
import VehicleMeta from '../../../../models/VehiclesMeta';
import ElectricVehicle from '../../../../models/ElectricVehicle';

const electricVehiclesHandler = Router();

/**
 * @swagger
 *  /electricVehicles:
 *  get:
 *    tags:
 *      - Electric Vehicles
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ElectricVehicle'
 *          
 */

electricVehiclesHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const electricVehicles = <ElectricVehicle[]>(await ElectricVehicle.findAll());

    res.json({ code: 200, message: 'ok', data: electricVehicles });
}));

/**
 * @swagger
 *  /electricVehicles/{id}:
 *  get:
 *    tags:
 *      - Electric Vehicles
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

electricVehiclesHandler.get('/:id', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const vehicleId = req.params.id;

    const electricVehicle = await VehicleMeta.findByPk(vehicleId);

    if (!electricVehicle) throw new ApiError(HttpStatus.BAD_REQUEST, `Vehicle ${vehicleId} not found`);

    res.json({ code: 200, message: 'ok', data: electricVehicle });
}));

/**
 * @swagger
 *  /vehiclesMeta:
 *  post:
 *    tags:
 *      - Electric Vehicles
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              currentBatteryId:
 *                type: number
 *              vehicleMetaId:
 *                type: number
 *                description: meta id
 *                  
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ElectricVehicle'
 */

electricVehiclesHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      currentBatteryId: req.body.current_battery_id,
      vehicleMetaId: req.body.vehicle_meta_id,
    };
    
    if (!payload.currentBatteryId) { throw new ApiError(HttpStatus.BAD_REQUEST, 'currentBatteryId is required') };
    if (!payload.vehicleMetaId) { throw new ApiError(HttpStatus.BAD_REQUEST, 'vehicleMetaId is required') };

    const battery = await Battery.findByPk(payload.currentBatteryId);
    const vehicleMeta = await VehicleMeta.findByPk(payload.vehicleMetaId)
    
    if (!battery) { throw new ApiError(HttpStatus.BAD_REQUEST, `Battery ${payload.currentBatteryId} not found`) };
    if (!vehicleMeta) { throw new ApiError(HttpStatus.BAD_REQUEST, `Battery ${payload.currentBatteryId} not found`) };


    const electricVehicle = await ElectricVehicle.create(payload);

    res.json({ code: 200, message: 'ok', data: electricVehicle.dataValues})
  })
);


export default electricVehiclesHandler