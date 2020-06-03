import express from 'express';
import { extractUser, hasAuthorization } from '../controllers/auth/utils';
import GetWardenInfoController from '../controllers/warden/get.warden.information.controller';
import AnalyticsController from '../controllers/dashboard/analytics.controller';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Warden route works!'));

Router.get(
  '/information/:id',
  extractUser,
  hasAuthorization(['A', 'RW']),
  GetWardenInfoController.getWardenInformation
);

Router.get(
  '/analytics',
  extractUser,
  hasAuthorization(['RW']),
  AnalyticsController.getWardenStatistics
);

export default Router;
