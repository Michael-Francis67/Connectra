import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { clerkMiddleware } from '@clerk/express';
import chatRoute from './routes/chat.route';
import { env } from './config/environment';
import { errorHandler } from './utils/api-error.util';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === env.API_GATEWAY_URL) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
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
    stream: process.stdout,
  }),
);
app.use(
  compression({
    level: 9,
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/route', chatRoute);

app.use(errorHandler);

export default app;
