import { StarterPlayer, CurrentRound } from './models';

export class Game {
  index: number = 0;
  scoreA: number = 0;
  scoreB: number = 0;
  answerA: number = 0;
  answerB: number = 0;

  starterPlayer: StarterPlayer = 'playerA';
  winner = '';
  log: CurrentRound[] = [];

  toggleStarterPlayers(): void {
    if (this.starterPlayer === 'playerA') {
      this.starterPlayer = 'playerB';
    } else {
      this.starterPlayer = 'playerA';
    }
  }

  chooseWinner(): string {
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
