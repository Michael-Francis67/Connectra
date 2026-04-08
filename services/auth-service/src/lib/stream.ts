import { StreamChat } from 'stream-chat';
import { env } from '@/config/environment.ts';

export class Stream {
  public client: StreamChat;

  constructor() {
    this.client = StreamChat.getInstance(
      env.STREAM_API_KEY,
      env.STREAM_API_SECRET,
    );
  }

  get getInstance(): StreamChat {
    return this.client;
  }

  async upsertUser(user: {
    id: string;
    name: string;
    image: string;
  }): Promise<boolean> {
    await this.client.upsertUsers([
      {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    ]);

    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.client.deleteUser(id);

    return true;
  }

  createToken(id: string): string {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 24 * 60 * 60;
    return this.client.createToken(id, exp, now);
  }
}
