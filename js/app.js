import questionList from './data_modal.js';
import montList from './data_montgomery.js';
import qidsList from './data_qids.js';


// variables
const selectMission = document.getElementById('selectMission');
const welcome = document.getElementById('welcome');
const profileTitle = document.getElementById('profileTitle');
const welcomeBtn = document.getElementById('welcomeBtn');
const profile = document.getElementById('profile');
const profileForm = document.getElementById('profileForm');
const name = document.getElementById('name');
const age = document.getElementById('age');
const sex = document.getElementById('sex');
const country = document.getElementById('country');
const hamiltonInfo = document.getElementById('hamiltonInfo');
const profileInfo = {};
let questionCount = -1;
const nextBtn = document.getElementById('nextBtn');
const questionDynamic = document.getElementById('questionDynamic');
const questionForm = document.getElementById('questionForm');
const prevArrow = document.getElementById('arrow');
const nextArrow = document.getElementById('leftarrow');
const questions = document.getElementById('questions');
let hamiltonScore = 0;
let montScore = 0;
let qidsScore = 0;
let tempHamiltonScore = -1;
const scorePage = document.getElementById('scorepage');
const message = document.getElementById('message');
const nextLevel = document.getElementById('nextlevel');
const currentQuestionSet = {
  hamilton: true,
  mont: false,
  qids: false,
};
let tempMoveTrack = 0;
const chart = document.getElementById('chart');

let checkIfBtn = false;

// global functions
function blinkingText(tag) {
  let blink = true;
  setInterval(() => {
    if (blink) {
      tag.style.display = 'none';
      blink = false;
    } else {
      tag.style.display = 'block';
      blink = true;
    }
  }, 750);
}

blinkingText(welcomeBtn);

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'x') {
    const audio = new Audio('../assets/click.mp3');
    audio.play();
    setTimeout(() => {
      welcome.style.display = 'none';
      profile.style.display = 'block';
      blinkingText(profileTitle);
    }, 300);
  }
});

function goToMission(dynamicQuestion, index) {
  hamiltonInfo.style.display = 'grid';
  const missionGotSelected = document.getElementById(`${index}`);
  missionGotSelected.setAttribute('class', 'bordered');

  selectMission.addEventListener('click', (e) => {
    hamiltonInfo.style.display = 'none';
    questions.style.display = 'block';
    questionCount++;
    loadQuestionDynamically(dynamicQuestion, 'next');
    e.preventDefault();
  });
}

// load question dynamically on screen
function loadQuestionDynamically(dynamicQuestions, trackMove) {
  questionDynamic.textContent = dynamicQuestions[questionCount][0];
  // dynamically add options
  let i = 0;
  questionForm.innerHTML = '';
  for (let option in dynamicQuestions[questionCount][1]) {
    const optionDiv = document.createElement('div');
    // prepare  option input tagt
    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'radio');
    optionInput.setAttribute('id', `option${i}`);
    optionInput.value = dynamicQuestions[questionCount][1][option];
    optionInput.setAttribute('name', 'option');
    // prepare  labelt
    const optionLabel = document.createElement('label');
    optionLabel.setAttribute('class', 'questionLable');
    optionLabel.setAttribute('for', `option${i}`);

    optionLabel.textContent = option.toUpperCase();

    // append input and label to option div
    optionDiv.appendChild(optionInput);
    optionDiv.appendChild(optionLabel);
    questionForm.appendChild(optionDiv);
    const selectedOption = document.getElementById(`option${i}`);
    selectedOption.addEventListener('click', (e) => {
      tempHamiltonScore = dynamicQuestions[questionCount][1][option];
    });
    i++;
  }

  if (currentQuestionSet.hamilton) {
    if (trackMove === 'next') {
      tempMoveTrack = tempHamiltonScore;
      if (tempHamiltonScore >= 0) {
        hamiltonScore += tempHamiltonScore;
      }
    } else {
      if (tempHamiltonScore >= 0) {
        hamiltonScore -= tempMoveTrack;
        tempMoveTrack = 0;
      }
    }
  } else if (currentQuestionSet.mont) {
    if (trackMove === 'next') {
      tempMoveTrack = tempHamiltonScore;
      if (tempHamiltonScore >= 0) {
        if (tempHamiltonScore % 2 === 0) {
          tempHamiltonScore /= 2;
        }
        montScore += tempHamiltonScore;
      }
    } else {
      if (tempHamiltonScore >= 0) {
        montScore -= tempMoveTrack;
        tempMoveTrack = 0;
      }
    }
  } else {
    if (trackMove === 'next') {
      tempMoveTrack = tempHamiltonScore;
      if (tempHamiltonScore >= 0) {
        qidsScore += tempHamiltonScore;
      }
    } else {
      if (tempHamiltonScore >= 0) {
        qidsScore -= tempMoveTrack;
        tempMoveTrack = 0;
      }
    }
  }

  tempHamiltonScore = -1;
}

