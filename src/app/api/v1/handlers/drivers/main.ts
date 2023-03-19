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
 *              crystalsBalance:
 *                type: integer
 *                description: The driver's crystals balance
 *              drivingCharacteristicId:
 *                type: integer
 *                description: The driver's charecteristic object id
 *              preferenceId:
 *                type: integer
 *                description: The driver's preferences object id
 *              vehiclesHistory:
 *                type: integer
 *                description: The driver's vehicles' ids
 *    responses:
 *      200:
 *        description: Ok
 */

driversHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      email: req.body.email,
      name: req.body.name,
      thumbnail: req.body.thumbnail,
      phone: req.body.phone,
      crystalsBalance: req.body.crystalsBalance,
      drivingCharacteristicId: req.body.drivingCharacteristicId,
      preferenceId: req.body.preferenceId,
      vehiclesHistory: req.body.vehiclesHistory,
    };

    const driver = await Driver.create(payload);

    res.json({ code: 200, message: 'ok', data: driver.dataValues})
  })
);


export default driversHandler