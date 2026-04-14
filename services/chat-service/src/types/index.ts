import Multer from 'multer';

export interface Reaction {
  id: string;
  messageId: string;
  message: IMessage;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Type {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  TEXT_IMAGE = 'TEXT+IMAGE',
  TEXT_VIDEO = 'TEXT+VIDEO',
  TEXT_DOCUMENT = 'TEXT+DOCUMENT',
}

export enum Status {
  PENDING = 'PENDING',
  SENT = 'SENT',
  SEEN = 'SEEN',
  EDITED = 'EDITED',
}

export interface IMessage {
  id: string;
  chatId: string;
  sender: string;
  content: {
    images?: string[];
    audio?: string;
    document?: string;
    text?: string;
    video?: string;
  };
  fileSize?: number;
  duration?: number;
  reactions?: Reaction[];
  type: Type;
  status: Status;
}

export interface IChat {
  id?: string;
  createdBy: string;
  createdWith: string;
  lastMessageId?: string;
  lastMessageAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  clerkId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
      user?: IUser;
    }
  }
}