// score page
function updateScore() {
  questions.style.display = 'none';
  scorePage.style.display = 'block';
  const score = document.getElementById('score');
  if (currentQuestionSet.hamilton) {
    score.textContent = `SCORE: ${hamiltonScore}`;
  } else if (currentQuestionSet.mont) {
    score.textContent = `SCORE: ${montScore}`;
  } else {
    score.textContent = `SCORE: ${qidsScore}`;
  }
  let depressionMessage;
  const depressionLevel = {
    normal: 'YOU ARE NORMAL',
    mild: 'YOU HAVE MILD DEPRESSION',
    moderate: ' YOU HAVE MODERATE DEPRESSION',
    severe: 'SEVERE DEPRESSION',
    verySevere: 'VERY SEVERE DEPRESSION',
  };

  if (currentQuestionSet.hamilton) {
    if (0 <= hamiltonScore && hamiltonScore <= 7) {
      depressionMessage = depressionLevel.normal;
    } else if (8 <= hamiltonScore && hamiltonScore <= 13) {
      depressionMessage = depressionLevel.mild;
    } else if (14 <= hamiltonScore && hamiltonScore <= 18) {
      depressionMessage = depressionLevel.moderate;
    } else if (19 <= hamiltonScore && hamiltonScore <= 22) {
      depressionMessage = depressionLevel.severe;
    } else {
      depressionMessage = depressionLevel.verySevere;
    }
  } else if (currentQuestionSet.mont) {
    if (0 <= montScore && montScore <= 6) {
      depressionMessage = depressionLevel.normal;
    } else if (7 <= montScore && 13 <= 19) {
      depressionMessage = depressionLevel.mild;
    } else if (20 <= montScore && montScore <= 34) {
      depressionMessage = depressionLevel.moderate;
    } else {
      depressionMessage = depressionLevel.severe;
    }
  } else {
    if (0 <= qidsScore && qidsScore <= 5) {
      depressionMessage = depressionLevel.normal;
    } else if (6 <= qidsScore && qidsScore <= 10) {
      depressionMessage = depressionLevel.mild;
    } else if (11 <= qidsScore && qidsScore <= 15) {
      depressionMessage = depressionLevel.moderate;
    } else if (16 <= qidsScore && qidsScore <= 20) {
      depressionMessage = depressionLevel.severe;
    } else {
      depressionMessage = depressionLevel.verySevere;
    }
  }
  message.textContent = depressionMessage;
  nextLevel.addEventListener('click', (e) => {
    scorePage.style.display = 'none';
    if (currentQuestionSet.hamilton) {
      goToMission(questionList, 1);
    } else if (currentQuestionSet.mont) {
      questionCount = -2;
      goToMission(montList, 2);
    } else if (currentQuestionSet.qids) {
      questionCount = -4;
      goToMission(qidsList, 3);
    } else {
      scorePage.style.display = 'none';
      chart.style.display = 'grid';

      const hdrs = document.getElementById('hdrs');
      hdrs.textContent = `HDRS: ${hamiltonScore}`;
      const madrs = document.getElementById('madrs');
      madrs.textContent = `MADRS: ${montScore}`;
      const qids = document.getElementById('qids');
      qids.textContent = `QIDS: ${qidsScore}`;
    }

    e.preventDefault();
  });
}

// welcome page
welcomeBtn.addEventListener('click', (e) => {
  welcome.style.display = 'none';
  profile.style.display = 'block';
  e.preventDefault();
});

// profile page
nextBtn.addEventListener('click', (e) => {
  if (name.value && age.value && sex.value && country.value) {
    profileInfo.name = name.value;
    profileInfo.age = age.value;
    profileInfo.sex = sex.value;
    profileInfo.country = country.value;
    profile.style.display = 'none';
    hamiltonInfo.style.display = 'grid';

    goToMission(questionList, 1);

    // hamilton info page
  } else {
    window.alert('Oops!It seems you missed a field!');
  }
  e.preventDefault();
});

// question navigation by ke press

const moveNext = (el) => {
  if (tempHamiltonScore > -1) {
    let currentList = [];
    if (currentQuestionSet.hamilton) {
      currentList = questionList;
    } else if (currentQuestionSet.mont) {
      currentList = montList;
    } else {
      currentList = qidsList;
    }
    if (questionCount + 1 < currentList.length) {
      questionCount++;
      loadQuestionDynamically(currentList, 'next');
    } else {
      questionCount = -1;
      // loadQuestionDynamically();
      if (currentQuestionSet.hamilton) {
        updateScore();
        currentQuestionSet.hamilton = false;
        currentQuestionSet.mont = true;
      } else if (currentQuestionSet.mont) {
        updateScore();
        currentQuestionSet.mont = false;
        currentQuestionSet.qids = true;
      } else {
        updateScore();
        currentQuestionSet.qids = false;
      }
    }
  } else {
    window.alert('Please Select an option');
  }
};

const movePrev = () => {
  let currentList = [];
  if (currentQuestionSet.hamilton) {
    currentList = questionList;
  } else if (currentQuestionSet.mont) {
    currentList = montList;
  }
  if (questionCount >= 0) {
    questionCount--;
    loadQuestionDynamically(currentList, 'prev');
  } else {
    questionCount = -1;
    // loadQuestionDynamically();
    if (currentQuestionSet.hamilton) {
      updateScore();
      currentQuestionSet.hamilton = false;
      currentQuestionSet.mont = true;
    } else if (currentQuestionSet.mont) {
      updateScore();
      currentQuestionSet.mont = false;
    } else {
      updateScore();
      currentList.qids = true;
    }
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'arrowright') {
    moveNext();
  } else if (e.key.toLocaleLowerCase() === 'arrowleft') {
    movePrev();
  }
});
// question navigation by arrow click
nextArrow.addEventListener('click', (e) => {
  moveNext();
  e.preventDefault();
});

// previous arrow

prevArrow.addEventListener('click', (e) => {
  movePrev();
  e.preventDefault();
});
