function loadYouTubeAPI() {
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
  }
  
let player;

function onYouTubeIframeAPIReady() {
player = new YT.Player('ytplayer', {
    height: '0',
    width: '0',
    videoId: 'dQw4w9WgXcQ', 
    playerVars: {
    autoplay: 1, 
    controls: 0,
    },
    events: {
    onReady: onPlayerReady,
    },
});
}

function onPlayerReady(event) {
event.target.playVideo();
setTimeout(() => {
    event.target.stopVideo();
}, 5000);
}

loadYouTubeAPI();