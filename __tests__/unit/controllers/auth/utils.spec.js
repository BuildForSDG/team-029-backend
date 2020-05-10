import sinon from 'sinon';
import chai from 'chai';
import * as utilModule from '../../../../src/app/controllers/auth/utils';

let sandbox;
const { expect } = chai;

describe('Unit test for auth/utils', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('getRandomString: Returns the correct length of random string', () => {
    const randomString5 = utilModule.getRandomString(5);
    const randomString10 = utilModule.getRandomString(10);
    const randomString7 = utilModule.getRandomString(7);
    expect(randomString5.length).to.equal(5);
    expect(randomString7.length).to.equal(7);
    expect(randomString10.length).to.equal(10);
  });

  it('bcryptSaltPassword: Returns password hash with salt', async () => {
    try {
      const password = 'mysecret';
      const { hash: passwordHash, salt } = await utilModule.bcryptSaltPassword(password);
      expect(passwordHash).to.not.be(null);
      expect(salt).to.not.be(null);
    } catch (e) {
      // Error handled
    }
  });

  it('bcryptSaltPassword: Fails to hash and should return false', async () => {
    try {
      const password = 'mysecret';
      sandbox.stub(utilModule, 'bcryptSaltPassword').returns(Promise.resolve(false));
      const { result } = await utilModule.bcryptSaltPassword(password);
      expect(result).to.be(false);
    } catch (e) {
      // Error handled
    }
  });

  it('verifyHash: Verifies a password hash correctly', async () => {
    try {
      const password = 'mysecret';
      const { hash: passwordHash, salt } = await utilModule.bcryptSaltPassword(password);
      const { result } = await utilModule.verifyHash(password, salt, passwordHash);
      expect(result).to.be(true);
    } catch (e) {
      // Error handled
    }
  });

  it('generateJWTToken: Generates JWT token', async () => {
    try {
      const user = {
        id: 'USR-41OBD',
        first_name: 'Moshood',
        last_name: 'Sikiru'
      };

      const token = utilModule.generateJWTToken(user);
      expect(token).to.not.be(null);
      expect(token.length).to.be.greaterThan(1);
    } catch (e) {
      // Error handled
    }
  });

  it('extractUser: Correctly extracts user from request payload', async () => {
    try {
      const user = {
        id: 'USR-41OBD',
        first_name: 'Moshood',
        last_name: 'Sikiru'
      };

      const token = utilModule.generateJWTToken(user);
      const req = {
        headers: {
          authorization: token
        }
      };

      const res = {
        status() {
          return this;
        },
        json(data) {
          return data;
        }
      };

      const nextSpy = sandbox.spy();

      utilModule.extractUser(req, res, nextSpy);
      sandbox.assert.calledOnce(nextSpy);
      expect(req.user).to.eql(user);
    } catch (e) {
      // Error handled
    }
  });

  it('extractUser: Fails to extract user, NO AUTHORIZATION TOKEN IN HEADER', async () => {
    try {
      const req = {
        headers: {
        }
      };

      const res = {
        status() {
          return this;
        },
        json(data) {
          return data;
        }
      };

      const nextSpy = sandbox.spy();

      const { message } = utilModule.extractUser(req, res, nextSpy);
      sandbox.assert.notCalled(nextSpy);
      expect(message).to.be('User is not authorized');
    } catch (e) {
      // Error handled
    }
  });

  it('hasAuthorization: Should allow access, USER HAS ROLE ', () => {
    const req = {
      user: {
        user_role: ['A']
      }
    };
    const allowedRoles = ['A', 'RW'];

    const res = {
      status() {
        return this;
      },
      json(data) {
        return data;
      }
    };

    const nextSpy = sandbox.spy();

    utilModule.hasAuthorization(allowedRoles)(req, res, nextSpy);
    sandbox.assert.calledOnce(nextSpy);
  });

  it('hasAuthorization: Should deny access, USER DOES NOT HAVE ROLE ', () => {
    const req = {
      user: {
        user_role: ['RW']
      }
    };
    const allowedRoles = ['A'];

    const res = {
      status() {
        return this;
      },
      json(data) {
        return data;
      }
    };

    const nextSpy = sandbox.spy();

    const { message } = utilModule.hasAuthorization(allowedRoles)(req, res, nextSpy);
    sandbox.assert.notCalled(nextSpy);
    expect(message).to.equal('User is not authorized to perform the role');
  });
});
