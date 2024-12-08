const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

var widget;
const durations = [0.2, 0.5, 2, 4, 8, 15]
const guessTreshold = 0.3;

let currentIndex = 0;

let iframe;
let randomStart;
let answer;
let fuse;
let gameover = false;

//Om sång int är gratis spelar den alltid från början
const songs = [
    { id: "1242868615", name: "Never Gonna Give You Up" },
    { id: "1964742191", name: "wacced out murals" },
    { id: "1069042870", name: "Enter Sandman" },
    { id: "115417954", name: "Bohemian Rhapsody"},
    { id: "1052634835", name: "Mask"},
    { id: "133857724", name: "Stereo Madness"},
    { id: "632659404", name: "Dance Monkey"},
    { id: "140308121", name: "Subwoofer Lullaby"},
    { id: "231447195", name: "On Melancholy Hill"},
];

function setup(){
    iframe = document.getElementById('trackIframe');
    let randomSong = songs[Math.floor(Math.random() * songs.length)];
    let trackId = randomSong.id;
    answer = randomSong.name;
    console.log(trackId);

    iframe.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&amp`;
    widget = SC.Widget(iframe);

    fuse = new Fuse([answer.trim().toLowerCase()], {
        includeScore: true,
        threshold: guessTreshold,
        distance: 10,
        minMatchCharLength: 3
    });     

    durationDisplay.textContent = durations[currentIndex] + " s";

    widget.bind(SC.Widget.Events.READY, function() {
        widget.getDuration(function(duration) {
            let durationInSeconds = duration / 1000;
            console.log("Duration:", durationInSeconds);
            randomStart = Math.random() * (durationInSeconds - durations[durations.length - 1]);
            if(randomStart < 0){
                randomStart = 0;
            }
        });
    });    
}


function endGame(win){
    gameover = true;
    widget.seekTo(0);
    widget.play();
    correctAnswerText.textContent = answer;
    iframe.style.width = "800px";
    iframe.style.height = "150px";

    if(win){
        durationDisplay.textContent = "You win!";
    }
    else{
        durationDisplay.textContent = "You lose!"
    }
}

async function playAudio() {
    if (!widget || gameover) {
        return;
    }

    let isPaused = await new Promise(resolve => {
        widget.isPaused(function(paused) {
            resolve(paused);
        });
    });

    if(!isPaused){
        return;
    }
    
    widget.seekTo(randomStart * 1000);
    widget.play();


    setTimeout(() => {
        if(!gameover){
            widget.pause();
        }
    }, durations[currentIndex] * 1000);
}

function checkText(text) {
    text = text.trim().toLowerCase();
    let result = fuse.search(text);
  
    if (result.length > 0 && result[0].score < guessTreshold) {
      return true;
    }
    return false;    
  }

function guessSong(){
    if(gameover){
        return;
    }

    if(checkText(inputText.value)){
        endGame(true);
        return;
    }

    if(currentIndex === durations.length - 1){
        endGame(false);
        return;
    }

    currentIndex += 1;
    durationDisplay.textContent = durations[currentIndex] + " s";
    inputText.value = "";
}



setup();

playButton.addEventListener('click', playAudio);
guessButton.addEventListener('click', guessSong)
