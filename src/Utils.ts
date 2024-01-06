export class Utils {
  public static calcDiff(a: number, b: number): number {
    let diff: number = 0;
    if (a > b) {
      diff = a - b;
    } else if (a < b) {
      diff = b - a;
    }
    return diff;
  }

  public static handleEqualValues(inputToHandle: HTMLInputElement, messageElement: HTMLElement, msgNoEquals: string) {
    messageElement.classList.remove('invisible');
    messageElement.textContent = msgNoEquals;
    setTimeout(() => {
      messageElement.classList.add('invisible');
      inputToHandle.value = '';
      inputToHandle.removeAttribute('disabled');
    }, 3000);
  }

  public static handleCommaForFloats(inputToHandle: HTMLInputElement, messageElement: HTMLElement, msgNoCommas: string) {
    messageElement.classList.remove('invisible');
    messageElement.textContent = msgNoCommas;
    setTimeout(() => {
      messageElement.classList.add('invisible');
      inputToHandle.value = '';
      inputToHandle.removeAttribute('disabled');
    }, 3000);
  }

  // want to use it?
  public static selectWinner(guessA: number, guessB: number, correct: number) {
    let diffA: number = 0;
    let diffB: number = 0;
    if (correct > guessA) {
      diffA = correct - guessA;
    } else if (correct < guessA) {
      diffA = guessA - correct;
    } else if (correct === guessA) {
      diffA = 0;
    }

    if (correct > guessB) {
      diffB = correct - guessB;
    } else if (correct < guessB) {
      diffB = guessB - correct;
    } else if (correct === guessB) {
      diffB = 0;
    }

    if (diffA > diffB) {
      return 'B';
    } else if (diffA < diffB) {
      return 'A';
    }
  }
}
