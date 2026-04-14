import 'module-alias/register';
import sum from '@/sum.ts';
import app from '@/app.ts';
// @ts-expect-error to install types for supertest
import request from 'supertest';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('Expect to return 200 Ok', () => {
  test('get 200 ok from /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.OK).toBeTruthy();
  });
});

describe('Expect to return 404 Ok', () => {
  test('get 404 ok from /api/auth', async () => {
    const response = await request(app).get('/api/auth/users/123');
    expect(response.status).toBe(404);
  });
});

describe('Expect to return 401 Ok', () => {
  test('get 401 ok from /api/auth', async () => {
    const response = await request(app)
      .post('/api/chats/route/chat')
      .set('userId', '123');
    expect(response.status).toBe(401);
  });
});
