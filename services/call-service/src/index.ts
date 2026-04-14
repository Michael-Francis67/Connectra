import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';

// Local imports
import { env } from './config/environment.ts';
import logger from './utils/logger.utils.ts';

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  logger.info(`Call service is running on port ${PORT}`);
});
