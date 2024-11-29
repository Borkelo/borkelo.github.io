let player;

// This function is called when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: 'dQw4w9WgXcQ',  // Replace with your YouTube video ID
        events: {
            'onReady': onPlayerReady
        }
    });
}

// This function is called when the YouTube player is ready to play the video
function onPlayerReady(event) {
    event.target.playVideo();  // Play the video
    setTimeout(function() {
        player.pauseVideo();  // Pause the video after 5 seconds
    }, 5000);  // 5000 ms = 5 seconds
}