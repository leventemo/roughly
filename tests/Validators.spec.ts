import { Validators } from '../src/Validators';
import { describe, test, expect } from 'vitest';

const val = new Validators();

describe('check Validators.isValidForNonNumeric() method', () => {

  test('should return "true" for numeric input values', () => {
    const numericInput = '0123456789';

    expect(Validators.isValidForNonNumeric(numericInput)).toBe(true);
  });

  test('should return "false" for non-numeric values', () => {
    const textInput = 'ghjkd';
    const specialCharInput = '<>%!&@/#$';

    expect(Validators.isValidForNonNumeric(textInput)).toBe(false);
    expect(Validators.isValidForNonNumeric(specialCharInput)).toBe(false);
  });

});

describe('check Validators.isValidForEqualValues() method', () => {
  test('should return "false" for equal values', () => {
    const inputA = '3';
    const inputB = '3';

    expect(Validators.isValidForEqualValues(inputA, inputB)).toBe(false);
  });

  test('should return "true" for altering values', () => {
    const inputA = '6';
    const inputB = '3';

    expect(Validators.isValidForEqualValues(inputA, inputB)).toBe(true);
  });
});
