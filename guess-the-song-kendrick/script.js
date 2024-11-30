const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

var widget;
const durations = [0.5, 2, 4, 8, 15, 25]
const guessTreshold = 0.5;

let currentIndex = 0;

let randomStart;
let answer;
let fuse;
let gameover = false;

//Om sång int är gratis spelar den alltid från början
const songs = [
    { id: "1964742191", name: "wacced out murals" },
];

function setup(){
    iframe = document.getElementById('trackIframe');
    let randomSong = songs[Math.floor(Math.random() * songs.length)];
    let trackId = randomSong.id;
    answer = randomSong.name;
    console.log(trackId);

    iframe.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&amp;show_artwork=false`;
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
