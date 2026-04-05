import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .default('4002')
    .transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  CLIENT_URL: z.string().url(),
  CALL_SERVICE_URL: z.string().url(),
  GROUP_SERVICE_URL: z.string().url(),
  SOCKET_SERVICE_URL: z.string().url(),
  KAFKA_BROKERS: z.string().default('localhost:9092'),
  KAFKA_CLIENT_ID: z.string().default('chat-service'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Environment variable validation failed:',
    parsedEnv.error.format(),
  );
  process.exit(1);
}

export const env = parsedEnv.data;
