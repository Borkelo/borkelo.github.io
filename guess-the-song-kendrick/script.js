const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

var widget;
const durations = [0.5, 2, 4, 8, 15, 25]
const guessTreshold = 0.3;

let currentIndex = 0;

let randomStart;
let answer;
let fuse;
let gameover = false;

//Om sång int är gratis spelar den alltid från början
const songs = [
    { id: "1964742191", name: "wacced out murals" },
    { id: "1964742195", name: "squabble up" },
    { id: "1964742199", name: "luther" },
    { id: "1964742203", name: "man at the garden" },
    { id: "1964742207", name: "hey now" },
    { id: "1964742211", name: "reincarnated" },
    { id: "1964742215", name: "tv off" },
    { id: "1964742219", name: "dodger blue" },
    { id: "1964742227", name: "peekaboo" },
    { id: "1964742243", name: "heart pt. 6" },
    { id: "1964742247", name: "gnx" },
    { id: "1964742251", name: "gloria" },
    { id: "1267386499", name: "United In Grief" },
    { id: "1267386892", name: "N95" },
    { id: "1267390525", name: "Worldwide Steppers" },
    { id: "1267387117", name: "Die Hard"},
    { id: "1267389112", name: "Father Time" },
    { id: "1267389283", name: "Rich (Interlude)" },
    { id: "1267388605", name: "Rich Spirit" },
    { id: "1267389442", name: "Savior (Interlude)" },
    { id: "1267389535", name: "We Cry Together" },
    { id: "1267388815", name: "Purple Hearts" },
    { id: "1267389346", name: "Count Me Out" },
    { id: "1267387318", name: "Crown" },
    { id: "1267388161", name: "Silent Hill" },
    { id: "1267387534", name: "Savior" },
    { id: "1267386175", name: "Auntie Diaries" },
    { id: "1267388398", name: "Mr. Morale" },
    { id: "1267389187", name: "Mother I Sober" },
    { id: "1267387810", name: "Mirror" },
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
