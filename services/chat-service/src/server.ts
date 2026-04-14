import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import app from './app';
import { env } from './config/environment';
import logger from './utils/logger.utils';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  },
});

const onlineUsers = new Map();

io.on('connection', (socket: Socket) => {
  const { userId } = socket.handshake.auth;
  onlineUsers.set(userId, socket.id);
  logger.info(`A user connected ${socket.id}`);

  socket.on('join-rooms', (socket: Socket) => {
    socket.join(`Rooms-${userId}`);
    logger.info(`Successfully joined rooms ${`Rooms-${userId}`}`);
  });

  socket.on('join-room', (chatId) => {
    socket.join(`Room-${chatId}`);
    logger.info(`Successfully joined room ${`Room-${chatId}`}`);
  });

  socket.on('online-users', () => {
    socket.emit('users', onlineUsers);
  });

  socket.on('disconnect', () => {
    logger.info(`A user disconnected ${socket.id}`);
  });
});

export { server, io };
