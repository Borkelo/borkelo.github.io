window.onload = () => {
    const iframe = document.getElementById('soundcloudPlayer');
    const playButton = document.getElementById('playButton');

    // Define the SoundCloud track URL dynamically
    const trackUrl = 'https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4'; // Replace with your desired track URL
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;

    // Set the iframe src to load the desired track
    iframe.src = embedUrl;

    // Initialize the SoundCloud Widget API
    const widget = SC.Widget(iframe);

    // Attach a click event to the play button
    playButton.addEventListener('click', () => {
        widget.play();

        // Stop playback after 5 seconds
        setTimeout(() => {
            widget.pause();
        }, 5000);
    });

    // Handle errors (e.g., invalid track URL)
    widget.bind(SC.Widget.Events.ERROR, () => {
        console.log("Error loading song");
    });
};