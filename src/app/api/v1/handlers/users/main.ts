import { Router, Response, Request, NextFunction } from 'express';
import { asyncHandler } from '../../helpers/routing';

import User from '../../../../models/User';
import { ApiError, HttpStatus } from '../../helpers/error';

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

usersHandler.get('/', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = <User[]>(await User.findAll());

    res.json({ code: 200, message: 'ok', data: users });
}));

/**
 * @swagger
 *  /users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid user id
 *        required: true
 *        in: path
 *    responses:
 *      200:
 *        description: Ok
 *
 */

usersHandler.get('/:id', 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) throw new ApiError(HttpStatus.BAD_REQUEST, `User ${userId} not found`);

    res.json({ code: 200, message: 'ok', data: user });
}));

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
 *              email:
 *                type: string
 *                description: The user's email
 *              first_name:
 *                type: string
 *                description: The user's first name
 *              last_name:
 *                type: string
 *                description: The user's last name
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

usersHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      email: req.body.email,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    };

    const user = await User.create(payload);

    res.json({ code: 200, message: 'ok', data: user.dataValues})
  })
);


export default usersHandler