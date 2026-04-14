import { env } from '@/config/environment';
import { Type } from '@/generated/prisma/enums';
import { getFileDuration } from '@/lib/duration';
import { s3 } from '@/lib/s3';
import { io } from '@/server';
import { ChatService } from '@/services/chat.service';
import { IUser } from '@/types';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/api-error.util';
import { ApiResponse } from '@/utils/apiResponse.utils';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import type { Request, Response, NextFunction } from 'express';
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';

export class ChatController extends ApiResponse {
  private readonly chatService: ChatService;

  constructor() {
    super();
    this.chatService = new ChatService();
  }
  getHello(_req: Request, res: Response, _next: NextFunction) {
    const text = this.chatService.getHello();
    res.status(200).json({ message: text });
  }

  async getUserChats(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const chats = await this.chatService.getUserChats(id as string);

      if (!chats) {
        throw new NotFoundError('No chats found');
      }

      const otherUsers = await Promise.all(
        chats.map(async (chat) => {
          const user = await this.chatService.getUser(chat.createdWith);
          return user;
        }),
      );

      this.success(res, 'Chats fetched successfully.', { chats, otherUsers });
    } catch (error) {
      next(error);
    }
  }

  async getChatMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.params;

      if (!chatId) {
        throw new BadRequestError('Chat id is required');
      }

      const messages = await this.chatService.getChatMessages(chatId as string);

      this.success(res, 'Chat messages fetched successfully.', messages);
    } catch (error) {
      next(error);
    }
  }

  async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { otherUserId } = req.body;
      const user = req.user;

      if (!user) {
        throw new UnauthorizedError('Unauthorized - login first.');
      }

      const chat = await this.chatService.createChat(
        user.id,
        otherUserId as string,
      );

      this.success(res, 'Chat created successfully.', chat, 201);
    } catch (error) {
      next(error);
    }
  }

  async deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.params;
      await this.chatService.deleteChat(chatId as string);

      this.success(res, 'Chat deleted successfully.');
    } catch (error) {
      next(error);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { images, audio, video, document, text } = req.body;
      const { chatId } = req.params;
      const user = req.user;

      if (!user) {
        throw new UnauthorizedError('Unauthorized - login first.');
      }

      if (!chatId) {
        throw new BadRequestError('Chat id is required');
      }

      const fileBuffer = req.file?.buffer as Buffer;

      if (images && images.length > 0) {
        interface ImageInput {
          buffer: Buffer;
        }

        const formattedImages: Promise<Buffer>[] = images.map(
          async (image: ImageInput): Promise<Buffer> => {
            return await sharp(image.buffer)
              .resize(800)
              .jpeg({ quality: 80 })
              .toBuffer();
          },
        );
      }

      const type =
        images && text
          ? Type.TEXT_IMAGE
          : video && text
            ? Type.TEXT_VIDEO
            : document && text
              ? Type.TEXT_DOCUMENT
              : text
                ? Type.TEXT
                : audio
                  ? Type.AUDIO
                  : video
                    ? Type.VIDEO
                    : document
                      ? Type.DOCUMENT
                      : Type.TEXT;

      const urls = await Promise.all(
        images.map(async (image: any) => {
          const fileType = await fileTypeFromBuffer(image.buffer);
          const fileName = image.originalname;
          const params = {
            Bucket: env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: image.buffer,
            ContentType: fileType?.mime,
          };

          const command = new PutObjectCommand(params);
          await s3.send(command);

          return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${fileName}`;
        }),
      );

      const duration = await getFileDuration(req.file as Express.Multer.File);

      const message = await this.chatService.sendMessage(user.id, {
        chatId: chatId as string,
        images: urls as string[],
        audio: audio as string,
        document: document as string,
        text: text as string,
        video: video as string,
        fileSize: parseInt(req.file?.size as unknown as string),
        duration: Math.floor(duration as number),
        type,
      });

      this.success(res, 'Message sent successfully.', message, 201);
    } catch (error) {
      next(error);
    }
  }

  async editMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const { text } = req.body;

      if (!text) {
        throw new BadRequestError('Text is required to edit a message');
      }

      const editedMessage = await this.chatService.editMessage(
        messageId as string,
        text,
      );

      this.success(res, 'Message edited successfully.', editedMessage);
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;

      if (!messageId) {
        throw new BadRequestError(
          'Message id must be required to delete a message.',
        );
      }

      const message = await this.chatService.deleteMessage(messageId as string);

      this.success(res, 'Message deleted successfully.', message);
    } catch (error) {
      next(error);
    }
  }

  getFileCategory(mimeType: string): string {
    if (mimeType.startsWith('image/')) {
      return 'image';
    } else if (mimeType.startsWith('video/')) {
      return 'video';
    } else if (mimeType.startsWith('audio/')) {
      return 'audio';
    } else if (
      mimeType === 'application/pdf' ||
      mimeType.includes('word') ||
      mimeType.includes('excel') ||
      mimeType.includes('powerpoint') ||
      mimeType.includes('officedocument')
    ) {
      return 'document';
    }
    return 'unknown';
  }

  async uploadToS3(file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }): Promise<string> {
    const fileName = file.originalname;

    const params = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${fileName}`;
  }
}
