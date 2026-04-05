import { clerkClient, getAuth, UserJSON } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
  constructor() {
    console.log('Auth Middleware');
  }

  async protected(req: Request, res: Response, next: NextFunction) {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = (await clerkClient.users.getUser(
      userId as string,
    )) as unknown as UserJSON;

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    next();
  }
}

export default new AuthMiddleware();
