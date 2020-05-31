import express from 'express';
import updateLongitudeController from '../controllers/accident/update.longitude.controller';
import updateLatitudeController from '../controllers/accident/update.latitude.controller';
import updateSeverityController from '../controllers/accident/update.severity.controller';
import updateDescriptionController from '../controllers/accident/update.description.controller';
import CreateAccidentController from '../controllers/accident/create.accident.controller';
import { extractUser, hasAuthorization } from '../controllers/auth/utils';
import GetAccidentsController from '../controllers/accident/get.accident.controller';
import AccidentCauseController from '../controllers/accident/accident.causes.controller';
import CreateAccidentReport from '../controllers/warden/create.accident.report.controller';

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

Router.post(
  '/cause',
  extractUser,
  hasAuthorization(['A', 'RW']),
  AccidentCauseController.createAccidentCause
);

Router.get(
  '/cause',
  extractUser,
  hasAuthorization(['A', 'RW']),
  AccidentCauseController.getAccidentCauses
);

Router.patch(
  '/report',
  extractUser,
  hasAuthorization(['A', 'RW']),
  CreateAccidentReport.createAccidentReport
);

export default Router;
