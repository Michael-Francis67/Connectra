import type { UserJSON } from '@clerk/express';

declare global {
  namespace Express {
    interface Request {
      user?: UserJSON;
    }
  }
}
