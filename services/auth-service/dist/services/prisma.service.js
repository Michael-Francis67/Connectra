import { env } from '@/config/environment';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
class PrismaService {
    prisma;
    adapter;
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
