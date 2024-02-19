import { CurrentRound, Question } from './models'
import { Game } from './Game'
import { roughlyQns } from './quizContent'
import { Utils } from './Utils'

export class Roughly extends Game {
  constructor(
    public qns: Question[] = roughlyQns
  ) {
    super();
  }
  msgNoEquals = 'Idential answers are not allowed. Try a different one.';
  msgNumericOnly = 'Only numbers and decimals points are accepted.';
  delay: number = 3000;

  evaluateAnswers(index: number): void {
    // calculate differences from correct answer
    const diffA = Utils.calcDiff(this.answerA, this.qns[index].correctAnswer);
    const diffB = Utils.calcDiff(this.answerB, this.qns[index].correctAnswer);
    // scoring
    if (this.answerA === this.qns[index].correctAnswer) {
      this.scoreA = this.scoreA + (2 * diffB);
    } else if (this.answerB === this.qns[index].correctAnswer) {
      this.scoreB = this.scoreB + (2 * diffA);
    } else if (diffA === diffB) {
      this.scoreA = this.scoreA + diffB;
      this.scoreB = this.scoreB + diffA;
    } else if (diffA > diffB) {
      this.scoreB = this.scoreB + diffA;
    } else if (diffA < diffB) {
      this.scoreA = this.scoreA + diffB;
    }
  }
}


