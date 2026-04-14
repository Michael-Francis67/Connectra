import type { User } from '@/generated/prisma/client.js';
import PrismaService from './prisma.service.js';

export class UserService {
  private prisma = new PrismaService().getPrisma();

  constructor() {
    this.prisma = new PrismaService().getPrisma();
  }

  async getUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });
  }
}
