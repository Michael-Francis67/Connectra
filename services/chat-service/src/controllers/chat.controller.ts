import { ChatService } from '@/services/chat.service';
import type { Request, Response, NextFunction } from 'express';

export class ChatController {
  private readonly chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }
  getHello(_req: Request, res: Response, _next: NextFunction) {
    const response = this.chatService.getHello();
    res.status(200).json({ message: response });
  }
}
