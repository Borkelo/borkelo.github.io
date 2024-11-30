const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

const durations = [0.1, 0.5, 2, 4, 8, 15]
let currentIndex = 0;

let randomStart;
let answer;
let fuse;
let gameover = false;

const files = [
    'dodger_blue.mp3',
    'gloria.mp3',
    'gnx.mp3',
    'heart_pt._6.mp3',
    'hey_now.mp3',
    'luther.mp3',
    'man_at_the_garden.mp3',
    'peekaboo.mp3',
    'reincarnated.mp3',
    'squabble_up.mp3',
    'tv_off.mp3',
    'wacced_out_murals.mp3'
];

function setup(){
    song = chooseSong();
    audioPlayer.src = 'songs/' + song;
    answer = song.replace(/_/g, ' ').replace(/\.mp3$/, '');
    console.log(answer);

    fuse = new Fuse([answer], {
        includeScore: true,
        threshold: 0.5,
        distance: 10,
        minMatchCharLength: 3
      });

    durationDisplay.textContent = durations[currentIndex] + " s";
    
    audioPlayer.onloadedmetadata = function() {
        let duration = audioPlayer.duration;
        randomStart = Math.random() * (duration - 15);
    };   
}

function chooseSong(){
    return files[Math.floor(Math.random() * files.length)];
}

function endGame(){
    gameover = true;
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    correctAnswerText.textContent = answer;
}

function playAudio() {
    if(!audioPlayer.paused || gameover){
        return;
    }
    
    audioPlayer.currentTime = randomStart;   
    audioPlayer.play();

    setTimeout(() => {
        audioPlayer.pause();
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
