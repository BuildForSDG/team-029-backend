import express from 'express';

const Router = express.Router();

Router.get('/', (req, res) => res.send('Road route works!'));

export default Router;
