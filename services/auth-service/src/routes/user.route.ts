import { UserController } from '@/controllers/user.controller.ts';
import type { Router } from 'express';
import express from 'express';

const userRoute: Router = express.Router();
const userController = new UserController();

userRoute.get('/:id', userController.getUser.bind(userController));

export default userRoute;
