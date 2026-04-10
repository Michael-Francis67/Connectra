import type { User } from '@/generated/prisma/client.ts';
import PrismaService from './prisma.service.ts';

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
