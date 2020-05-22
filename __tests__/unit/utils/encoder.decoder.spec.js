import sinon from 'sinon';
import chai from 'chai';
import * as encoderDecoderModule from '../../../src/app/utils/encoder.decoder';

let sandbox;
const { expect } = chai;

describe('Unit test for encoder and decoder helper methods', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('encoder: Should encode data to base64', () => {
    const clearText = 'I love coding...';
    const arg = {
      clearText
    };

    const encodedData = encoderDecoderModule.encoder(JSON.stringify(arg));
    expect(encodedData.length).to.be.greaterThan(0);
  });

  it('decoder: Should decode  encoded data ', () => {
    const clearText = 'I love coding...';
    const arg = {
      clearText
    };

    const encodedData = encoderDecoderModule.encoder(JSON.stringify(arg));
    const expectedClearText = JSON.parse(encoderDecoderModule.decoder(encodedData));
    expect(expectedClearText).to.eql(arg);
  });
});
