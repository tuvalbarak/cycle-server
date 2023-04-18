import { Router, Response, Request, NextFunction } from 'express';
import { asyncHandler } from '../../helpers/routing';

import User from '../../../../models/User';

import { ApiError, HttpStatus } from '../../helpers/error';
import { generateTokenAndSetHeader } from '../../../helpers/authentication/jwt';

const authHandler = Router();

/**
 * @swagger
 *  /auth:
 *  post:
 *    tags:
 *      - Auth
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
 *              phone:
 *                type: string
 *                description: The user's phone number
 *    responses:
 *      200:
 *        description: Ok
 */

authHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      googleId: req.body.google_id,
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
    };

    const [user] = await User.findOrCreate({
      where: { googleId: payload.googleId },
      defaults: {
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
      },
    });

    generateTokenAndSetHeader(res, user);

    res.json({ code: 200, message: 'ok', data: user.dataValues });
  })
);

export default authHandler;
