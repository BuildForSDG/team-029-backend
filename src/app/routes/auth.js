import express from 'express';
import AuthController from '../controllers/auth/auth.controller';
import { hasAuthorization, extractUser } from '../controllers/auth/utils';

const Router = express.Router();

Router.post(
  '/register',
  extractUser,
  hasAuthorization(['A']),
  AuthController.register
);

Router.post(
  '/login',
  AuthController.login
);

Router.post(
  '/reset-password',
  AuthController.resetPassword
);

Router.patch(
  '/update-password',
  AuthController.changePassword
);

export default Router;
