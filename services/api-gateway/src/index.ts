import 'module-alias/register';

import app from './app.ts';
import { env } from './config/environment.ts';
import logger from './utils/logger.utils.ts';

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`API Gateway is running on port ${PORT}`);
});
