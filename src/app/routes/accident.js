import express from 'express';
import updateLongitudeController from '../controllers/accident/update.longitude.controller';
import updateLatitudeController from '../controllers/accident/update.latitude.controller';
import updateSeverityController from '../controllers/accident/update.severity.controller';
import updateDescriptionController from '../controllers/accident/update.description.controller';
import CreateAccidentController from '../controllers/accident/create.accident.controller';
import { extractUser, hasAuthorization } from '../controllers/auth/utils';
import GetAccidentsController from '../controllers/accident/get.accident.controller';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Accident route works!'));

Router.get(
  '/all',
  extractUser,
  hasAuthorization(['A', 'RW']),
  GetAccidentsController.getAccidents
);

Router.post(
  '/longitude',
  updateLongitudeController.saveLongitude
);

Router.post(
  '/latitude',
  updateLatitudeController.saveLatitude
);

Router.post(
  '/severity',
  updateSeverityController.saveSeverity
);

Router.post(
  '/description',
  updateDescriptionController.saveDescription
);

Router.post(
  '/create',
  CreateAccidentController.createAccident
);

export default Router;
