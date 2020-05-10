import express from 'express';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Warden route works!'));

export default Router;
