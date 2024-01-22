import './style.css';
import { Roughly } from './Roughly.ts';
import { Render } from './Render.ts';
import { Validators } from './Validators.ts';

window.onload = function () {

  const quiz = new Roughly();

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1 id="header"><span id="qnNumber">${quiz.index}/${quiz.qns.length}</span>Roughly</h1>
  <div class="card">
    <div class="scoreboard">
      <div class="player">
        <div class="name">A</div>
        <div id="scoreA">${quiz.scoreA}</div>
      </div>
      <div class="player">
        <div class="name">B</div>
        <div id="scoreB">${quiz.scoreB}</div>
      </div>
    </div>
    <div id="msg" class="invisible"></div>
    <div class="content-box">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" viewBox="0 -2 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg><span id='question'> question</span>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" viewBox="0 -2 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg><span id='answer'> answer</span>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" viewBox="0 -2 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg><span id='link'> background info</span>
      </div>
    </div>

    <form id="roughly-form" action="#">
      <label for="inputA">guess A <input type="number" id="inputA" name="inputA" disabled required><button id="save-button-A" disabled>Save</button></label>
      <label for="inputB">guess B <input type="number" id="inputB" name="inputB" disabled required><button id="save-button-B" disabled>Save</button></label>
      <button type="button" id="startButton">Start</button>
      <button type="button" id="checkButton" class="hidden">Check</button>
      <button type="button" id="nextButton" class="hidden">Next</button>
      <button type="button" id="overviewButton" class="hidden">Next</button>
    </form>
  </div>
`
  const qnNumber = document.querySelector('#qnNumber') as HTMLElement;
  const scoreContainerA = document.querySelector('#scoreA') as HTMLElement;
  const scoreContainerB = document.querySelector('#scoreB') as HTMLElement;
  const msgContainer = document.querySelector('#msg') as HTMLElement;

  const questionContainer = document.querySelector('#question') as HTMLElement;
  const answerContainer = document.querySelector('#answer') as HTMLElement;
  const linkContainer = document.querySelector('#link') as HTMLElement;

  const roughlyForm = document.querySelector('#roughly-form') as HTMLFormElement;
  const inputA = document.querySelector('#inputA') as HTMLInputElement;
  const inputB = document.querySelector('#inputB') as HTMLInputElement;
  const saveBtnA = document.querySelector('#save-button-A') as HTMLButtonElement;
  const saveBtnB = document.querySelector('#save-button-B') as HTMLButtonElement;

  const startButton = document.querySelector('#startButton') as HTMLButtonElement;
  const checkButton = document.querySelector('#checkButton') as HTMLButtonElement;
  const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;

  startButton.addEventListener('click', (event) => {
    event.preventDefault();
    displayNewQuestion();
  });

  function displayNewQuestion() {
    Render.qnCounter(qnNumber, quiz.index, quiz.qns.length);
    Render.scores(scoreContainerA, scoreContainerB, quiz.scoreA, quiz.scoreB);
    Render.contentBoxWhenNewQuestion(questionContainer, answerContainer, linkContainer, quiz.qns, quiz.index);
    Render.formWhenNewQuestion(quiz.starterPlayer, inputA, inputB, startButton, checkButton);
  }

  function displayWinner(): void {
    const msg: string = quiz.selectWinner();
    console.log(msg);
  }

  saveBtnA.addEventListener('click', (event) => {
    event.preventDefault();
    // validation for Firefox & Safari: can't use non-numeric characters comma for floats
    if (!Validators.isValidForNonNumeric(inputA.value)) {
      Render.message(msgContainer, quiz.msgNumericOnly);
      Render.formForNonNumericInInput(inputA, saveBtnA);
      return;
    }
    // validation: can't be equal to the other input value
    if (!Validators.isValidForEqualValues([inputA.value, inputB.value], [quiz.starterPlayer, 'playerB'])) {
      Render.message(msgContainer, quiz.msgNoEquals);
      Render.formForEqualValueInInputA(quiz.starterPlayer, inputA, inputB, checkButton);
      return;
    }
    // render form when inputs are valid
    Render.formForValidFlowOnSaveBtnA(quiz.starterPlayer, inputA, inputB, checkButton, saveBtnA);
  });

  inputA.addEventListener('input', () => {
    Render.removeDisabledFromSaveBtn(saveBtnA);
  });

  saveBtnB.addEventListener('click', (event) => {
    event.preventDefault();
    // validation for Firefox & Safari: can't use non-numeric characters comma for floats
    if (!Validators.isValidForNonNumeric(inputB.value)) {
      Render.message(msgContainer, quiz.msgNumericOnly);
      Render.formForNonNumericInInput(inputB, saveBtnB);
      return;
    }
    // validation: can't be equal to the other input value
    if (!Validators.isValidForEqualValues([inputB.value, inputA.value], [quiz.starterPlayer, 'playerA'])) {
      Render.message(msgContainer, quiz.msgNoEquals);
      Render.formForEqualValueInInputB(quiz.starterPlayer, inputB, inputA, checkButton);
      return;
    }
    // render form when inputs are valid
    Render.formForValidFlowOnSaveBtnB(quiz.starterPlayer, inputB, inputA, checkButton, saveBtnB);
  });

  inputB.addEventListener('input', () => {
    Render.removeDisabledFromSaveBtn(saveBtnB);
  });

  checkButton.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(roughlyForm);
    formData.append('inputA', inputA.value);
    formData.append('inputB', inputB.value);
    quiz.answerA = Number(formData.get('inputA'));
    quiz.answerB = Number(formData.get('inputB'));

    quiz.evaluateAnswers();

    Render.scores(scoreContainerA, scoreContainerB, quiz.scoreA, quiz.scoreB);
    Render.contentBoxWhenCheckingAnswer(answerContainer, linkContainer, quiz.qns[quiz.index]);
    Render.formWhenCheckingAnswer(inputA, inputB, checkButton, nextButton);

  });

  nextButton.addEventListener('click', () => {
    quiz.index = quiz.index + 1;

    // check if there's a new qn:
    if (quiz.qns.length === quiz.index) {
      // if there isn't, show winner, then scoreboard on click of a new btn
      displayWinner();
      return;
    } else {
      // clear input fields
      inputA.value = '';
      inputB.value = '';
      nextButton.classList.add('hidden');

      // if there is one, show that: update qn, hide answer
      quiz.toggleStarterPlayers();
      displayNewQuestion();
    }

  });

}

