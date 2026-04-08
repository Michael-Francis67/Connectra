import { env } from '@/config/environment.ts';
import { AuthService } from '@/services/auth.service.ts';
import logger from '@/utils/logger.utils.ts';
import { clerkWebhookSchema } from '@/validations/clerk-webhook.validation.ts';
import type { UserJSON } from '@clerk/express';
import { verifyWebhook } from '@clerk/express/webhooks';
import type { Request, Response, NextFunction } from 'express';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  public async syncUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // console.log('Webhook data:', req.body);
      // const { error } = clerkWebhookSchema.validate(req.body, {
      //   abortEarly: false,
      // });

      // if (error) {
      //   logger.error('Validation failed:', error.details);
      //   res.status(400).json({
      //     message: 'Invalid webhook payload',
      //     errors: error.details.map((err) => err.message),
      //   });
      //   return;
      // }

      const event = await verifyWebhook(req, {
        signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
      });

      const data = event.data as UserJSON;
      const type = event.type;

      switch (type) {
        case 'user.created':
          await this.authService.createUser(data);
          break;
        case 'user.updated':
          await this.authService.updateUser(data);
          break;
        case 'user.deleted':
          await this.authService.deleteUser(data.id);
          break;
        default:
          break;
      }

      res.status(200).send({ message: 'User synced successfully' });
    } catch (error) {
      logger.error('Error syncing user:', error);
      next(error);
    }
  }
}
