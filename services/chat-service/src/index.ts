import 'module-alias/register';
import express from 'express';
import chatRoute from './routes/auth.route';

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/chats', chatRoute);

app.listen(PORT, () => {
  console.log('Chat service is running on port', PORT);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  process.exit(0);
});

export default app;
