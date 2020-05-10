import express from 'express';

const Router = express.Router();

Router.get('/', (req, res) => res.send('User route works!'));

export default Router;
