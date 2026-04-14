import type { UserJSON } from '@clerk/express';
import PrismaService from './prisma.service.js';
import type { User } from '@/generated/prisma/client.js';
import { Stream } from '@/lib/stream.js';

export class AuthService {
  private prisma = new PrismaService().getPrisma();
  private stream = new Stream();

  constructor() {
    this.prisma = new PrismaService().getPrisma();
    this.stream = new Stream();
  }

  async createUser(data: UserJSON): Promise<User | Error | null> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        clerkId: data.id,
      },
    });

    if (userExists) {
      this.updateUser(data);
      return null;
    }

    const newUser = await this.prisma.user.create({
      data: {
        firstName: data.first_name,
        lastName: data.last_name,
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address ?? '',
        username: data.username + '-' + data.id,
        profilePic: data.image_url,
      },
    });

    await this.stream.upsertUser({
      id: newUser.id,
      name: `${newUser.firstName} ${newUser.lastName}`,
      image: newUser.profilePic ?? '',
    });

    return newUser;
  }

  async updateUser(data: UserJSON): Promise<User | null> {
    const { first_name, last_name, email_addresses, username, image_url, id } =
      data;

    const user = await this.prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    if (!user) {
      this.createUser(data);
      return null;
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        clerkId: id,
      },
      data: {
        firstName: first_name,
        lastName: last_name,
        email: email_addresses?.[0]?.email_address ?? '',
        username: username + '-' + id,
        profilePic: image_url,
      },
    });

    await this.stream.upsertUser({
      id: updatedUser.id,
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      image: updatedUser.profilePic ?? '',
    });

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User | null> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        clerkId: id,
      },
    });

    await this.stream.deleteUser(deletedUser.id);

    return deletedUser;
  }
}
