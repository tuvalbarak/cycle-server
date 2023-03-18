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
 *              first_name:
 *                type: string
 *                description: The driver's first name
 *              last_name:
 *                type: string
 *                description: The driver's last name
 *              username:
 *                type: string
 *                description: The user's username
 *              password:
 *                type: string
 *                description: The user's password
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
      drivingCharecteristicId: req.body.drivingCharecteristicId,
      preferanceId: req.body.preferanceId,
      vehiclesHistory: req.body.vehiclesHistory,
    };

    const driver = await Driver.create(payload);

    res.json({ code: 200, message: 'ok', data: driver.dataValues})
  })
);


export default driversHandler