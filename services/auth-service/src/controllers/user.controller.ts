import { UserService } from '@/services/user.service.ts';
import type { Request, Response, NextFunction } from 'express';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.params;

      const user = await this.userService.getUser(userId as string);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User fetched successfully', user });
    } catch (error) {
      next(error);
    }
  }
}
