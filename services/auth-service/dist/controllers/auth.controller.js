import { env } from '@/config/environment';
import { AuthService } from '@/services/auth.service';
import logger from '@/utils/logger.utils';
import { verifyWebhook } from '@clerk/express/webhooks';
export class AuthController {
    authService;
    constructor() {
        this.authService = new AuthService();
    }
    async syncUser(req, res, next) {
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
            const data = event.data;
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
        }
        catch (error) {
            logger.error('Error syncing user:', error);
            next(error);
        }
    }
}
