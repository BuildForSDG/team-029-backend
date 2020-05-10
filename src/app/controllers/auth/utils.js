import Q from 'q';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import cryptoRandomString from 'crypto-random-string';
import config from '../../../config';

const getRandomString = (length = 20) => {
  const str = cryptoRandomString({ length });
  return str.toUpperCase();
};

const verifyHash = (clearText, salt, hash) => {
  const defer = Q.defer();
  bcrypt.hash(clearText, salt, (err, newHash) => {
    if (err) {
      defer.reject(err);
    } else if (newHash !== hash) {
      defer.resolve(false);
    }
    defer.resolve(true);
  });

  return defer.promise;
};

const generateJWTToken = (user) => {
  const signOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    expiresIn: config.auth.expiresIn
  };
  const token = jwt.sign(user, config.JWT_SECRET_KEY, signOptions);
  return token;
};

const bcryptSaltPassword = (password) => {
  const defer = Q.defer();
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (e, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        defer.resolve(false);
      }
      defer.resolve({ password, salt, hash });
    });
  });
  return defer.promise;
};


const extractUser = (req, res, next) => {
  const verifyOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    maxAge: config.auth.expiresIn
  };

  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, config.JWT_SECRET_KEY, verifyOptions, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
      req.user = decoded;
      return next();
    });
  } else {
    return res.status(403).json({
      message: 'User is not authorized'
    });
  }
};

const hasAuthorization = (role) => (req, res, next) => {
  if (_.intersection(req.user.user_role, role).length) {
    return next();
  }
  return res.status(403).json({
    message: 'User is not authorized to perform the role'
  });
};


export {
  getRandomString, bcryptSaltPassword, verifyHash,
  generateJWTToken, extractUser, hasAuthorization
};
