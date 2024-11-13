const timeElapsedText = document.getElementById("timeElapsed");
const birthsText = document.getElementById("births");
const deathsText = document.getElementById("deaths");
const lightningStrikesText = document.getElementById("lightningStrikes");
const googleSearchesText = document.getElementById("googleSearches");
const emailsSentText = document.getElementById("emailsSent");

const birthRate = 4.3;
const deathRate = 2;
const lightningRate = 100;
const googleRate = 99000;
const emailRate = 4185000;

const startTime = Date.now();

updateContent();

function updateContent(){
    let timeElapsed = (Date.now() - startTime) / 1000;
    timeElapsedText.textContent = Math.round(timeElapsed).toLocaleString();
    birthsText.textContent = Math.round(timeElapsed * birthRate).toLocaleString();
    deathsText.textContent = Math.round(timeElapsed * deathRate).toLocaleString();
    lightningStrikesText.textContent = Math.round(timeElapsed * lightningRate).toLocaleString();
    googleSearchesText.textContent = Math.round(timeElapsed * googleRate).toLocaleString();
    emailsSentText.textContent = Math.round(timeElapsed * emailRate).toLocaleString();
}

setInterval(updateContent, 10);

