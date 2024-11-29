const audioPlayer = document.getElementById('audioplayer');
const playButton = document.getElementById('playButton');

function playAudio(filePath) {
  audioPlayer.src = 'songs/0Never_Gonna_Give_You_Up.mp3';
  audioPlayer.play();
}

playButton.addEventListener('click', playAudio);
