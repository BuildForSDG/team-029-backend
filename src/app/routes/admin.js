import express from 'express';
import { extractUser, hasAuthorization } from '../controllers/auth/utils';
import AnalyticsController from '../controllers/dashboard/analytics.controller';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Admin route works!'));
Router.get(
  '/analytics',
  extractUser,
  hasAuthorization(['A']),
  AnalyticsController.getAdminStatistics
);


export default Router;
