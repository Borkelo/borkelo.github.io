const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');
const guessButton = document.getElementById('guessButton');
const inputText = document.getElementById('input');
const correctAnswerText = document.getElementById('correctAnswerText');
const durationDisplay = document.getElementById('durationDisplay');

var widget;
const durations = [0.2, 0.5, 2, 4, 8, 15]
const guessTreshold = 0.4;

let currentIndex = 0;

let iframe;
let randomStart;
let answer;
let fuse;
let gameover = false;

//Om sång int är gratis spelar den alltid från början
const songs = [
    { id: "253513614", name: "36" },
    { id: "253510051", name: "A.D.D. (American Dream Denial)" },
    { id: "253509777", name: "Aerials" },
    { id: "253235576", name: "Arto" },
    { id: "253507969", name: "Attack" },
    { id: "253235130", name: "ATWA" },
    { id: "253507389", name: "B.Y.O.B." },
    { id: "253510558", name: "Boom!" },
    { id: "253234923", name: "Bounce" },
    { id: "253514439", name: "Bubbles" },
    { id: "253514174", name: "Chic 'N' Stu" },
    { id: "253507436", name: "Chop Suey!" },
    { id: "253507819", name: "Cigaro" },
    { id: "253508980", name: "CUBErt" },
    { id: "253513403", name: "Darts" },
    { id: "253513196", name: "DDevil" },
    { id: "253234403", name: "Deer Dance" },
    { id: "253635742", name: "Dreaming" },
    { id: "253513924", name: "Ego Brain" },
    { id: "253514221", name: "F**k The System (**** The System)" },
    { id: "253234707", name: "Forest" },
    { id: "253510194", name: "Fuck the System" },
    { id: "924119380", name: "Genocidal Humanoidz" },
    { id: "253513662", name: "Highway Song" },
    { id: "253508246", name: "Holy Mountains" },
    { id: "253512965", name: "Hypnotize" },
    { id: "253510027", name: "I-E-A-I-A-I-O" },
    { id: "253513788", name: "Innervision" },
    { id: "253234797", name: "Jet Pilot" },
    { id: "253506904", name: "Johnny" },
    { id: "253508152", name: "Kill Rock 'n Roll" },
    { id: "253508783", name: "Know" },
    { id: "253511513", name: "Lonely Day" },
    { id: "253509687", name: "Lost In Hollywood" },
    { id: "253508528", name: "Marmalade" },
    { id: "253528697", name: "Metro" },
    { id: "253509337", name: "Mind" },
    { id: "253510389", name: "Mr. Jack" },
    { id: "253234516", name: "Needles" },
    { id: "253513638", name: "Nüguns" },
    { id: "253508926", name: "Old School Hollywood" },
    { id: "253508697", name: "P.L.U.C.K." },
    { id: "253513248", name: "Peephole" },
    { id: "253513661", name: "Pictures" },
    { id: "253234706", name: "Prison Song" },
    { id: "924119953", name: "Protect The Land" },
    { id: "253234596", name: "Psycho" },
    { id: "253509257", name: "Question!" },
    { id: "253509633", name: "Radio/Video" },
    { id: "253508960", name: "Revenga" },
    { id: "253513891", name: "Roulette" },
    { id: "253508964", name: "Sad Statue" },
    { id: "253234562", name: "Science" },
    { id: "255047096", name: "Shame" },
    { id: "255047097", name: "Shame" },
    { id: "253508229", name: "She's Like Heroin" },
    { id: "253235110", name: "Shimmy" },
    { id: "253510540", name: "Snowblind" },
    { id: "253509002", name: "Soil" },
    { id: "253507879", name: "Soldier Side" },
    { id: "252766583", name: "Spiders" },
    { id: "253508662", name: "Stealing Society" },
    { id: "253513859", name: "Streamline" },
    { id: "253508379", name: "Sugar" },
    { id: "253513169", name: "Suggestions" },
    { id: "253508548", name: "Suite-Pee" },
    { id: "253508243", name: "Tentative" },
    { id: "253513670", name: "Thetawaves" },
    { id: "253636005", name: "This Cocaine Makes Me Feel Like I'm On This Song" },
    { id: "253508817", name: "Toxicity" },
    { id: "253508254", name: "U-Fig" },
    { id: "253510019", name: "Vicinity Of Obscenity" },
    { id: "253506471", name: "Violent Pornography" },
    { id: "253513525", name: "War?" },
    { id: "253235208", name: "X" },
];

function setup(){
    iframe = document.getElementById('trackIframe');
    let randomSong = songs[Math.floor(Math.random() * songs.length)];
    let trackId = randomSong.id;
    answer = randomSong.name;
    console.log(trackId);

    iframe.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}`;
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
