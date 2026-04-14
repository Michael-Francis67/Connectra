import 'module-alias/register';
import { server } from './server';
import logger from './utils/logger.utils';

const PORT = process.env.PORT;

server.listen(PORT, () => {
  logger.info(`Chat service is running on port: ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.error('SIGINT signal received, shutting down gracefully.');
  process.exit(0);
});
