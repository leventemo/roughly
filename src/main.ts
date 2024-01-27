import './style.css';
import { Roughly } from './Roughly.ts';
import { Render } from './Render.ts';
import { Validators } from './Validators.ts';

window.onload = function () {

  const quiz = new Roughly();

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1 id="header"><span id="qnNumber">${quiz.index}/${quiz.qns.length}</span>Roughly</h1>
    <div class="scoreboard">
      <div id="players-container">
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
    </div>
    <div class="content-box">
      <div id="question-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <span id='question'> question</span>
      </div>
      <div id="answer-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span id='answer'> answer</span>
      </div>
      <div id="link-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        <span id='link'> background info</span>
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
    const msg: string = quiz.chooseWinner();
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
    if (!Validators.isValidForEqualValues(inputA.value, inputB.value) && quiz.starterPlayer === 'playerB') {
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
    if (!Validators.isValidForEqualValues(inputB.value, inputA.value) && quiz.starterPlayer === 'playerA') {
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

