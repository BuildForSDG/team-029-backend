import { expect } from 'chai';
import assert from 'assert';
import app from '../src/index';

describe('app module', () => {
  it('it exists', async () => {
    assert(app, true);
  });

  it('it returns program name with SDGs', async () => {
    const result = await app();
    const sdgPos = (result || '').indexOf('SDG');
    expect(sdgPos).to.be.at.least(0);
  });
});
