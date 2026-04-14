import { UserService } from '@/services/user.service';
export class UserController {
    userService;
    constructor() {
        this.userService = new UserService();
    }
    async getUser(req, res, next) {
        try {
            const { id: userId } = req.params;
            const user = await this.userService.getUser(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User fetched successfully', user });
        }
        catch (error) {
            next(error);
        }
    }
}
