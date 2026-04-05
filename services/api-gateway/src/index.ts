import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { clerkMiddleware } from '@clerk/express';
import helmet from 'helmet';
import morgan from 'morgan';
import authMiddleware from './middlewares/auth.middleware.ts';
import jwt from 'jsonwebtoken';

const app = express();

app.use(clerkMiddleware());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/api/auth',
  createProxyMiddleware({
    target: process.env.AUTH_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': '/auth',
    },
  }),
);

app.use(
  '/api/users',
  authMiddleware.protected,
  createProxyMiddleware({
    target: process.env.USERS_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: any, _res: any) => {
        const { userId } = req.auth || {};

        if (!userId) {
          return;
        }

        const signedUserId = jwt.sign(
          { userId },
          process.env.INTERNAL_SECRET as string,
          { expiresIn: '15m' },
        );

        proxyReq.setHeader('x-signed-user-id', signedUserId);
      },
    },
    pathRewrite: {
      '^/api/users': '/users',
    },
  }),
);

app.use(
  '/api/calls',
  authMiddleware.protected,
  createProxyMiddleware({
    target: process.env.CALLS_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/calls': '/calls',
    },
  }),
);

app.use(
  '/api/chats',
  authMiddleware.protected,
  createProxyMiddleware({
    target: process.env.CHATS_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/chats': '/chats',
    },
  }),
);

app.use(
  '/api/groups',
  authMiddleware.protected,
  createProxyMiddleware({
    target: process.env.GROUPS_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/groups': '/groups',
    },
  }),
);
