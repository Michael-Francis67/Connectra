import { Router } from 'express';
import { ChatController } from '@/controllers/chat.controller';

const chatRoute: Router = Router();
const chatController = new ChatController();

chatRoute.get('/hello', chatController.getHello.bind(chatController));

export default chatRoute;
