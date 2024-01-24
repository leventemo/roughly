import { Roughly } from '../src/Roughly';
import { describe, test, expect, beforeAll } from 'vitest'

const testQuiz = new Roughly();

beforeAll(() => {
  testQuiz.qns[0].correctAnswer = 12;
})

describe('check Roughly.toggleStarterPlayers() method', () => {

  test('if starterPlayer is "playerA", it should toggle to playerB', () => {
    testQuiz.starterPlayer = 'playerA';

    testQuiz.toggleStarterPlayers();

    expect(testQuiz.starterPlayer).toBe('playerB');
  });

  test('if starterPlayer is "playerB", it should toggle to playerA', () => {
    testQuiz.starterPlayer = 'playerB';

    testQuiz.toggleStarterPlayers();

    expect(testQuiz.starterPlayer).toBe('playerA');
  });
});

describe('check Roughly.evaluateAnswers() method', () => {

  test('guessA equals correctAnswer: playerA gets 2xdiffB', () => {
    testQuiz.answerA = 12;
    testQuiz.answerB = 8;
    testQuiz.scoreA = 7;

    testQuiz.evaluateAnswers();

    expect(testQuiz.scoreA).toBe(15);
  });

  test('guessB equals correctAnswer: playerA gets 2xdiffA', () => {
    testQuiz.answerB = 12;
    testQuiz.answerA = 18;
    testQuiz.scoreB = 0;

    testQuiz.evaluateAnswers();

    expect(testQuiz.scoreB).toBe(12);
  });

  test('if diffA = diffB: both players should be rewarded equally', () => {
    testQuiz.answerA = 7;
    testQuiz.answerB = 17;
    testQuiz.scoreA = 3;
    testQuiz.scoreB = 0;

    testQuiz.evaluateAnswers();

    expect(testQuiz.scoreA).toBe(8);
    expect(testQuiz.scoreB).toBe(5);
  });

  test('if answerA is further from correctAnswer than answerB, scoreB should be incremented by diffA', () => {
    testQuiz.answerA = 2;
    testQuiz.answerB = 15;
    testQuiz.scoreA = 4;
    testQuiz.scoreB = 4;

    testQuiz.evaluateAnswers();

    expect(testQuiz.scoreA).toBe(4);
    expect(testQuiz.scoreB).toBe(14);
  });

  test('if answerB is further from correctAnswer than answerA, scoreA should be incremented by diffB', () => {
    testQuiz.answerA = 8;
    testQuiz.answerB = 22;
    testQuiz.scoreA = 5;
    testQuiz.scoreB = 3;

    testQuiz.evaluateAnswers();

    expect(testQuiz.scoreA).toBe(15);
    expect(testQuiz.scoreB).toBe(3);
  });
});

describe('check Roughly.chooseWinner() method', () => {

  test(' scoreA equals scoreB: fn should return "It\'s a draw."', () => {
    testQuiz.scoreA = 5;
    testQuiz.scoreB = 5;

    expect(testQuiz.chooseWinner()).toBe('It\'s a draw.');
  });

  test(' scoreA > scoreB: fn should return "A wins."', () => {
    testQuiz.scoreA = 8;
    testQuiz.scoreB = 5;

    expect(testQuiz.chooseWinner()).toBe('A wins.');
  });

  test(' scoreA < scoreB: fn should return "B wins."', () => {
    testQuiz.scoreA = 8;
    testQuiz.scoreB = 35;

    expect(testQuiz.chooseWinner()).toBe('B wins.');
  })
});
