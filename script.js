let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const millis = milliseconds % 1000;


  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millis.toString().padStart(3, '0')}`;
}

function startPause() {
  const startPauseBtn = document.getElementById('startPauseBtn');
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = Date.now();
    timer = setInterval(() => {
      const time = Date.now() - startTime + elapsedTime;
      document.getElementById('timer').textContent = formatTime(time);
    }, 10); 
    startPauseBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  document.getElementById('timer').textContent = '00:00:00:000';
  document.getElementById('startPauseBtn').textContent = 'Start';
  document.getElementById('lapTimes').innerHTML = '';
  lapCounter = 1;
}

function lap() {
  if (isRunning) {
    const lapTime = document.getElementById('timer').textContent;
    const lapTimes = document.getElementById('lapTimes');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimes.appendChild(lapItem);
    lapCounter++;
  }
}
