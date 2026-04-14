import app from '@/app';
import request from 'supertest';

describe('ChatController', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/api/chats/hello');
    expect(response.status).toBe(200);
  });
});

describe('ChatController', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
