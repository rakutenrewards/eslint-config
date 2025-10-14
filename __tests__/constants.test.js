const { OFF, WARNING, ERROR } = require('../constants');

describe('Constants', () => {
  it('should export the correct values', () => {
    expect(OFF).toBe(0);
    expect(WARNING).toBe(1);
    expect(ERROR).toBe(2);
  });

  it('should have numeric values', () => {
    expect(typeof OFF).toBe('number');
    expect(typeof WARNING).toBe('number');
    expect(typeof ERROR).toBe('number');
  });

  it('should have the correct relationships', () => {
    expect(OFF).toBeLessThan(WARNING);
    expect(WARNING).toBeLessThan(ERROR);
    expect(ERROR).toBeGreaterThan(WARNING);
    expect(WARNING).toBeGreaterThan(OFF);
  });

  it('should have the correct initial values', () => {
    // In CJS, the exported object can be modified, but we test the initial correct values
    const freshConstants = require('../constants');
    expect(freshConstants.OFF).toBe(0);
    expect(freshConstants.WARNING).toBe(1);
    expect(freshConstants.ERROR).toBe(2);
  });
});
