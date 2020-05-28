import express from 'express';
import { extractUser, hasAuthorization } from '../controllers/auth/utils';
import GetWardenInfoController from '../controllers/warden/get.warden.information.controller';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Warden route works!'));

Router.get(
  '/information/:id',
  extractUser,
  hasAuthorization(['A', 'RW']),
  GetWardenInfoController.getWardenInformation
);

export default Router;
