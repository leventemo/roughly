import './style.css'
import { Roughly } from './Roughly.ts'

window.onload = function () {

  const quiz = new Roughly();

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Roughly</h1>
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
    <div id="msg" class="invisible">Idential answers are not allowed. Try a different one.</div>
    <div class="question">
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
      <label for="inputA">guess A <input type="number" id="inputA" name="inputA" value="0" disabled><button id="save-button-A" disabled>Save</button></label>
      <label for="inputB">guess B <input type="number" id="inputB" name="inputB" value="0" disabled><button id="save-button-B" disabled>Save</button></label>
      <button type="button" id="startButton">Start</button>
      <button type="button" id="checkButton" class="hidden" disabled>Check</button>
      <button type="button" id="nextButton" class="hidden">Next</button>
      <button type="button" id="overviewButton" class="hidden">Next</button>
    </form>
  </div>
`

  const scoreA = document.querySelector('#scoreA') as HTMLElement;
  const scoreB = document.querySelector('#scoreB') as HTMLElement;
  const msg = document.querySelector('#msg') as HTMLElement;

  const question = document.querySelector('#question') as HTMLElement;
  const answer = document.querySelector('#answer') as HTMLElement;
  const link = document.querySelector('#link') as HTMLElement;

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

    scoreA.textContent = JSON.stringify(quiz.scoreA);
    scoreB.textContent = JSON.stringify(quiz.scoreB);

    question.textContent = quiz.qns[quiz.i].question;
    answer.textContent = JSON.stringify(quiz.qns[quiz.i].correctAnswer);
    answer.classList.add('hidden');
    link.textContent = quiz.qns[quiz.i].background;
    link.classList.add('hidden');

    if (quiz.starterPlayer === 'playerA') {
      inputA.removeAttribute('disabled');
      // saveBtnA.removeAttribute('disabled');
    } else {
      inputB.removeAttribute('disabled');
    }

    startButton.classList.add('hidden');
    checkButton.classList.remove('hidden');

  });

  saveBtnA.addEventListener('click', (event) => {
    event.preventDefault();

    // validation: can't be equal to the other input value
    if (inputA.value === inputB.value && quiz.starterPlayer === 'playerB') {
      handleEqualValues(inputA);
    }

    // disable, enable inputs
    if (quiz.starterPlayer === 'playerA') {
      inputA.setAttribute('disabled', '');
      inputB.removeAttribute('disabled');
    }

    if (quiz.starterPlayer === 'playerB') {
      inputA.setAttribute('disabled', '');
      checkButton.removeAttribute('disabled');
    }

    saveBtnA.setAttribute('disabled', '');

  });

  inputA.addEventListener('input', () => {
    saveBtnA.removeAttribute('disabled');
  });

  saveBtnB.addEventListener('click', (event) => {
    event.preventDefault();

    // validation: can't be equal to the other input value
    if (inputA.value === inputB.value && quiz.starterPlayer === 'playerA') {
      handleEqualValues(inputB);
    }

    // disable, enable inputs
    if (quiz.starterPlayer === 'playerB') {
      inputB.setAttribute('disabled', '');
      inputA.removeAttribute('disabled');
    }

    if (quiz.starterPlayer === 'playerA') {
      inputB.setAttribute('disabled', '');
      checkButton.removeAttribute('disabled');
    }

    saveBtnB.setAttribute('disabled', '');

  });

  inputB.addEventListener('input', () => {
    saveBtnB.removeAttribute('disabled');
  });

  checkButton.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(roughlyForm);
    formData.append('inputA', inputA.value);
    formData.append('inputB', inputB.value);
    quiz.answerA = Number(formData.get('inputA'));
    quiz.answerB = Number(formData.get('inputB'));

    quiz.evaluateAnswers();

    scoreA.textContent = JSON.stringify(quiz.scoreA);
    scoreB.textContent = JSON.stringify(quiz.scoreB);

    answer.textContent = JSON.stringify(quiz.qns[0].correctAnswer);
    answer.classList.remove('hidden');

    inputA.setAttribute('disabled', '');
    inputB.setAttribute('disabled', '');
    checkButton.classList.add('hidden');
    nextButton.classList.remove('hidden');

    link.textContent = quiz.qns[quiz.i].background;

  });

  nextButton.addEventListener('click', () => {
    quiz.i = quiz.i + 1;

    // check if there's a new qn:
    if (quiz.qns.length === quiz.i) {
      // if there isn't, show scoreboard
      console.log('no more qns');
    } else {
      // if there is one, show that: update qn, hide answer
      console.log(quiz.qns[quiz.i]);
    }

    // clear input fields
    inputA.value = '0';
    inputB.value = '0';

    quiz.toggleStarterPlayers();
    console.log(quiz.starterPlayer);
  });

  function handleEqualValues(inputToHandle: HTMLInputElement,) {
    msg.classList.remove('invisible');
    setTimeout(() => {
      msg.classList.add('invisible');
      inputToHandle.value = '0';
      inputToHandle.removeAttribute('disabled');
    }, 3000);
  }

}


// todo: identical answers are not permitted
// todo: nextBtn
// todo: checkBtn
// todo: toggleStarterPlayer

//? displayScores() {}
//? displayQuestion() {}
//? checkAnswers() {}

// on load: display initial page:
// scores (0)
// qn placeholder: icon
// answer placeholder: icon
// link placeholder: icon
// input fields disabled + start btn

// on click of start btn:
// scores
// qn in question-section
// input fields enabled + check btn

// on click of check btn
// scores updated
// qn + correct answer + scoring logic
// input fields disabled + next btn

// on click of send btn last time?
// list of all qns + correct answers + links
