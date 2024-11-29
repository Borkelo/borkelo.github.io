document.addEventListener("DOMContentLoaded", function () {
    // Track URL from SoundCloud
    const trackURL = "https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4";  // Replace with any valid SoundCloud track URL

    // Create the SoundCloud player in the div with id "player"
    const playerElement = document.getElementById('player');
    const widget = SC.Widget(playerElement);

    // Load the track and start playback
    function loadAndPlayTrack() {
        widget.load(trackURL, {
            auto_play: true,
            visual: true
        });

        // Play the track for 5 seconds, then stop
        setTimeout(() => {
            widget.pause();
        }, 5000);  // 5000ms = 5 seconds
    }

    // Initialize and play the track
    loadAndPlayTrack();
});