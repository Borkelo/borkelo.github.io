let player;

// This function is called when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready!");

    player = new YT.Player('player', {
        height: '1', // Hidden player size
        width: '1',
        videoId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError  // Catch errors
        }
    });
}

// This function is called when the YouTube player is ready to play the video
function onPlayerReady(event) {
    console.log("Player is ready to play!");
    event.target.playVideo();  // Play the video
    setTimeout(function() {
        event.target.pauseVideo();  // Pause the video after 5 seconds
        console.log("Video paused after 5 seconds");
    }, 5000);  // 5000 ms = 5 seconds
}

// Error handling for player
function onPlayerError(event) {
    console.error("Error with the player:", event);
}