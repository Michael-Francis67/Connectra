import { z } from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .default('4002')
    .transform((val) => parseInt(val, 10)),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string().url(),
  API_GATEWAY_URL: z.string().url(),
  AUTH_SERVICE_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  INTERNAL_SECRET: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().min(1),
  AWS_BUCKET_NAME: z.string().min(1),
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
