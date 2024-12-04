const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

var widget;
const durations = [0.1, 0.2, 0.5, 2, 4, 8, 15]
const guessTreshold = 0.4;

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
    { id: "317617198", name: "BLOOD." },
    { id: "317617213", name: "DNA." },
    { id: "317617191", name: "YAH." },
    { id: "317617212", name: "ELEMENT." },
    { id: "317617199", name: "FEEL." },
    { id: "317617209", name: "LOYALTY." },
    { id: "317617222", name: "PRIDE." },
    { id: "315137496", name: "HUMBLE." },
    { id: "317617217", name: "LUST." },
    { id: "317617211", name: "LOVE." },
    { id: "317617218", name: "XXX." },
    { id: "317617231", name: "FEAR." },
    { id: "317617208", name: "GOD." },
    { id: "317617202", name: "DUCKWORTH." },
    { id: "253198349", name: "untitled 01" },
    { id: "253197487", name: "untitled 02" },
    { id: "253197214", name: "untitled 03" },
    { id: "253197095", name: "untitled 04" },
    { id: "253197140", name: "untitled 05" },
    { id: "253197289", name: "untitled 06" },
    { id: "253197205", name: "untitled 07" },
    { id: "253197267", name: "untitled 08" },
    { id: "252602221", name: "Wesley's Theory" },
    { id: "252602098", name: "For Free? (Interlude)" },
    { id: "252602185", name: "King Kunta" },
    { id: "252602239", name: "Institutionalized" },
    { id: "252602527", name: "These Walls" },
    { id: "252602328", name: "u" },
    { id: "252602746", name: "Alright" },
    { id: "252602298", name: "For Sale? (Interlude)" },
    { id: "252602215", name: "Momma" },
    { id: "252602304", name: "Hood Politics" },
    { id: "252602346", name: "How Much A Dollar Cost" },
    { id: "252602187", name: "Complexion" },
    { id: "252602223", name: "The Blacker The Berry" },
    { id: "252602333", name: "You Ain't Gotta Lie" },
    { id: "252602270", name: "i" },
    { id: "252602375", name: "Mortal Man" },
    { id: "252602115", name: "Sherane a.k.a Master Splinter’s Daughter" },
    { id: "252602197", name: "Bitch, Don’t Kill My Vibe" },
    { id: "252602391", name: "Backseat Freestyle" },
    { id: "252602183", name: "The Art of Peer Pressure" },
    { id: "252602224", name: "Money Trees" },
    { id: "252602774", name: "Poetic Justice" },
    { id: "252602143", name: "good kid" },
    { id: "252602913", name: "mAAd city" },
    { id: "252603088", name: "Swimming Pools" },
    { id: "252602454", name: "Sing About Me, I'm Dying Of Thirst" },
    { id: "252602607", name: "Real" },
    { id: "252602245", name: "Compton" },
    { id: "252603553", name: "The Recipe" },
    { id: "252602145", name: "Black Boy Fly" },
    { id: "252602155", name: "Now Or Never" },
    { id: "1631801304", name: "Fuck Your Ethnicity" },
    { id: "1631800887", name: "Hol' Up" },
    { id: "1631803275", name: "A.D.H.D" },
    { id: "1631800818", name: "No Make-Up" },
    { id: "1631800461", name: "Tammy's Song" },
    { id: "1631801373", name: "Chapter Six" },
    { id: "1631802627", name: "Ronald Reagan Era" },
    { id: "1631802924", name: "Poe Mans Dreams" },
    { id: "1631803308", name: "Chapter Ten" },
    { id: "1631801277", name: "Keisha's Song" },
    { id: "1631802846", name: "Rigamortus" },
    { id: "1631801907", name: "Kush & Corinthians" },
    { id: "1631801004", name: "Blow My High" },
    { id: "1631802621", name: "Ab-Souls Outro" },
    { id: "1631800773", name: "HiiiPower" },
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
