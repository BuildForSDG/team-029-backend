import express from 'express';
import { extractUser, hasAuthorization } from '../controllers/auth/utils';
import CreateRoadController from '../controllers/road/create.road.controller';
import UpdateRoadTitleController from '../controllers/road/update.road.title.controller';
import GetAllRoadsController from '../controllers/road/get.all.roads.controller';
import GetRoadDetailsController from '../controllers/road/get.road.details.controller';
import AssignRoadWardenController from '../controllers/road/road.assign.warden.controller';
import RemoveWardenController from '../controllers/road/road.remove.warden.controller';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Road route works!'));

Router.post(
  '/create',
  extractUser,
  hasAuthorization(['A']),
  CreateRoadController.createRoad
);

Router.patch(
  '/update-title',
  extractUser,
  hasAuthorization(['A']),
  UpdateRoadTitleController.updateTitle
);

Router.get(
  '/all',
  extractUser,
  hasAuthorization(['A']),
  GetAllRoadsController.getRoads
);

Router.get(
  '/detail/:id',
  extractUser,
  hasAuthorization(['A']),
  GetRoadDetailsController.getRoadDetails
);

Router.post(
  '/assign',
  extractUser,
  hasAuthorization(['A']),
  AssignRoadWardenController.assignWarden
);

Router.post(
  '/remove',
  extractUser,
  hasAuthorization(['A']),
  RemoveWardenController.unassignWarden
);
export default Router;
