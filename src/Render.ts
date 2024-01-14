export class Render {

  public static formWhenNewQuestion(starterPlayet: string, inputA: HTMLInputElement, inputB: HTMLInputElement, startBtn: HTMLButtonElement, checkBtn: HTMLButtonElement) {
    if (starterPlayet === 'playerA') {
      inputA.removeAttribute('disabled');
      // saveBtnA.removeAttribute('disabled');
    } else {
      inputB.removeAttribute('disabled');
    }

    startBtn.classList.add('hidden');
    checkBtn.classList.remove('hidden');
  }

  public static messageForEqualValues(inputToHandle: HTMLInputElement, messageElement: HTMLElement, msgNoEquals: string) {
    messageElement.textContent = msgNoEquals;
    messageElement.classList.remove('invisible');
    setTimeout(() => {
      messageElement.classList.add('invisible');
      inputToHandle.value = '';
      inputToHandle.removeAttribute('disabled');
    }, 3000);
  }

  public static messageForNonNumeric(inputToHandle: HTMLInputElement, messageElement: HTMLElement, msgNoCommas: string, delay: number) {
    messageElement.textContent = msgNoCommas;
    messageElement.classList.remove('invisible');
    setTimeout(() => {
      messageElement.classList.add('invisible');
      inputToHandle.value = '';
      inputToHandle.removeAttribute('disabled');
    }, delay);
  }

  public static formForEqualValueInInputA(starterPlayer: string, inputA: HTMLInputElement, inputB: HTMLInputElement, checkBtn: HTMLButtonElement, saveBtnA: HTMLButtonElement) {
    // disable, enable inputs
    if (starterPlayer === 'playerA') {
      inputA.setAttribute('disabled', '');
      inputB.removeAttribute('disabled');
    }

    if (starterPlayer === 'playerB') {
      inputA.setAttribute('disabled', '');
      checkBtn.removeAttribute('disabled');
    }

    saveBtnA.setAttribute('disabled', '');

  }

  public static formForEqualValueInInputB(starterPlayer: string, inputB: HTMLInputElement, inputA: HTMLInputElement, checkBtn: HTMLButtonElement, saveBtnB: HTMLButtonElement) {
    // disable, enable inputs
    if (starterPlayer === 'playerB') {
      inputB.setAttribute('disabled', '');
      inputA.removeAttribute('disabled');
    }

    if (starterPlayer === 'playerA') {
      inputB.setAttribute('disabled', '');
      checkBtn.removeAttribute('disabled');
    }

    saveBtnB.setAttribute('disabled', '');

  }
}
