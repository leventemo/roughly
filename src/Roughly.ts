import { Question, StarterPlayer } from './models'
import { roughlyQns } from './quizContent'
import { Utils } from './Utils'

export class Roughly {
  constructor(
    public qns: Question[] = roughlyQns,
    public index: number = 0,
    public scoreA: number = 0,
    public scoreB: number = 0,
    public answerA: number = 0,
    public answerB: number = 0,
    public starterPlayer: StarterPlayer = 'playerA',
    public winner = '',
    public msgNoEquals = 'Idential answers are not allowed. Try a different one.',
    public msgNoCommas = 'Only numbers and decimals points are accepted.',
  ) { }

  toggleStarterPlayers(): void {
    if (this.starterPlayer === 'playerA') {
      this.starterPlayer = 'playerB';
    } else {
      this.starterPlayer = 'playerA';
    }
  }

  evaluateAnswers(): void {
    // calculate differences from correct answer
    const diffA = Utils.calcDiff(this.answerA, this.qns[this.index].correctAnswer);
    const diffB = Utils.calcDiff(this.answerB, this.qns[this.index].correctAnswer);
    // scoring
    if (this.answerA === this.qns[this.index].correctAnswer) {
      this.scoreA = this.scoreA + (2 * diffB);
    } else if (this.answerB === this.qns[this.index].correctAnswer) {
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

  selectWinner(): string {
    let winner = '';
    if (this.scoreA === this.scoreB) {
      winner = 'It\'s a draw.';
    } else if (this.scoreA > this.scoreB) {
      winner = 'A wins.';
    } else if (this.scoreA < this.scoreB) {
      winner = 'B wins.';
    }
    return winner;
  }
}


