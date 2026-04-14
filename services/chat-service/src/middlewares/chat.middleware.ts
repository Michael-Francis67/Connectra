import { env } from '@/config/environment';
import { IUser } from '@/types';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/api-error.util';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class ChatMiddleware {
  async protect(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.headers['x-user-id'];
      const secret = env.INTERNAL_SECRET;

      if (!secret) {
        throw new BadRequestError('No secret available.');
      }

      if (!userId) {
        throw new UnauthorizedError('Unauthorized - no user id found.');
      }

      const decoded = jwt.verify(userId as string, secret, {
        algorithms: ['HS256'],
        issuer: 'api-gateway',
        audience: 'chat-service',
      }) as { id: string };

      const response = await fetch(
        `${process.env.AUTH_SERVICE_URL}/users/${decoded.id}`,
        {
          method: 'GET',
        },
      );

      const user = (await response.json()) as IUser;

      if (!user) {
        throw new NotFoundError('User not found.');
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
}
