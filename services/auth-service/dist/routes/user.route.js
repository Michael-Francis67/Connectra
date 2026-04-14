import { UserController } from '@/controllers/user.controller';
import express from 'express';
const userRoute = express.Router();
const userController = new UserController();
userRoute.get('/:id', userController.getUser.bind(userController));
export default userRoute;
