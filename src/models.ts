export interface Question {
  question: string;
  correctAnswer: number;
  linkURL: string;
}

export type StarterPlayer = 'playerA' | 'playerB';

export interface CurrentRound {
  question: string;
  correctAnswer: number;
  linkURL: string;
  guessA: number;
  guessB: number;
  scoreA: number;
  scoreB: number;
}
