import type { Router } from 'express';
import express from 'express';
import { AuthController } from '@/controllers/auth.controller.ts';

const authRoute: Router = express.Router();
const authController = new AuthController();

authRoute.post(
  '/clerk',
  express.raw({ type: 'application/json' }),
  authController.syncUser.bind(authController),
);

export default authRoute;
