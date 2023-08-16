const button = document.querySelector(".ripple-btn");
const counter = document.querySelector("#clicks");
const displayTimer = document.querySelector("#timer");
const result = document.querySelector("#result");
const restartButton = document.querySelector("#restartButton");

let clicks = 0;
let startTime;
let isTimerRunning = false;

button.addEventListener("click", () => {
  if (!isTimerRunning) {
    timer();
    isTimerRunning = true;
  }
  clicks++;
  counter.innerHTML = `Clicks: <b>${clicks}</b>`;
});

button.addEventListener("click", drawRipple);

function drawRipple(event) {
  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  const ripples = document.createElement("span");
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";

  this.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 1000);
}

//計時器
function timer() {
  if (!isTimerRunning) {  //若計時器沒有正在跑
    startTime = performance.now();  //將startTime變數設定為現在時間
    isTimerRunning = true;  //將計時器running狀態設定為true
    requestAnimationFrame(updateTimer); 
  }
}

function updateTimer(timestamp) {
  const currentTime = timestamp - startTime;
  const timeInSeconds = (currentTime / 1000).toFixed(3);
  displayTimer.innerHTML = `Timer: <b>${timeInSeconds}</b>`;
  if (parseFloat(timeInSeconds) < 10) {
    //若秒數小於10，計時繼續。
    timerId = requestAnimationFrame(updateTimer);
  } else {
    //到達10秒停止計時器。
    displayTimer.innerHTML = `Timer: <b>10.000</b>`;
    cancelAnimationFrame(timerId);
    isTimerRunning = false;
    button.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `Your CPS: ${clicks/10}`;
    clicks = 0; 
    restartButton.style.display = "block";
  }
}

function restart() {
  restartButton.style.display = "none";
  result.style.display = "none";
  displayTimer.innerHTML = `Timer: <b>0</b>`;
  counter.innerHTML = `Clicks: <b>0</b>`;
  button.style.display = "block";
}