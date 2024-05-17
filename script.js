const sentences = 
  `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`;

const startBtnElement = document.getElementById("start-btn");
const inputElement = document.getElementById('input');
const paraElement = document.getElementById("sentence");
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const retryElement = document.getElementById('retry-btn');
const speedElement = document.getElementById('speed');
const accuracyElement = document.getElementById('accuracy');

let seconds = 0;
let timer;

function startTest() {
  inputElement.disabled = false;
  inputElement.value = '';
  inputElement.focus();
  paraElement.textContent = sentences;
  startBtnElement.disabled = true;
  timerElement.textContent = '60';
  seconds = 60;
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds--;
  timerElement.textContent = seconds;
  if (seconds <= 0) {
    endTest();
  }
}

function endTest() {
  clearInterval(timer);
  showResult();
  resultElement.style.display = 'block';
  inputElement.disabled = true;
}

function calculateSpeed() {
  const typedText = inputElement.value.trim();
  const wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
  const speed = (wordsTyped / 1) * 60; // since the test duration is 1 minute
  return speed;
}

function calculateAccuracy() {
  const typedText = inputElement.value.trim();
  const correctText = sentences.substring(0, typedText.length);
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === correctText[i]) {
      correctChars++;
    }
  }
  const accuracy = (correctChars / typedText.length) * 100;
  return accuracy;
}

function showResult() {
  const speed = calculateSpeed();
  const accuracy = calculateAccuracy();
  speedElement.textContent = speed.toFixed(2);
  accuracyElement.textContent = accuracy.toFixed(2);
}

function restartTest() {
  startBtnElement.disabled = false;
  resultElement.style.display = 'none';
  inputElement.value = '';
  inputElement.disabled = true;
  timerElement.textContent = '60';
}

startBtnElement.addEventListener("click", startTest);



retryElement.addEventListener("click", restartTest);
