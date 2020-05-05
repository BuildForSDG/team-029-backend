import { expect } from 'chai';
import app from '../src/index';

describe('app module', () => {
  test('it exists', async () => {
    expect(app).to.not.be.undefined();
  });

  test('it returns program name with SDGs', async () => {
    const result = await app();
    const sdgPos = (result || '').indexOf('SDG');
    expect(sdgPos).to.be.at.least(0);
  });
});
