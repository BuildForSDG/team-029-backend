import config from '../../config';

const pgp = require('pg-promise');

const promise = require('bluebird');

const pg = pgp({ promiseLib: promise, noLocking: true });

const roadryDb = pg(config.ROADRY_DATABASE_URL);

export default roadryDb;
