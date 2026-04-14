import { env } from '@/config/environment';
import { PrismaClient } from '@/generated/prisma/client';
import logger from '@/utils/logger.utils';
import { PrismaPg } from '@prisma/adapter-pg';

export class PrismaService extends PrismaClient implements PrismaClient {
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: env.DATABASE_URL,
      }),
    });
    logger.info('Prisma connected successfully.');
  }
}

export default PrismaService;
