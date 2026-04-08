/* eslint-disable no-undef */
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .default('4000')
    .transform((val) => parseInt(val, 10)),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  CLIENT_URL: z.string().url(),
  CALL_SERVICE_URL: z.string().url(),
  GROUP_SERVICE_URL: z.string().url(),
  CHATS_SERVICE_URL: z.string().url(),
  SOCKET_SERVICE_URL: z.string().url(),
  AUTH_SERVICE_URL: z.string().url(),
  INTERNAL_SECRET: z.string().min(1),
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
