import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';

// Local imports
import { env } from './config/environment.js';
import logger from './utils/logger.utils.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    origin: env.API_GATEWAY_URL,
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

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/webhook', authRoute);
app.use('/users', userRoute);

app.listen(PORT, () => {
  logger.info(`Auth service is running on port ${PORT}`);
});
