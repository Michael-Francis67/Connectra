import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { clerkMiddleware, getAuth } from '@clerk/express';
import jwt from 'jsonwebtoken';
import logger from './utils/logger.utils.ts';
import { env } from './config/environment.ts';
import { errorHandler } from './utils/error-handler.ts';

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === env.CLIENT_URL) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
  }),
);
app.use(clerkMiddleware());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
  }),
);

app.use(
  '/api/auth',
  createProxyMiddleware({
    target: env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': '',
    },
  }),
);

app.use(
  '/api/chats',
  createProxyMiddleware({
    target: env.CHATS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/chats': '',
    },
    on: {
      proxyReq: (proxyReq, req) => {
        const { userId } = getAuth(req as express.Request) || {};

        if (!userId) {
          proxyReq.abort();
        }

        const signedUserId = jwt.sign({ userId }, env.INTERNAL_SECRET, {
          expiresIn: '1d',
          algorithm: 'HS256',
        });
        proxyReq.setHeader('x-user-id', signedUserId);
      },
    },
  }),
);

app.use(
  '/api/groups',
  createProxyMiddleware({
    target: env.GROUP_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/groups': '',
    },
    on: {
      proxyReq: (proxyReq, req) => {
        const { userId } = getAuth(req as express.Request) || {};

        if (!userId) {
          proxyReq.abort();
        }

        const signedUserId = jwt.sign({ userId }, env.INTERNAL_SECRET, {
          expiresIn: '1d',
          algorithm: 'HS256',
        });
        proxyReq.setHeader('x-user-id', signedUserId);
      },
    },
  }),
);

app.use(
  '/api/calls',
  createProxyMiddleware({
    target: env.CALL_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/calls': '',
    },
    on: {
      proxyReq: (proxyReq, req) => {
        const { userId } = getAuth(req as express.Request) || {};

        if (!userId) {
          proxyReq.abort();
        }

        const signedUserId = jwt.sign({ userId }, env.INTERNAL_SECRET, {
          expiresIn: '1d',
          algorithm: 'HS256',
        });
        proxyReq.setHeader('x-user-id', signedUserId);
      },
    },
  }),
);

app.use(
  '/api/sockets',
  createProxyMiddleware({
    target: env.SOCKET_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/sockets': '',
    },
    on: {
      proxyReq: (proxyReq, req) => {
        const { userId } = getAuth(req as express.Request) || {};

        if (!userId) {
          proxyReq.abort();
        }

        const signedUserId = jwt.sign({ userId }, env.INTERNAL_SECRET, {
          expiresIn: '1d',
          algorithm: 'HS256',
        });
        proxyReq.setHeader('x-user-id', signedUserId);
      },
    },
  }),
);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`API Gateway is running on port ${PORT}`);
});
