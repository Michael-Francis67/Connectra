import { IChat, IMessage, IUser } from '@/types';
import PrismaService from './prisma.service';
import { Message, Type } from '@/generated/prisma/client';
import { env } from '@/config/environment';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '@/utils/api-error.util';

export class ChatService extends PrismaService {
  getHello(): string {
    return 'Hello from chat service';
  }

  async getUser(id: string): Promise<IUser | null> {
    const response = await fetch(`${env.AUTH_SERVICE_URL}/users/${id}`, {
      method: 'GET',
    });

    const user = (await response.json()) as IUser;

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return user;
  }

  async getUserChats(userId: string): Promise<IChat[] | null> {
    return this.chat.findMany({
      where: {
        OR: [
          {
            createdBy: userId,
          },
          {
            createdWith: userId,
          },
        ],
      },
    });
  }

  async getChatMessages(chatId: string): Promise<Message[] | null> {
    return this.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        reactions: true,
        content: true,
      },
    });
  }

  async createChat(
    currentUserId: string,
    otherUserId: string,
  ): Promise<IChat | null> {
    const chatExists = await this.chat.findFirst({
      where: {
        createdBy: currentUserId,
        createdWith: otherUserId,
      },
    });

    if (chatExists) {
      throw new ConflictError('Chat already exists.');
    }

    return this.chat.create({
      data: {
        createdBy: currentUserId,
        createdWith: otherUserId,
      },
    });
  }

  async deleteChat(chatId: string): Promise<IChat | null> {
    return this.chat.delete({
      where: {
        id: chatId,
      },
    });
  }

  async sendMessage(
    sender: string,
    data: {
      images: string[];
      audio: string;
      document: string;
      text: string;
      video: string;
      chatId: string;
      duration: number;
      fileSize: number;
      type: Type;
    },
  ): Promise<Message | null> {
    const chat = await this.chat.findUnique({
      where: {
        id: data.chatId,
      },
    });

    if (!chat) {
      throw new NotFoundError('No chat exists with this id.');
    }

    return this.message.create({
      data: {
        sender,
        content: {
          create: {
            images: data.images,
            audio: data.audio,
            document: data.document,
            text: data.text,
            video: data.video,
          },
        },
        chatId: data.chatId,
        fileSize: data.fileSize,
        duration: data.duration,
        type: data.type,
      },
      include: {
        content: true,
      },
    });
  }

  async editMessage(messageId: string, text: string): Promise<Message | null> {
    const message = await this.message.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!message) {
      throw new NotFoundError('No message exists to be edited.');
    }

    const messageContent = await this.content.findUnique({
      where: {
        messageId: message.id,
      },
    });

    if (!messageContent || !messageContent.text) {
      throw new BadRequestError(
        'A message text is required to edit this message.',
      );
    }

    return this.message.update({
      where: {
        id: messageId,
      },
      data: {
        content: {
          update: {
            text,
          },
        },
      },
    });
  }

  async deleteMessage(messageId: string): Promise<Message | null> {
    return this.message.delete({
      where: {
        id: messageId,
      },
    });
  }
}
