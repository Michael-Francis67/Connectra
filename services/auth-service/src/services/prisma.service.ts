import { env } from '@/config/environment.ts';
import { PrismaClient } from '@/generated/prisma/client.ts';
import { Prisma } from '@/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

class PrismaService {
  private prisma: PrismaClient;
  private adapter: PrismaPg;

  constructor() {
    this.adapter = new PrismaPg({
      connectionString: env.DATABASE_URL,
    });
    this.prisma = new PrismaClient({
      adapter: this.adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  getPrisma() {
    return this.prisma;
  }

  getInstance() {
    return this.prisma;
  }

  async close() {
    await this.prisma.$disconnect();
  }

  async connect() {
    await this.prisma.$connect();
  }
}

export default PrismaService;
