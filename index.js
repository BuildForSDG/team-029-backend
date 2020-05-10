import express from 'express';
// Bootstrap express
import expressConfig from './src/config/express';

const port = process.env.PORT || 3023;

const app = express();

expressConfig(app);

app.listen(port);

logger.info(`Roadry API started on port ${port}`);

export default app;
