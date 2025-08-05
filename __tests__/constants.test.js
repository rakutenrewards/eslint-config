import { OFF, WARNING, ERROR } from '../constants.js';

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

  it('should be immutable', () => {
    expect(() => {
      OFF = 999;
    }).toThrow();
  });
});
