import { env } from '@/config/environment.ts';
import type { AuthService } from '@/services/auth.service.ts';
import logger from '@/utils/logger.utils.ts';
import type { UserJSON } from '@clerk/express';
import { verifyWebhook } from '@clerk/express/webhooks';
import type { Request, Response, NextFunction } from 'express';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  public async syncUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const event = await verifyWebhook(req, {
        signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
      });

      logger.info('Received Clerk webhook event:', event);

      // Handle the event based on its type
      // Send a response

      const data = event.data;

      res.status(200).json({ message: 'User synced successfully' });
    } catch (error) {
      logger.error('Error syncing user:', error);
      next(error);
    }
  }
}
