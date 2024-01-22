import { Utils } from '../src/Utils';
import { describe, test, expect } from 'vitest'

describe('it calculates differences as expected', () => {
  test('when a is greater than b', () => {
    expect(Utils.calcDiff(5, 3)).toBe(2);
  });

  test('when b is greater than a', () => {
    expect(Utils.calcDiff(3, 5)).toBe(2);
  })
})
