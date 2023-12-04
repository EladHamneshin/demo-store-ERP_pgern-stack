import request from 'supertest';
import express from 'express';
import userRouter from '../routes/userRoutes';
import * as userController from '../controllers/userController';

jest.mock('../middlewares/authMiddleware', () => ({
  authHandler: jest.fn((req, res, next) => next()),
}));

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User Routes', () => {
  it('should call authHandler middleware for GET /users', async () => {
    await request(app).get('/users');

    expect(require('../middlewares/authMiddleware').authHandler).toHaveBeenCalled();
  });

  it('should handle GET /users', async () => {
    const getUserSpy = jest.spyOn(userController, 'getUser');

    await request(app).get('/users');

    expect(getUserSpy).toHaveBeenCalled();
  });

  it('should handle POST /users/register', async () => {
    const registerUserSpy = jest.spyOn(userController, 'registerUser');

    await request(app)
      .post('/users/register')
      .send({ /* your user data here */ });

    expect(registerUserSpy).toHaveBeenCalled();
  });
});


