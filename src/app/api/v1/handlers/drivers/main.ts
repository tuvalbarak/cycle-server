import { Router, Response, Request, NextFunction } from 'express';
import { asyncHandler } from '../../helpers/routing';

import Driver from '../../../../models/Driver';
import { ApiError, HttpStatus } from '../../helpers/error';

const driversHandler = Router();

/**
 * @swagger
 *  /drivers:
 *  get:
 *    tags:
 *      - Drivers
 *    responses:
 *      200:
 *        description: Ok
 *
 */

driversHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const drivers = <Driver[]>(await Driver.findAll());

    res.json({ code: 200, message: 'ok', data: drivers });
}));

/**
 * @swagger
 *  /drivers/{id}:
 *  get:
 *    tags:
 *      - Drivers
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid driver id
 *        required: true
 *        in: path
 *    responses:
 *      200:
 *        description: Ok
 *
 */

driversHandler.get('/:id', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.params.id;

    const driver = await Driver.findByPk(driverId);

    if (!driver) throw new ApiError(HttpStatus.BAD_REQUEST, `Driver ${driverId} not found`);

    res.json({ code: 200, message: 'ok', data: driver });
}));

/**
 * @swagger
 *  /drivers:
 *  post:
 *    tags:
 *      - Drivers
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              google_id:
 *                type: number
 *              email:
 *                type: string
 *                description: The driver's email
 *              name:
 *                type: string
 *                description: The driver's name
 *              thumbnail:
 *                type: string
 *                description: The driver's image thumbnail
 *              phone:
 *                type: string
 *                description: The driver's phone number
 *              crystals_balance:
 *                type: number
 *                description: The driver's crystals balance
 *              driving_characteristic_id:
 *                type: number
 *                description: The driver's charecteristic object id
 *              preference_id:
 *                type: number
 *                description: The driver's preferences object id
 *              last_vehicle_used_id:
 *                type: number
 *              vehicles_history:
 *                type: array
 *                items:
 *                  type: number
 *                  properties:
 *                    id:
 *                      type: number
 *    responses:
 *      200:
 *        description: Ok
 */

driversHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      googleId: req.body.google_id,
      email: req.body.email,
      name: req.body.name,
      thumbnail: req.body.thumbnail,
      phone: req.body.phone,
      crystalsBalance: req.body.crystals_balance,
      drivingCharacteristicId: req.body.driving_characteristic_id,
      preferenceId: req.body.preference_id,
      lastVehicleUsedId: req.body.last_vehicle_used_id,
      vehiclesHistory: req.body.vehicles_history,
    };

    const driver = await Driver.create(payload);

    res.json({ code: 200, message: 'ok', data: driver.dataValues})
  })
);

/**
 * @swagger
 *  /drivers/{id}:
 *  patch:
 *    tags:
 *      - Drivers
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid vehicle id
 *        in: path
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              google_id:
 *                type: number
 *              email:
 *                type: string
 *                description: The driver's email
 *              name:
 *                type: string
 *                description: The driver's name
 *              thumbnail:
 *                type: string
 *                description: The driver's image thumbnail
 *              phone:
 *                type: string
 *                description: The driver's phone number
 *              crystals_balance:
 *                type: number
 *                description: The driver's crystals balance
 *              driving_characteristic_id:
 *                type: number
 *                description: The driver's charecteristic object id
 *              preference_id:
 *                type: number
 *                description: The driver's preferences object id
 *              last_vehicle_used_id:
 *                type: number
 *              vehicles_history:
 *                type: array
 *                items:
 *                  type: number
 *                  properties:
 *                    id:
 *                      type: number
 *    responses:
 *      200:
 *        description: Ok
 */

driversHandler.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      googleId: req.body.google_id,
      email: req.body.email,
      name: req.body.name,
      thumbnail: req.body.thumbnail,
      phone: req.body.phone,
      crystalsBalance: req.body.crystals_balance,
      drivingCharacteristicId: req.body.driving_characteristic_id,
      preferenceId: req.body.preference_id,
      lastVehicleUsedId: req.body.last_vehicle_used_id,
      vehiclesHistory: req.body.vehicles_history,
    };

    let driver = await Driver.findByPk(req.params.id);

    if (!driver) { throw new ApiError(HttpStatus.BAD_REQUEST, `Driver ${req.params.id} not found`) };

    driver = await driver.update(payload, { hooks: true });
    res.json({ code: 200, message: 'ok', data: driver.dataValues})
  })
);


export default driversHandler