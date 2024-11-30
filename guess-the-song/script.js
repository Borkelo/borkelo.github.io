const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

var widget;
const durations = [0.5, 1, 2, 4, 8, 15]
let currentIndex = 0;

let randomStart;
let answer;
let fuse;
let gameover = false;

const songs = [
    "1964742191"
];

function setup(){
    iframe = document.getElementById('trackIframe');
    trackId = "1964742191";
    iframe.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&amp;show_artwork=false`;
    widget = SC.Widget(iframe);
    song = chooseSong();
    answer = song.replace(/_/g, ' ').replace(/\.mp3$/, '');

    fuse = new Fuse([answer.trim().toLowerCase()], {
        includeScore: true,
        threshold: 0.5,
        distance: 10,
        minMatchCharLength: 3
    });     

    durationDisplay.textContent = durations[currentIndex] + " s";

    widget.bind(SC.Widget.Events.READY, function() {
        widget.getDuration(function(duration) {
            let durationInSeconds = duration / 1000;
            console.log("Duration:", durationInSeconds);
            randomStart = Math.random() * (durationInSeconds - 15);
        });
    });    
}

function chooseSong(){
    return songs[Math.floor(Math.random() * songs.length)];
}

function endGame(){
    gameover = true;
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    correctAnswerText.textContent = answer;
}

async function playAudio() {
    if (!widget) {
        return;
    }

    let isPaused = await new Promise(resolve => {
        widget.isPaused(function(paused) {
            resolve(paused);
        });
    });

    if(!isPaused|| gameover){
        return;
    }
    
    widget.seekTo(randomStart * 1000);
    widget.play();


    setTimeout(() => {
        widget.pause();
    }, durations[currentIndex] * 1000);
}

function checkText(text) {
    text = text.trim().toLowerCase();
    let result = fuse.search(text);
  
    if (result.length > 0 && result[0].score < 0.5) {
      return true;
    }
    return false;    
  }

function guessSong(){
    if(gameover){
        return;
    }

    if(checkText(inputText.value)){
        endGame();
        return;
    }

    if(currentIndex === 5){
        endGame();
        return;
    }

    currentIndex += 1;
    durationDisplay.textContent = durations[currentIndex] + " s";
}



setup();

playButton.addEventListener('click', playAudio);
guessButton.addEventListener('click', guessSong)
