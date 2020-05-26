import express from 'express';
import updateLongitudeController from '../controllers/accident/update.longitude.controller';
import updateLatitudeController from '../controllers/accident/update.latitude.controller';
import updateSeverityController from '../controllers/accident/update.severity.controller';
import updateDescriptionController from '../controllers/accident/update.description.controller';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Accident route works!'));

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

export default Router;
