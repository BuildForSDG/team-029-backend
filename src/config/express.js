import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import FileStreamRotator from 'file-stream-rotator';
import loggerInit from './logger';
import adminRoutes from '../app/routes/admin';
import authRoutes from '../app/routes/auth';
import roadRoutes from '../app/routes/road';
import userRoutes from '../app/routes/user';
import wardenRoutes from '../app/routes/warden';
import accidentRoutes from '../app/routes/accident';

const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressConfig = (app) => {
  let accessLogStream;
  let logger;

  if (app.get('env') === 'development') {
    logger = loggerInit('development');
  } else if (app.get('env') === 'production') {
    logger = loggerInit('production');
  } else if (app.get('env') === 'test') {
    logger = loggerInit('test');
  } else {
    logger = loggerInit();
  }

  global.logger = logger;
  logger.info('Application starting...');
  logger.debug("Overriding 'Express' logger");

  if (checkLogDir) {
    accessLogStream = FileStreamRotator.getStream({
      date_format: 'YYYYMMDD',
      filename: `${logDirectory}/roadry-%DATE%.log`,
      frequency: 'weekly',
      verbose: false
    });
  }

  app.use(morgan('combined', { stream: accessLogStream }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(helmet());
  app.disable('x-powered-by');

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use('/api/v1/admin', adminRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/road', roadRoutes);
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/warden', wardenRoutes);
  app.use('/api/v1/accident', accidentRoutes);

  app.use((req, res) => res.status(404).json({
    message: 'Not Found',
    status: 404
  }));
};

export default expressConfig;
