import { Router } from 'express';
import { ChatController } from '@/controllers/chat.controller';
import { ChatMiddleware } from '@/middlewares/chat.middleware';
import { upload } from '@/lib/multer';

const chatRoute: Router = Router();
const chatController = new ChatController();
const chatMiddleware = new ChatMiddleware();

chatRoute.get('/hello', chatController.getHello.bind(chatController));

chatRoute.use(chatMiddleware.protect.bind(chatMiddleware));

chatRoute.get('/:id', chatController.getUserChats.bind(chatController));
chatRoute.get('/:chatId', chatController.getChatMessages.bind(chatController));

chatRoute.post('/chat', chatController.createChat.bind(chatController));
chatRoute.post(
  '/message/:chatId',
  upload.array('files'),
  chatController.sendMessage.bind(chatController),
);

chatRoute.patch(
  '/:messageId',
  upload.array('files'),
  chatController.editMessage.bind(chatController),
);

chatRoute.delete(
  '/chat/:chatId',
  chatController.deleteChat.bind(chatController),
);
chatRoute.delete(
  '/message/:messageId',
  chatController.deleteMessage.bind(chatController),
);

export default chatRoute;
