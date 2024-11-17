const speedInput = document.getElementById("speedSlider");
const speedDisplay = document.getElementById("speedDisplay");
const speedDisplayLight = document.getElementById("speedDisplayLight");
const stationaryTimeDisplay = document.getElementById("stationaryTimeDisplay");
const movingTimeDisplay = document.getElementById("movingTimeDisplay");

const cToKms = 299792.458;
const cToMs = 299792458;

const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_A_YEAR = 31536000;

const startTime = performance.now();
let prevTime = performance.now();

let stationaryTime = 0;
let movingTime = 0;

let speedFraction = parseFloat(speedInput.value);
speedDisplayLight.textContent =`${speedFraction} c`
speedDisplay.textContent =`${Math.round(speedFraction * cToMs / 1000)} km/s`

function formatTime(seconds) {
    const years = Math.floor(seconds / SECONDS_IN_A_YEAR);
    seconds %= SECONDS_IN_A_YEAR;
    const days = Math.floor(seconds / SECONDS_IN_A_DAY);
    seconds %= SECONDS_IN_A_DAY;
    const hours = Math.floor(seconds / SECONDS_IN_AN_HOUR);
    seconds %= SECONDS_IN_AN_HOUR;
    const minutes = Math.floor(seconds / SECONDS_IN_A_MINUTE);
    seconds = Math.floor(seconds % SECONDS_IN_A_MINUTE); 

    const hoursFormatted = String(hours).padStart(2, '0');
    const minutesFormatted = String(minutes).padStart(2, '0');
    const secondsFormatted = String(seconds).padStart(2, '0');

    let formattedTime = '';
    if (years > 0) formattedTime += `${years} years`;
    if (days > 0) formattedTime += `${formattedTime ? ', ' : ''}${days} days`;
    if (hours > 0 || formattedTime) formattedTime += `${formattedTime ? ', ' : ''}${hoursFormatted} hours`;
    if (minutes > 0 || formattedTime) formattedTime += `${formattedTime ? ', ' : ''}${minutesFormatted} minutes`;
    if (seconds >= 0 || formattedTime) formattedTime += `${formattedTime ? ', ' : ''}${secondsFormatted} seconds`;

    return formattedTime;
}

function timeElapsedForStationaryObserver(seconds){
    return seconds / Math.sqrt(1 - speedFraction ** 2);
}

speedInput.addEventListener("input", () => {
    speedFraction = parseFloat(speedInput.value);
    speedDisplayLight.textContent =`${speedFraction} c`
    speedDisplay.textContent =`${Math.round(speedFraction * cToMs / 1000)} km/s`
});

function timeInterval(){
    let currentTime = performance.now();
    let deltaTime = (currentTime - prevTime) / 1000;
    prevTime = currentTime;

    movingTime += deltaTime;
    stationaryTime += timeElapsedForStationaryObserver(deltaTime);

    movingTimeDisplay.textContent = formatTime(movingTime);
    stationaryTimeDisplay.textContent = formatTime(stationaryTime);
}

setInterval(timeInterval, 10);