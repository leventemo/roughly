import { Question } from "./models";
import { Roughly } from './Roughly.ts';

//? legit a second instance?
const quiz = new Roughly();

export class Render {

  public static qnCounter(qnNumber: HTMLElement, quizIndex: number, qnsLength: number): void {
    qnNumber.textContent = `${quizIndex + 1} / ${qnsLength}`;
  }

  public static scores(scoreContainerA: HTMLElement, scoreContainerB: HTMLElement, scoreA: number, scoreB: number) {
    scoreContainerA.textContent = JSON.stringify(scoreA);
    scoreContainerB.textContent = JSON.stringify(scoreB);
  }

  public static questionWhenNewQuestion(questionContainer: HTMLElement, answerContainer: HTMLElement, linkContainer: HTMLElement, quizQns: Question[], quizIndex: number) {
    questionContainer.textContent = quizQns[quizIndex].question;
    answerContainer.textContent = JSON.stringify(quizQns[quizIndex].correctAnswer);
    answerContainer.classList.add('hidden');
    linkContainer.textContent = quizQns[quizIndex].linkURL;
    linkContainer.classList.add('hidden');
  }

  public static contentBoxWhenCheckingAnswer(answerContainer: HTMLElement, linkContainer: HTMLElement, quizQn: Question): void {
    answerContainer.textContent = JSON.stringify(quizQn.correctAnswer);
    answerContainer.classList.remove('hidden');
    linkContainer.textContent = quizQn.linkURL;
  }

  public static formWhenCheckingAnswer(inputA: HTMLInputElement, inputB: HTMLInputElement, checkBtn: HTMLButtonElement, nextBtn: HTMLButtonElement) {
    inputA.setAttribute('disabled', '');
    inputB.setAttribute('disabled', '');
    checkBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
  }

  public static formWhenNewQuestion(starterPlayer: string, inputA: HTMLInputElement, inputB: HTMLInputElement, startBtn: HTMLButtonElement, checkBtn: HTMLButtonElement): void {
    if (starterPlayer === 'playerA') {
      inputA.removeAttribute('disabled');
    } else {
      inputB.removeAttribute('disabled');
    }

    startBtn.classList.add('hidden');
    checkBtn.classList.remove('hidden');
    checkBtn.setAttribute('disabled', '');
  }

  public static message(messageElement: HTMLElement, message: string): void {
    messageElement.textContent = message;
    messageElement.classList.remove('invisible');
    setTimeout(() => {
      messageElement.classList.add('invisible');
    }, quiz.delay);
  }

  public static formForNonNumericInInput(input: HTMLInputElement, saveBtn: HTMLButtonElement): void {
    input.setAttribute('disabled', '');
    saveBtn.setAttribute('disabled', '');
    setTimeout(() => {
      input.value = '';
      input.removeAttribute('disabled');
    }, quiz.delay);
  }

  public static formForEqualValueInInputA(starterPlayer: string, inputA: HTMLInputElement, inputB: HTMLInputElement, checkBtn: HTMLButtonElement, saveBtnA: HTMLButtonElement): void {
    inputA.setAttribute('disabled', '');
    saveBtnA.setAttribute('disabled', '');

    if (starterPlayer === 'playerA') {
      setTimeout(() => {
        inputB.value = '';
        inputB.removeAttribute('disabled');
      }, quiz.delay);
    }

    if (starterPlayer === 'playerB') {
      setTimeout(() => {
        inputA.value = '';
        inputA.removeAttribute('disabled');
      }, quiz.delay);
    }
    checkBtn.removeAttribute('disabled');
  }

  public static formForEqualValueInInputB(starterPlayer: string, inputB: HTMLInputElement, inputA: HTMLInputElement, checkBtn: HTMLButtonElement, saveBtnB: HTMLButtonElement): void {
    inputB.setAttribute('disabled', '');
    saveBtnB.setAttribute('disabled', '');

    if (starterPlayer === 'playerB') {
      setTimeout(() => {
        inputA.value = '';
        inputA.removeAttribute('disabled');
      }, quiz.delay);
    }

    if (starterPlayer === 'playerA') {
      setTimeout(() => {
        inputB.value = '';
        inputB.removeAttribute('disabled');
      }, quiz.delay);
    }
    checkBtn.removeAttribute('disabled');
  }

  public static formForValidFlowOnSaveBtnA(starterPlayer: string, inputA: HTMLInputElement, inputB: HTMLInputElement, checkButton: HTMLButtonElement, saveBtnA: HTMLButtonElement) {
    if (starterPlayer === 'playerA') {
      inputB.removeAttribute('disabled');
    }

    if (quiz.starterPlayer === 'playerB') {
      checkButton.removeAttribute('disabled');
    }

    inputA.setAttribute('disabled', '');
    saveBtnA.setAttribute('disabled', '');
  }

  public static formForValidFlowOnSaveBtnB(starterPlayer: string, inputB: HTMLInputElement, inputA: HTMLInputElement, checkButton: HTMLButtonElement, saveBtnB: HTMLButtonElement) {
    if (starterPlayer === 'playerB') {
      inputA.removeAttribute('disabled');
    }

    if (quiz.starterPlayer === 'playerA') {
      checkButton.removeAttribute('disabled');
    }

    inputB.setAttribute('disabled', '');
    saveBtnB.setAttribute('disabled', '');
  }

  public static removeDisabledFromSaveBtn(saveBtn: HTMLButtonElement) {
    saveBtn.removeAttribute('disabled');
  }
}
