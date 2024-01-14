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
}
