import { asyncHandler } from '../../helpers/routing';
import { ApiError, HttpStatus } from '../../helpers/error';
import { Router, Response, Request, NextFunction } from 'express';

import User from '../../../../models/User';
import UserPreferance from '../../../../models/UserPreferance';

import { Landscape } from '../../../../models/UserPreferance';

const usersHandler = Router();

/**
 * @swagger
 *  /users:
 *  get:
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Ok
 *
 */

usersHandler.get(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = <User[]>(
      await User.findAll({ include: [{ association: 'preference' }] })
    );

    res.json({ code: 200, message: 'ok', data: users });
  })
);

/**
 * @swagger
 *  /users/me:
 *  get:
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Ok
 *
 */

usersHandler.get(
  '/me',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = <User>req['user'];
    await user.reload({ include: [{ association: 'preference' }] });

    res.json({ code: 200, message: 'ok', data: user });
  })
);

/**
 * @swagger
 *  /users:
 *  post:
 *    tags:
 *      - Users
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
 *                description: The user's email
 *              name:
 *                type: string
 *                description: The user's name
 *              thumbnail:
 *                type: string
 *                description: The user's image thumbnail
 *              phone:
 *                type: string
 *                description: The user's phone number
 *              crystals_balance:
 *                type: number
 *                description: The user's crystals balance
 *              driving_characteristic_id:
 *                type: number
 *                description: The user's charecteristic object id
 *              preference_id:
 *                type: number
 *                description: The user's preferences object id
 *              last_vehicle_used_id:
 *                type: number
 *              vehicles_history:
 *                type: array
 *                items:
 *                  type: number
 *    responses:
 *      200:
 *        description: Ok
 */

usersHandler.post(
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

    const user = await User.create(payload);
    await UserPreferance.create({
      userId: user.id,
      areNotificationAllowed: true,
      areTollRoadsAllowed: true,
      areMultipleChargingStopsAllowed: true,
      roadLandscape: 'Nature',
    });

    await user.reload({ include: [{ association: 'preference' }] });

    res.json({ code: 200, message: 'ok', data: user.dataValues });
  })
);

/**
 * @swagger
 *  /users/{id}:
 *  patch:
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid user id
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
 *                description: The user's email
 *              name:
 *                type: string
 *                description: The user's name
 *              thumbnail:
 *                type: string
 *                description: The user's image thumbnail
 *              phone:
 *                type: string
 *                description: The user's phone number
 *              crystals_balance:
 *                type: number
 *                description: The user's crystals balance
 *              driving_characteristic_id:
 *                type: number
 *                description: The user's charecteristic object id
 *              last_vehicle_used_id:
 *                type: number
 *              preference:
 *                type: object
 *                properties:
 *                  are_notification_allowed:
 *                    type: boolean
 *                  are_toll_roads_allowed:
 *                    type: boolean
 *                  are_multiple_charging_stops_allowed:
 *                    type: boolean
 *                  road_landscape:
 *                    type: string
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

usersHandler.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userPayload = {
      googleId: req.body.google_id,
      email: req.body.email,
      name: req.body.name,
      thumbnail: req.body.thumbnail,
      phone: req.body.phone,
      crystalsBalance: req.body.crystals_balance,
      drivingCharacteristicId: req.body.driving_characteristic_id,
      lastVehicleUsedId: req.body.last_vehicle_used_id,
      vehiclesHistory: req.body.vehicles_history,
      preference: {
        areNotificationAllowed: req.body.preference.are_notification_allowed,
        areTollRoadsAllowed: req.body.preference.are_toll_roads_allowed,
        areMultipleChargingStopsAllowed:
          req.body.preference.are_multiple_charging_stops_allowed,
        roadLandscape: req.body.preference.road_landscape,
      },
    };

    let user = await User.findByPk(req.params.id, {
      include: [{ association: 'preference' }],
    });

    if (!user) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `User ${req.params.id} not found`
      );
    }

    user = await user.update(userPayload, { hooks: true });

    res.json({ code: 200, message: 'ok', data: user.dataValues });
  })
);

export default usersHandler;
