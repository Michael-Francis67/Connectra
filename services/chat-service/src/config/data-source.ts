import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './environment.ts';
import { Chat } from '../entities/Chat.ts';
import { Message } from '../entities/Message.ts';
import { Reaction } from '../entities/Reactions.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Chat, Message, Reaction],
  migrations: [],
  subscribers: [],
});
