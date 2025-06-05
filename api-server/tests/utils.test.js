import { calculateStandardDeviation } from '../src/utils.js';

describe('calculateStandardDeviation', () => {
  it('returns 0 for empty array', () => {
    expect(calculateStandardDeviation([])).toBe(0);
  });

  it('calculates standard deviation correctly', () => {
    const arr = [40000, 45000, 50000];
    expect(calculateStandardDeviation(arr)).toBeCloseTo(4082.48, 2);
  });
});