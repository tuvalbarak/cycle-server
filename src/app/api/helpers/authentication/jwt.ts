import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { ApiError, HttpStatus } from '../../v1/helpers/error';
import { asyncHandler } from '../../v1/helpers/routing';

import User from '../../../models/User';

import * as dotenv from 'dotenv';
dotenv.config();

export const generateTokenAndSetHeader = (res: Response, instance: User) => {
  const token = jwt.sign(
    {
      id: instance.id,
      googleId: instance.googleId,
      email: instance.email,
    },
    process.env.JWT_TOKEN_SECRET
  );

  res.set('X-Auth-Token', token);
};

export const isAuth = () =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('X-Auth-Token');
    if (!token) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (!decodedToken)
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');

    const user = await User.findByPk(decodedToken['id']);

    if (!user) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'User not found, invalid data'
      );
    }

    req['user'] = user;
    next();
  });
