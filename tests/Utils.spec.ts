import { Utils } from '../src/Utils';
import { describe, test, expect } from 'vitest'

describe('it calculates differences between players\' guesses and correct answer as expected', () => {
  test('a > b', () => {
    expect(Utils.calcDiff(5, 3)).toBe(2);
  });

  test('b > a', () => {
    expect(Utils.calcDiff(3, 5)).toBe(2);
  });
});

describe('it decides which player\'s guess is closer to the correct answer', () => {

  const correctAnswer = 12;

  test('guessA < guessB < correctAnswer: B should win', () => {
    const guessA = 5, guessB = 8;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('B');
  });

  test('guessA < correctAnswer << guessB: A should win', () => {
    const guessA = 8, guessB = 25;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('A');
  });

  test('guessA << correctAnswer < guessB: B should win', () => {
    const guessA = 5, guessB = 15;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('B');
  });

  test('guessA < correctAnswer < guessB (equal differences): both should get the same score', () => {
    const guessA = 10, guessB = 14;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('A & B');
  });

  test('guessB < correctAnswer << guessA: B should win', () => {
    const guessA = 25, guessB = 10;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('B');
  });

  test('guessB << correctAnswer < guessA: A should win', () => {
    const guessA = 15, guessB = 2;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('A');
  });

  test('guessB < correctAnswer < guessA (equal differences): both should get the same score', () => {
    const guessA = 14, guessB = 10;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('A & B');
  });

  test('guessB < guessA < correctAnswer: A should win', () => {
    const guessA = 10, guessB = 8;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('A');
  });

  test('correctAnswer < guessA < guessB: A should win', () => {
    const guessA = 14, guessB = 16;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('A');
  });

  test('correctAnswer < guessB < guessA: B should win', () => {
    const guessA = 17, guessB = 14;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('B');
  });

  test('guessA === correctAnswer; guessB is something else: A should get double the diffB', () => {
    const guessA = 12, guessB = 25;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('AA');
  });

  test('guessB === correctAnswer; guessA is something else: B should get double the diffA', () => {
    const guessA = 8, guessB = 12;
    expect(Utils.selectWinner(guessA, guessB, correctAnswer)).toBe('BB');
  });
})
